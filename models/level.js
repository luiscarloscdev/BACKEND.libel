'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LevelSchema = Schema({
    name:  String,
    active: Boolean         
});

module.exports = mongoose.model('Level',LevelSchema);