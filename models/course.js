'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourseSchema = Schema({
    title:  String,
    description: String,
    presentationVideo: String,
    type: {type: Schema.ObjectId, ref: 'TypeOfCourse'},
    categories: [{type: Schema.ObjectId, ref: 'Category'}],
    level: {type: Schema.ObjectId, ref: 'Level'},
    software: [{type: Schema.ObjectId, ref: 'Software'}],
    duration: Number,
    numberOfClasses: Number,
    appreciation: Number,
    numberOfStudents: Number,
    imageSmall: String,
    imagePrincipal:String,
    price: Number,
    discount: Number,
    startDay:{type: Date, default: Date.now},
    endDay: Date, 
    createdAt: {type: Date, default: Date.now},
    active: Boolean,
    promotion: Boolean
});

module.exports = mongoose.model('Course',CourseSchema);