const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    email: String,
    phone: String,
    location: String,
    github: String,
    linkedin: String,
})

const Contact = mongoose.model('contacts', Schema);
module.exports= Contact