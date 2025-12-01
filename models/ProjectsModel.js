const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    skills: {
        type: Array,
    },
    githubURL: {
        type: String,
    },
    liveURL: {
        type: String,
    },
    category: {
        type: String,
    },
    sorting: {
        type: String,
    },
    imageURL: {
        type: String,
    }
})

const Project = mongoose.model('projects', Schema);
module.exports = Project;