'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas
var user_routes = require('./routes/user');
var category_routes = require('./routes/category');
var country_routes = require('./routes/country');
var level_routes = require('./routes/level');
var software_routes = require('./routes/software');
var typeOfCourse_routes = require('./routes/typeOfCourse');
var course_routes = require('./routes/course');

app.use(express.static(process.cwd() + '/public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//configuración de cabeceras http
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access' +
            '-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
// rutas base
app.use('/api', user_routes);
app.use('/api', category_routes);
app.use('/api', country_routes);
app.use('/api', level_routes);
app.use('/api', software_routes);
app.use('/api', typeOfCourse_routes);
app.use('/api', course_routes);

module.exports = app;