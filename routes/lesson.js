'use strict'

var express = require('express');
var LessonController = require('../controllers/lesson');
var validate = require('express-validation');
var validation = require('./validation/course');
var md_auth = require('../middlewares/authenticated');
var variable = require('../SERVICES/variable');

var api= express.Router();
const expressJoi = require('express-joi-validator');


api.post('/add-lesson', LessonController.saveLesson);
api.get('/lessons-by-course/:courseId?',LessonController.getLessonByCourse);

api.post('/upload-lesson/:id',LessonController.updateLesson);

module.exports = api;