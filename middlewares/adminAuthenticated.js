'use strict'

var jwt= require('jwt-simple');
var moment =require('moment');
var secret = 'clave_secreta_libel';
var User = require('../models/user');



exports.adminAuth = function(req, res, next){

    if(!req.headers.authorization){
        return res.status(403).send({message: 'La petición no tiene la cabecera de autenticación'});        
    }

    var token = req.headers.authorization.replace(/['"]+/g,'');
    try {
        var payload= jwt.decode(token,secret);
        if(payload.role != 'Role_Admin'){
            return res.status(401).send({message: 'No tiene permisos necesarios'});            
        }
    } catch (error) {
        console.log(error);
        return req.status(404).send({message:"Token no válido"});
    }
    req.user= payload;
    next();
    
};