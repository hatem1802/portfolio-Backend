const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const upload = require('../middlewares/multerMW');

const Schema = new mongoose.Schema({
    fileName: String,
    cvURL: String,
    isActive: Boolean
})

const CV = mongoose.model('cvs', Schema);

router.post('/', upload.CV.single('cvFile'), async (req, res) => {
    if (!req.file) {
        return;
    }
    try {
        const cv = new CV({
            fileName: req.file.filename,
            cvURL: `http://localhost:3000/api/cv/${req.file.filename}`,
            isActive: false
        })
        await cv.save();
        res.status(200).send("file uploadded successfully");
    } catch (err) {
        for (let e in err.errors) {
            console.log(err.errors[e].message);
            res.status(500).send("Bad Request..");
        }
    }
})

router.get('/home', async (req, res) => {
    const data = await CV.findOne({
        isActive: true
    });
    res.status(200).send(data);
})

router.get('/dashboard', async (req, res) => {
    const data = await CV.find();
    res.status(200).send(data);
})

router.put('/:id', async (req, res) => {
    try {
        const updated = await CV.findOneAndUpdate({
            isActive: true
        }, {
            isActive: false
        })
        const data = await CV.findOneAndUpdate({
            _id: req.params.id
        }, req.body)
        res.status(200).send("updated successfully");
    } catch (err) {
        for (let e in err.errors) {
            console.log(err.errors[e].message);
            res.status(500).send("Bad Request..");
        }
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const data = await CV.findOneAndDelete({
            _id: req.params.id
        })
        console.log(data)
        res.status(200).send("deleted successfully");
    } catch (err) {
        for (let e in err.errors) {
            console.log(err.errors[e].message);
            res.status(500).send("Bad Request..");
        }
    }
})

module.exports = router;