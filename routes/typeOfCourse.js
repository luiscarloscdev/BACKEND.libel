'use strict'

var express = require('express');
var TypeOfCourseController = require('../controllers/typeOfCourse');
var validate = require('express-validation');
var md_admin = require('../middlewares/adminAuthenticated');
var md_auth = require('../middlewares/authenticated');
var api= express.Router();



api.get('/typeOfCourses/:id?', TypeOfCourseController.getTypeOfCourse);
api.put('/update-typeOfCourse/:id',[md_auth.ensureAuth], TypeOfCourseController.updateTypeOfCourse);
api.post('/add-typeOfCourse/',[md_auth.ensureAuth], TypeOfCourseController.saveTypeOfCourse);

module.exports = api;