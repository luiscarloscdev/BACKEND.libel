'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.Port || 3977;

mongoose.connect('mongodb://localhost:27017/libeldb', (err, res)=>{
    if(err){
        throw err;
    }else{
        console.log("La conección a la base de datos esta funcionando correctamente ...");

        app.listen(port, function(){
            console.log("El servidor de api rest de Libel Studios esta escuchando en http://localhost:"+ port);
        });
    }
});