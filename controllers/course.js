'use strict'
var fs = require('fs');
var path = require('path');
var mongoosePaginate = require('mongoose-pagination');
var moment    = require('moment');
var Course = require('../models/course');
var Software = require('../models/software');
var Type = require('../models/typeOfCourse');
var Level = require('../models/level');
var Category = require('../models/category');
var variables= require('../SERVICES/variable');

function saveCourse(req, res){
    var course = new Course();
    var params = req.body;
    console.log(params);
    course.title= params.title;
    course.description= params.description;    
    course.type= params.type;
    course.categories= JSON.parse(params.categories);
    course.level= params.level;
    course.software= JSON.parse(params.software);                                           
    course.active=false;
    course.promotion= false;
            
    course.save((err, courseStored)=>{
        console.log(err);
        if(err){            
            res.status(500).send({message: 'Error al guardar el curso'});
        }else{            
            if(!courseStored){                
                res.status(404).send({message: 'No se ha registrado el curso'});
            } else{
                res.status(200).send({course: courseStored});
            }
        }
    });        
}
function updateCourse(req, res){
    var courseId= req.params.id;
    var update = req.body;

    Course.findByIdAndUpdate(courseId,update,(err,courseUpdate)=>{
        if(err){
            res.status(500).send({message:'Error al actualizar  el curso'});
        }  else{
            if(!courseUpdate){
                res.status(404).send({message:'No se ha podido actualizar el curso'});
            }else{
                res.status(200).send({course:courseUpdate});
            }
        }
    });
}
function uploadImagePrincipal(req, res){
    var courseId= req.params.id;
    var file_name = 'No subido...';
    
    if(req.files){
        var file_path = req.files.image.path;
        var file_split= file_path.split('\\');
        var file_name= file_split[2];
        var fileOld;
        var ext_split = file_name.split('\.');
        var file_ext= ext_split[1].toLowerCase();
        if(file_ext =='png' || file_ext =='jpg'||file_ext =='gif' ){
            Course.findById(courseId,(err,courseOld)=>{
                if(err){
                    res.status(500).send({message:'Error al actualizar  el usuario'});
                }  else{
                    if(!courseOld){
                        res.status(404).send({message:'No se ha podido actualizar el usuario'});
                    }else{
                        fileOld= courseOld.imageSmall;        
                        Course.findByIdAndUpdate(courseId, {imagePrincipal: file_name},(err,courseUpdate)=>{
                             if(err){
                                    res.status(500).send({message:'Error al actualizar  el usuario'});
                                }  else{
                                    if(!courseUpdate){
                                        res.status(404).send({message:'No se ha podido actualizar el usuario'});
                                    }else{
                                        fs.exists(variables.IMAGE_COURSE + fileOld, function(exists){
                                            if(exists){
                                                fs.unlink(variables.IMAGE_COURSE+ fileOld, function(err, result) {
                                                    if (!err){
                                                        res.status(200).send({course:courseUpdate});
                                                    }
                                                  });
                                            }else{
                                                res.status(200).send({course:courseUpdate});
                                            }
                                        });
                                    }
                                }
                        });
                    }
                }
            });
       
        }  else{
            res.status(200).send({message:'La extencion del archivo no es valido'});
        }        
    }else{
        res.status(200).send({message: 'No ha subido ninguna imagen ...'});
    }
    
}
function uploadImageSmall(req, res){
    var courseId= req.params.id;
    var file_name = 'No subido...';
    
    if(req.files){
        var file_path = req.files.image.path;
        var file_split= file_path.split('\\');
        var file_name= file_split[2];
        var fileOld;
        var ext_split = file_name.split('\.');
        var file_ext= ext_split[1].toLowerCase();
        if(file_ext =='png' || file_ext =='jpg'||file_ext =='gif' ){
            Course.findById(courseId,(err,courseOld)=>{
                if(err){
                    res.status(500).send({message:'Error al actualizar  el usuario'});
                }  else{
                    if(!courseOld){
                        res.status(404).send({message:'No se ha podido actualizar el usuario'});
                    }else{
                        fileOld= courseOld.imageSmall;        
                        Course.findByIdAndUpdate(courseId, {imageSmall: file_name},(err,courseUpdate)=>{
                             if(err){
                                    res.status(500).send({message:'Error al actualizar  el usuario'});
                                }  else{
                                    if(!courseUpdate){
                                        res.status(404).send({message:'No se ha podido actualizar el usuario'});
                                    }else{
                                        fs.exists(variables.IMAGE_COURSE + fileOld, function(exists){
                                            if(exists){
                                                fs.unlink(variables.IMAGE_COURSE+ fileOld, function(err, result) {
                                                    if (!err){
                                                        res.status(200).send({course:courseUpdate});
                                                    }
                                                  });
                                            }else{
                                                res.status(200).send({course:courseUpdate});
                                            }
                                        });
                                    }
                                }
                        });
                    }
                }
            });
       
        }  else{
            res.status(200).send({message:'La extencion del archivo no es valido'});
        }        
    }else{
        res.status(200).send({message: 'No ha subido ninguna imagen ...'});
    }
}
function getCourses(req, res){
    var page = req.params.page;
    var itemsPerPage=6;
    // {Software:'5b97ccccd8afb83e685e8c7d'}
    // Course.find({software: { _id: '5b97cd3ad8afb83e685e8c83' }}).populate('categories').populate('level').populate('type').populate('software').sort('createdAt').paginate(page, itemsPerPage ,(err, coursesStored, total)=>{
    Course.find().populate('categories').populate('level').populate('type').populate('software').sort('createdAt').paginate(page, itemsPerPage ,(err, coursesStored, total)=>{
        if (err) {
            console.log(err);
             res.status(500).send({message:'Error al actualizar  el curso'});
        }else{
            if (coursesStored.length <=0){
                res.status(200).send({message: 'No se encuentran cursos'});
            }else{
                res.status(200).send({courses: coursesStored, total: total, page: page});
            }               
        }
    }); 
}

