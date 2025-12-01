const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    category: String, 
    skills: Array,
    icon: String,
    sorting: Number
})

const Skills = mongoose.model('skills', Schema);
module.exports = Skills;