// Imports mongoose and extracts Schema into it's own variable
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creates a new Mongoose Schema with two properties
const BlogSchema = new Schema ({
    title: { type: String, require: true },
    article: { type: String, require: true },
    published: { type: Date, require: true },
    featured: { type: Boolean, require: true },
    author: { type: Schema.Types.ObjectId, ref: 'User'},
})

module.exports = mongoose.model('Blog', BlogSchema);