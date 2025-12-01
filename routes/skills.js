const express = require('express');
const router = express.Router();
const Skills = require('../models/SkillsModel');

router.post('/', async (req, res, next) => {
    try {
        const input = req.body
        const data = new Skills({
            category: input.category,
            skills: input.skills,
            icon: input.icon,
            sorting: input.sorting
        })
        await data.save();
        res.status(200).send("saved successfully");
    } catch (err) {
        for (let e in err.errors) {
            console.log(err.errors[e].message);
            res.status(500).send("Bad Request..");
        }
    }
});

router.get('/', async (req, res, next) => {
    try {
        const data = await Skills.find().sort({
            sorting: 1
        });
        if (!data) return res.status(400).send("not found!");
        res.status(200).send(data);
    } catch (err) {
        for (let e in err.errors) {
            console.log(err.errors[e].message);
            res.status(500).send("Bad Request..");
        }
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const data = await Skills.findOneAndUpdate({
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
router.delete('/:id', async (req, res, next) => {
    try {
        const data = await Skills.findOneAndDelete({
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