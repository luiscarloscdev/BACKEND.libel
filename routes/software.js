'use strict'

var express = require('express');
var SoftwareController = require('../controllers/software');
var validate = require('express-validation');
var md_admin = require('../middlewares/adminAuthenticated');
var md_auth = require('../middlewares/authenticated');
var api= express.Router();



api.get('/softwares/:id?', SoftwareController.getSoftwares);
api.put('/update-software/:id',[md_auth.ensureAuth], SoftwareController.updateSoftware);
api.post('/add-software/',[md_auth.ensureAuth], SoftwareController.saveSoftware);

module.exports = api;