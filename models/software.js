'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SoftwareSchema = Schema({
    name:  String,        
    active: Boolean
});

module.exports = mongoose.model('Software',SoftwareSchema);