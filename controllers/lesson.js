'use strict'
var Lesson = require('../models/lesson');

function getLessonByCourse(req, res){
    var courseId = req.params.courseId;
    if(!courseId){
        var find = Lesson.find().sort('order');
    }else{
        var find= Lesson.find({course: courseId});
    }  
    find.exec((err, lessons)=>{
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!lessons){
                res.status(404).send({message: 'No se encontraron clases'});
            }else{
                if(lessons.length > 0){
                    res.status(200).send({lessons: lessons});
                }else{
                    res.status(404).send({message: 'No se encontraron clases'});
                }
                
            }
        }        
    });   
}
function saveLesson(req, res){
     var lesson = new Lesson();
    var params = req.body;
    
    lesson.title= params.title;
    lesson.video= params.video;
    lesson.course= params.course;
    lesson.duration= params.duration;    
    lesson.free= params.free;
    lesson.active= false;
    
     
    
    if(params.name != null && params.title!= null && params.video!= null && params.course!= null && params.duration!= null && params.free!= null){
        lesson.save((err, lessonStored)=>{
            if(err){                        
                        res.status(500).send({message: 'Error al guardar la clase'});
                    }else{                        
                       if(!lessonStored){                           
                        res.status(404).send({message: 'No se ha registrado la clase'});
                       } else{
                        res.status(200).send({lesson: lessonStored});
                       }
                    }
        });
    } else{
        res.status(200).send({message: 'Rellena todos los campos'});    
    }                            
}

function updateLesson(req, res){
    var lessonId= req.params.id;
    var update = req.body;

    Lesson.findByIdAndUpdate(lessonId,update,(err,lessonUpdate)=>{
        if(err){
            res.status(500).send({message:'Error al actualizar la clase'});
        }  else{
            if(!lessonUpdate){
                res.status(404).send({message:'No se ha podido actualizar la clase'});
            }else{
                res.status(200).send({software:lessonUpdate});
            }
        }
    });
}

    
module.exports= {
    getLessonByCourse,
    saveLesson,
    updateLesson
};