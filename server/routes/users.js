const express = require('express');
const router = express.Router();
const User = require('../models/User');


// get all users
router.get('/', (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json(users);
         })
         .catch(err => res.status(404).send('No users found'))
});

// get single user
router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(users => {
            if (users === null) res.status(404).send();
            else res.status(200).json(users);
        })
        .catch(err => res.status(500).send('This user cannot be found'))
});

// create a User
router.post('/', (req, res) => {
    const newUser = new User(req.body);
    newUser.save()
        .then(item => {
            res.status(201).json(item);
        })
        .catch(err => res.status(500).send('Error in Database'))
});

// Update a user
router.put('/:id', (req, res) => {
    User.findByIdAndUpdate()
        .then(users => {
           if (users === null) res.status(204).send() 
        })
        .catch(err => res.status(500).send('Did not update'))
});

// delete a user
router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id)
        .then(users => {
            res.status(200).send().json(users);    
        })
        .catch(err => res.status(404).send('Delete did not go through'));
});               
module.exports = router;