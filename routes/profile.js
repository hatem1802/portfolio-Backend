const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const upload = require('../middlewares/multerMW');

const Schema = new mongoose.Schema({
    imageURL: String,
    isActive: Boolean
})

const Profile = mongoose.model('profile', Schema);

router.post('/', upload.Profile.single('imageFile'), async (req, res) => {
    const profile = new Profile({
        imageURL: `http://localhost:3000/images/profile/${req.file.filename}`,
        isActive: false
    })
    await profile.save();
    res.status(200).send("file uploadded successfully");
})

router.get('/', async (req, res) => {
    const data = await Profile.findOne({
        isActive: true
    })
    res.status(200).send(data);
})

router.put('/', async (req, res) => {
    const data = await Profile.findOneAndUpdate({
        _id: req.body._id
    }, req.body)
    res.status(200).send("updated successfully");
})

router.delete('/', async (req, res) => {
    const data = await Profile.findOneAndDelete({
        _id: req.body._id
    })
    res.status(200).send("deleted successfully");
})

module.exports = router;