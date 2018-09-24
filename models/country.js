'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CountrySchema = Schema({
    name:  String, 
    active: Boolean       
});

module.exports = mongoose.model('Country',CountrySchema);