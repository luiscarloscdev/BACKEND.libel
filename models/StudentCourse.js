'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentCourseSchema = Schema({
    course: {type: Schema.ObjectId, ref: 'Course'},
    user:{type: Schema.ObjectId, ref: 'User'},
    endDay: Date,
    appreciation: Number,
    experience: String,
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('StudentCourse',StudentCourseSchema);