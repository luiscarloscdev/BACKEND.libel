'use strict'

var express = require('express');
var LevelController = require('../controllers/level');
var validate = require('express-validation');
var md_admin = require('../middlewares/adminAuthenticated');
var md_auth = require('../middlewares/authenticated');
var api= express.Router();


api.get('/levels/:id?', LevelController.getLevels);
api.put('/update-level/:id',[md_auth.ensureAuth], LevelController.updateLevel);
api.post('/add-level/',[md_auth.ensureAuth], LevelController.saveLevel);

module.exports = api;