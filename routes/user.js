'use strict'

var express = require('express');
var UserController = require('../controllers/user');
var validate = require('express-validation');
var validation = require('./validation/user');
var md_auth = require('../middlewares/authenticated');
var variable = require('../SERVICES/variable')
var multipart = require('connect-multiparty');
// var md_upload= multipart({uploadDir: './uploads/users'});
var md_upload= multipart({uploadDir: variable.AVATAR_USER});
var api= express.Router();

const expressJoi = require('express-joi-validator');

api.get('/probando-controlador/', UserController.prueba);
api.post('/register', UserController.saveUser);
api.post('/login', expressJoi(validation.loginValidation), UserController.loginUser);
api.put('/update-user/:id',[md_auth.ensureAuth ],UserController.updateUser);
api.post('/upload-image-user/:id',[md_auth.ensureAuth, md_upload],UserController.uploadImage);
api.get('/get-image-user/:imageFile',UserController.getImageFile);

module.exports = api;