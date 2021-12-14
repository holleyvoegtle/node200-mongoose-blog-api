const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
//require('dotenv').config()

// Instruct mongoose to connect to your local MongoDB instance
mongoose.connect('mongodb://localhost/my-blog');

// Enable Promises for mongoose (for easier async operations)
mongoose.Promise = Promise;

// Add the necessary statements after these lines to use the bodyParser to detect json, setup a route and finallu export app
const app = express();

app.use(bodyParser.json());

// route
app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});

app.use('/api/users', require('./routes/users'));
app.use('/api/blogs', require('./routes/blogs'));

// export app
module.exports = app;

