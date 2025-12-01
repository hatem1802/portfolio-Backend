const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    category: {
        type: String
    },
    sorting: {
        type: Number
    }
})

const Category =  mongoose.model('categories', Schema); 
module.exports = Category;