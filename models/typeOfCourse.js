'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TypeOfCourseSchema = Schema({
    name:  String,
    active: Boolean         
});

module.exports = mongoose.model('TypeOfCourse',TypeOfCourseSchema);