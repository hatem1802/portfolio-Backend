const multer = require('multer')
const path = require('path');

// determine storage file and file name of profile image
const cvStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', '/cv')); // name of storage folder
    },
    filename: (req, file, cb) => { // 
        cb(null, file.originalname)
    }
})
// determine storage file and file name of profile image
const profileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'images/profileImages')); // name of storage folder
    },
    filename: (req, file, cb) => { // 
        cb(null, "profile" + path.extname(file.originalname))
    }
})
// determine storage file and file name of projects images
const projectImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'images/projectImages')); // name of storage folder
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
// multer middlewares

// cv file
const CV = multer({
    storage: cvStorage
})
// profile image
const Profile = multer({
    storage: profileStorage
})
// project iamge
const projectImages = multer({
    storage: projectImageStorage
})

module.exports = {
    CV,
    Profile,
    projectImages
}