function getCoursesCategory(req, res){
    var filtro = req.params.filtro;
    var parametros = filtro.split('-');
    var categoryId= parametros[0];
    var page = parametros[1];
    var itemsPerPage=20;
        
    Course.find({categories: { _id: categoryId }}).populate('categories').populate('level').populate('type').populate('software').sort('createdAt').paginate(page, itemsPerPage ,(err, coursesStored, total)=>{
        if (err) {            
             res.status(500).send({message:'Error al obtener cursos'});
        }else{
            if (coursesStored.length <=0){
                res.status(200).send({message: 'No se encuentran cursos'});
            }else{
                res.status(200).send({courses: coursesStored, total: total, page: page});
            }               
        }
    }); 
}
function getCoursesLevel(req, res){
    var filtro = req.params.filtro;
    var parametros = filtro.split('-');
    var levelId= parametros[0];
    var page = parametros[1];
    var itemsPerPage=20;
        
    Course.find({level: levelId }).populate('categories').populate('level').populate('type').populate('software').sort('createdAt').paginate(page, itemsPerPage ,(err, coursesStored, total)=>{
        if (err) {            
             res.status(500).send({message:'Error al obtener cursos'});
        }else{
            if (coursesStored.length <=0){
                res.status(200).send({message: 'No se encuentran cursos'});
            }else{
                res.status(200).send({courses: coursesStored, total: total, page: page});
            }               
        }
    }); 
}
function getCoursesSoftware(req, res){
    var filtro = req.params.filtro;
    var parametros = filtro.split('-');
    var softwareId= parametros[0];
    var page = parametros[1];
    var itemsPerPage=20;
        
    Course.find({software: { _id: softwareId }}).populate('categories').populate('level').populate('type').populate('software').sort('createdAt').paginate(page, itemsPerPage ,(err, coursesStored, total)=>{
        if (err) {            
             res.status(500).send({message:'Error al obtener cursos'});
        }else{
            if (coursesStored.length <=0){
                res.status(200).send({message: 'No se encuentran cursos'});
            }else{
                res.status(200).send({courses: coursesStored, total: total, page: page});
            }               
        }
    }); 
}
function getCoursesType(req, res){
    var filtro = req.params.filtro;
    var parametros = filtro.split('-');
    var typeId= parametros[0];
    var page = parametros[1];
    var itemsPerPage=20;
        
    Course.find({type: typeId }).populate('categories').populate('level').populate('type').populate('software').sort('createdAt').paginate(page, itemsPerPage ,(err, coursesStored, total)=>{
        if (err) {            
             res.status(500).send({message:'Error al obtener cursos'});
        }else{
            if (coursesStored.length <=0){
                res.status(200).send({message: 'No se encuentran cursos'});
            }else{
                res.status(200).send({courses: coursesStored, total: total, page: page});
            }               
        }
    }); 
}

