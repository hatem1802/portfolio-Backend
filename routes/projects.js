const express = require('express');
const router = express.Router();
const Project = require('../models/ProjectsModel');
const upload = require('../middlewares/multerMW');

// ,upload.projectImages.single('imageFile')
router.post('/image', upload.projectImages.single('imageFile'), async(req, res, next) => {
    res.status(200).send("image saved successfully")
})

router.post('/', async (req, res, next) => {
    const modifiedSkills = req.body.skills.split(",");
    console.log(modifiedSkills);
    try {
        const input = req.body;
        const project = new Project({
            title: input.title,
            description: input.description,
            skills: modifiedSkills,
            githubURL: input.githubURL,
            liveURL: input.liveURL,
            category: input.category,
            sorting: input.sorting
        })
        project.imageURL = `http://localhost:3000/images/projectImages/${req.body.fileName}`
        await project.save();
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
        const data = await Project.find().sort({
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
        const data = await Project.findOneAndUpdate({
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
        const data = await Project.findOneAndDelete({
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