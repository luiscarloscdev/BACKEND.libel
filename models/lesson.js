'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LessonSchema = Schema({
    title: String,
    video: String,
    course: {type: Schema.ObjectId, ref: 'Course'},
    duration: Number,
    order: Number,
    free: Boolean,
    active: Boolean,
    createdAt: {type: Date, default: Date.now}             
});

module.exports = mongoose.model('Lesson',LessonSchema);