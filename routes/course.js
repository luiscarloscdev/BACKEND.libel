'use strict'

var express = require('express');
var CourseController = require('../controllers/course');
var validate = require('express-validation');
var validation = require('./validation/course');
var md_auth = require('../middlewares/authenticated');
var variable = require('../SERVICES/variable');
var multipart = require('connect-multiparty');
var md_upload= multipart({uploadDir: variable.IMAGE_COURSE});
var api= express.Router();
const expressJoi = require('express-joi-validator');

api.get('/get-image-course/:imageFile',CourseController.getCourseImage);

//urls para la parte de administracion 
api.post('/add-course', expressJoi(validation.saveValidation), CourseController.saveCourse);
api.put('/update-course/:id',CourseController.updateCourse);
api.post('/upload-image-principal/:id',[md_upload],CourseController.uploadImagePrincipal);
api.post('/upload-image-small/:id',[md_upload],CourseController.uploadImageSmall);


// url solo para la pagina del home
api.get('/home',CourseController.getHome);

//Estas url son para la pagina de cursos para que anden bien los filtros de la pagina
api.get('/courses/:page?',  CourseController.getCourses);
api.get('/courses-category/:filtro',  CourseController.getCoursesCategory);
api.get('/courses-level/:filtro',  CourseController.getCoursesLevel);
api.get('/courses-software/:filtro',  CourseController.getCoursesSoftware);
api.get('/courses-type/:filtro',  CourseController.getCoursesType);


module.exports = api;