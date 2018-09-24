'use strict'
var TypeOfCourse = require('../models/typeOfCourse');


function getTypeOfCourse(req, res){
    var typeId = req.params.id;
    if(!typeId){
        var find = TypeOfCourse.find({active: true}).sort('name');
    }else{
        var find= TypeOfCourse.findOne({id: typeId});
    }  
    find.exec((err, typeOfCourse)=>{
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!typeOfCourse){
                res.status(404).send({message: 'No se encontraron tipos de cursos'});
            }else{
                if(typeOfCourse.length > 0){
                    res.status(200).send({typeOfCourses: typeOfCourse});
                }else{
                    res.status(404).send({message: 'No se encontraron tipos de cursos'});
                }
                
            }
        }        
    });   
}
function saveTypeOfCourse(req, res){
     var typeOfCourse = new TypeOfCourse();
    var params = req.body;
    
    typeOfCourse.name= params.name;
    typeOfCourse.active= true;
    
    
    if(params.name != null){
        typeOfCourse.save((err, typeOfCourseStored)=>{
            if(err){                        
                        res.status(500).send({message: 'Error al guardar el tipo de  curso'});
                    }else{                        
                       if(!typeOfCourseStored){                           
                        res.status(404).send({message: 'No se ha registrado el tipo de curso'});
                       } else{
                        res.status(200).send({typeOfCourse: typeOfCourseStored});
                       }
                    }
        });
    } else{
        res.status(200).send({message: 'Rellena todos los campos'});    
    }                            
}

function updateTypeOfCourse(req, res){
    var typeOfCourseId= req.params.id;
    var update = req.body;

    TypeOfCourse.findByIdAndUpdate(typeOfCourseId,update,(err,typeOfCourseUpdate)=>{
        if(err){
            res.status(500).send({message:'Error al actualizar  el tipo de curso'});
        }  else{
            if(!typeOfCourseUpdate){
                res.status(404).send({message:'No se ha podido actualizar el tipo de curso'});
            }else{
                res.status(200).send({typeOfCourse:typeOfCourseUpdate});
            }
        }
    });
}
    
module.exports= {
    getTypeOfCourse,
    saveTypeOfCourse,
    updateTypeOfCourse
};