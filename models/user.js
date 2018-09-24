'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    username: {type: String, unique: true},
    email: {type: String, unique: true},
    firstname: String,
    lastname: String,
    provider: String,
    provider_id: String,
    password: String,
    image: String,
    role: {type: String, default: 'Role_Alumno'},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User',UserSchema);