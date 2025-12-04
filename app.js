const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv')

const skillsRouter = require('./routes/skills');
const categsRouter = require('./routes/ProjectCategories');
const loginRouter = require('./routes/login');
const projectRouter = require('./routes/projects');
const profileRouter = require('./routes/profile');
const cvRouter = require('./routes/cv');
const contactRouter = require('./routes/contacts');
const mongoose = require('mongoose');

const app = express();

dotenv.config();

mongoose.connect(process.env.mongoURL)
    .then(console.log("Connected to database"))
    .catch((err)=> {err.message});

app.use(logger('dev'));
app.use(express.json());

// cors permissions
app.use(cors({
    origin: 'http://localhost:8080'
}));
// Routes
app.use('/api/skills', skillsRouter);
app.use('/api/categs', categsRouter);
app.use('/api/login', loginRouter);
app.use('/api/projects', projectRouter);
app.use('/api/cv', cvRouter);
app.use('/api/contacts', contactRouter);
app.use('/images/profile', profileRouter);
// get files
app.use('/images/projectImages', express.static('./images/projectImages'));
app.use('/images/profile', express.static('./images/profileImages'));
app.use('/api/cv', express.static('./cv'));

module.exports = app
