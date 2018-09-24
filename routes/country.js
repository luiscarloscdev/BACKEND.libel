'use strict'

var express = require('express');
var CountryController = require('../controllers/country');
var validate = require('express-validation');
var md_admin = require('../middlewares/adminAuthenticated');
var md_auth = require('../middlewares/authenticated');
var api= express.Router();
var validation = require('./validation/allType');
const expressJoi = require('express-joi-validator');

api.get('/countries/:id?',[md_auth.ensureAuth,expressJoi(validation.getValidation)], CountryController.getCountries);
api.put('/update-country/:id',[md_auth.ensureAuth, md_admin.adminAuth, expressJoi(validation.updateValidation)], CountryController.updateCountry);
api.post('/add-country/',[md_auth.ensureAuth, md_admin.adminAuth, expressJoi(validation.addValidation)], CountryController.saveCountry);

module.exports = api;