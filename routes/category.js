'use strict'

var express = require('express');
var CategoryController = require('../controllers/category');
var validate = require('express-validation');
var md_admin = require('../middlewares/adminAuthenticated');
var md_auth = require('../middlewares/authenticated');

var api= express.Router();
var validation = require('./validation/allType');
const expressJoi = require('express-joi-validator');

api.get('/categories/:id?', CategoryController.getCategories);
api.put('/update-category/:id',[md_auth.ensureAuth, expressJoi(validation.updateValidation)], CategoryController.updateCategory);
api.post('/add-category/',[md_auth.ensureAuth, expressJoi(validation.addValidation)], CategoryController.saveCategories);

module.exports = api;