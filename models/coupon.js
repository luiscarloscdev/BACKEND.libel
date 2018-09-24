'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CouponSchema = Schema({
    code:  String,
    count: Number,
    used: Number,
    course: {type: Schema.ObjectId, ref: 'Course'},
    plan:{type: Schema.ObjectId, ref: 'Plan'},
    discount: Number,
    startDay:{type: Date, default: Date.now},
    endDay: Date,     
    createdAt: {type: Date, default: Date.now}
    
});

module.exports = mongoose.model('Coupon',CouponSchema);