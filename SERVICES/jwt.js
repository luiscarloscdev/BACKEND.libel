'use strict'

var jwt= require('jwt-simple');
var moment =require('moment');
var secret = 'clave_secreta_libel';

exports.createToken= function(user){
    var payload={
        sub: user._id,        
        username: user.username,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,        
        image: user.image,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    }    
    return jwt.encode(payload,secret);
};
