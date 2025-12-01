const express = require('express');
const router = express.Router();
const Contact = require('../models/ContactModel');

router.post('/', async (req, res) => {
    try {
        const data = new Contact(req.body);
        await data.save();
        res.status(200).send("saved successfully");
    } catch (err) {
        for (let e in err.errors) {
            console.log(err.errors[e].message);
            res.status(500).send("Bad Request..");
        }
    }
});

router.get('/', async (req, res) => {
    try {
        const data = await Contact.findOne({
            _id: "6910c934d3097bdebe0883e1"
        })
        if (!data) return res.status(400).send("not found!");
        res.status(200).send(data);
    } catch (err) {
        for (let e in err.errors) {
            console.log(err.errors[e].message);
            res.status(500).send("Bad Request..");
        }
    }
})

router.put('/:id', async (req, res) => {
    try {
        const data = await Contact.findOneAndUpdate({
            _id: req.params.id
        }, req.body, {
            new: true
        });
        if (!data) return res.status(400).send("not found!");
        res.send(data);
    } catch (err) {
        for (let e in err.errors) {
            console.log(err.errors[e].message);
            res.status(500).send("Bad Request..");
        }
    }
})
router.delete('/:id', async (req, res) => {
    try {
        const data = await Contact.findOneAndDelete({
            _id: req.params.id
        });
        if (!data) return res.status(400).send("not found!");
        res.send(data);
    } catch (err) {
        for (let e in err.errors) {
            console.log(err.errors[e].message);
            res.status(500).send("Bad Request..");
        }
    }
})

module.exports = router;