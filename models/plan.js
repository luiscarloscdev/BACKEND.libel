'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlanSchema = Schema({
    name:  String,
    description: String,
    numberOfDays: Number,
    price: Number,
    discount: Number,
    startDay:{type: Date, default: Date.now},
    endDay: Date, 
    courses:[{type: Schema.ObjectId, ref: 'Course'}],
    createdAt: {type: Date, default: Date.now},
    active: Boolean
});

module.exports = mongoose.model('Plan',PlanSchema);