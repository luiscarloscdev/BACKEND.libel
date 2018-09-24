'use strict'
var Joi = require ('joi');
var jwt= require('jwt-simple');
var moment =require('moment');
var secret = 'clave_secreta_libel';





exports.test = function(req, res, next){
    

    var token = req.headers.authorization.replace(/['"]+/g,'');
    try {
        var payload= jwt.decode(token,secret);
        if(payload.exp <= moment().unix()){
            return res.status(401).send({message: 'El token ha expirado'});            
        }
    } catch (error) {
        console.log(error);
        return req.status(404).send({message:"Token no válido"});
    }
    req.user= payload;
    next();
};