function getHome(req, res){
    var page = req.params.page;
    var itemsPerPage=6;
    var softwareId;
    var typeId;
    var typeLive;
    var courseFree;
    var courseZbrush;
    var course;
    var course1;
    var courseNew;
    var courseLive;
    var _now = new Date();
    
    //primero tengo que trar los cursos de software zbrush
    Software.find({name:'Zbrush'}).exec((err, softwaresStore)=>{
        if(err){
            res.status(500).send({message:'Error al traer curso'});
        }else{
            if(softwaresStore.length > 0){
                softwareId = softwaresStore[0]._id;                
            }
            // Segundo obtengo el id de typo gratis
            Type.find({name:'Gratis'}).exec((err, typeStore)=>{
                if(err){
                    res.status(500).send({message:'Error al traer curso'});
                }else{
                    if(typeStore.length > 0){
                        typeId = typeStore[0]._id;                       
                    }
                    Course.find({software: { _id: softwareId }}).populate('categories').populate('level').populate('type').populate('software').sort('createdAt').paginate(1, 4 ,(err, coursesStored, total)=>{
                        if (err) {
                                res.status(500).send({message:'Error al obtener cursos'});
                        }else{
                            if (coursesStored.length >0){
                                courseZbrush= coursesStored;
                            }
                            Course.find({type: typeId}).populate('categories').populate('level').populate('type').populate('software').sort('createdAt').paginate(1, 4 ,(err, coursesStored2, total)=>{
                                if (err) {
                                        res.status(500).send({message:'Error al obtener cursos'});
                                }else{
                                    if (coursesStored2.length >0){
                                        courseFree= coursesStored2;
                                    }
                                    Course.find().populate('categories').populate('level').populate('type').populate('software').sort('createdAt').paginate(1, 7 ,(err, coursesStored3, total)=>{
                                        if (err) {
                                                res.status(500).send({message:'Error al obtener cursos'});
                                        }else{
                                            if (coursesStored2.length >0){
                                                course1=coursesStored3.pop();
                                                course= coursesStored3;
                                            }
                                            Course.find({startDay: {$gt: _now}}).populate('categories').populate('level').populate('type').populate('software').sort('createdAt').paginate(1, 4 ,(err, coursesStored4, total)=>{
                                                if (err) {
                                                    console.log(err);
                                                        res.status(500).send({message:'Error al obtener cursos'});
                                                }else{
                                                    if (coursesStored4.length >0){
                                                        courseNew= coursesStored4;
                                                    }//Streaming
                                                    Type.find({name:'Streaming'}).exec((err, typeStore2)=>{
                                                        if (err) {
                                                            console.log(err);
                                                                res.status(500).send({message:'Error al obtener cursos'});
                                                        }else{
                                                            if (typeStore2.length >0){
                                                                typeLive= typeStore2[0]._id;    ;
                                                            }//Streaming
                                                            Course.find({startDay: {$gte: _now}, type: typeLive}).populate('categories').populate('level').populate('type').populate('software').sort('createdAt').paginate(1, 4 ,(err, coursesStored5, total)=>{
                                                                if (err) {
                                                                    console.log(err);
                                                                        res.status(500).send({message:'Error al obtener cursos'});
                                                                }else{
                                                                    if (coursesStored5.length >0){
                                                                        courseLive= coursesStored5[0];
                                                                    }//Streaming
                                                                    res.status(200).send({courses:course,course1:course1, coursesFree: courseFree, coursesZbrush:courseZbrush, courseNew:courseNew,courseLive: courseLive});
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });     
                                }
                            });                       
                        }
                    });            
                    
                }
            });        
        }
    });

   
}
function getCourseImage(req,res){
    var imageFile = req.params.imageFile;
    var path_file = variables.IMAGE_COURSE + imageFile;    
    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message: 'No existe la imagen'});
        }
    });
}

module.exports= {   
    saveCourse,    
    updateCourse,
    uploadImagePrincipal,
    uploadImageSmall,
    getCourses,
    getHome,
    getCourseImage,
    getCoursesCategory,
    getCoursesLevel,
    getCoursesSoftware,
    getCoursesType
};