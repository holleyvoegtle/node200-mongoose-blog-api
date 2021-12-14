const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Blog = require('../models/Blog');

// get all blogs
router.get('/', (req, res) => {
    Blog.find()
        .then(blogs => {
            res.status(200).json(blogs);
        })
        .catch(err => res.status(500).send('No Blogs found'))
});

// get all featured blogs
router.get('/featured', (req, res) => {
    Blog.where('featured', true)
        .then(blogs => {
            res.status(200).json(blogs);
        })
        .catch(err => res.status(500).send('No featured blogs found'));
})

// get a single blog
router.get('/:id', (req, res) => {
    Blog.findById(req.params.id)
        .then(blog => {
            if (blog === null) res.status(404).send();
            else res.status(200).json(blog);
        })
        .catch(err => res.status(404).send('This blog cannot be found'))
});

// create a blog and associate to userID
router.post('/', (req, res) => {
    // New higher scope variable
    let dbUser = null;

    // Fetch the user from the database
    User
        .findById(req.body.author) 
        .then(user => {
            // Store the fetched user in higher scope variable
            dbUser = user;
            
            // Create a blog
            const newBlog = new Blog(req.body);
                        
            // Bind the user to it
            newBlog.author = user._id;
                        
            // Save it to the database
            return newBlog.save();
        })
        .then(blog => {
            // Push the saved blog to the array of blogs associated with the User
            dbUser.blogs.push(blog);

            // Save the user back to the database and respond to the original HTTP request with a copy of the newly created blog.
            dbUser.save().then(() => res.status(201).json(blog));
        })
        .catch(err => res.status(500).send('error'));
        
});

// update a blog
router.put('/:id', (req, res) => {
    Blog.findByIdAndUpdate(req.params.id, req.body)
        .then(updatedBlog => {
            res.status(204).json(updatedBlog)
        })
        .catch(err => res.status(500).send('Error in updating'))
});

// delete a blog
router.delete('/:id', (req, res) => {
    Blog.findByIdAndRemove(req.params.id)
        .then(blogs => {
            res.status(200).send().json(blogs);
        })
        .catch(err => res.status(404).send('Deleting blog did not go through'))
});

module.exports = router;