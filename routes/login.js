const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Pass = require('../models/PassModel');

router.post('/', async (req, res, next) => {
    try {
        // get password from db
        const passDB = await Pass.findOne({
            _id: "68fccdd52372945fed719b4b"
        })
        // compare the inputed password with the db password
        const checkPass = await bcrypt.compare(req.body.password, passDB.password);
        // if false return with false
        if (!checkPass) {
            return res.status(401).send(false);
        }
        // if true response with true
        res.status(200).send(true);
    } catch (err) {
        for (let e in err.errors) {
            console.log(err.errors[e].message);
            res.status(500).send("Bad Request..");
        }
    }
})
module.exports = router;