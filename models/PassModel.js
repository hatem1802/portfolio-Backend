const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    password: {
        type: String
    }
})

const Password = mongoose.model('auths', Schema)
module.exports = Password;