'use strict'
var Level = require('../models/level');


function getLevels(req, res){
    var levelId = req.params.id;
    if(!levelId){
        var find = Level.find({active: true}).sort('name');
    }else{
        var find= Level.findOne({id: levelId});
    }  
    find.exec((err, levels)=>{
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!levels){
                res.status(404).send({message: 'No se encontraron niveles'});
            }else{
                if(levels.length > 0){
                    res.status(200).send({levels: levels});
                }else{
                    res.status(404).send({message: 'No se encontraron niveles'});
                }
                
            }
        }        
    });   
}
function saveLevel(req, res){
     var level = new Level();
    var params = req.body;
    
    level.name= params.name;
    level.active= true;
    
    
    if(params.name != null){
        level.save((err, levelStored)=>{
            if(err){                        
                        res.status(500).send({message: 'Error al guardar el nivel'});
                    }else{                        
                       if(!levelStored){                           
                        res.status(404).send({message: 'No se ha registrado el nivel'});
                       } else{
                        res.status(200).send({level: levelStored});
                       }
                    }
        });
    } else{
        res.status(200).send({message: 'Rellena todos los campos'});    
    }                            
}

function updateLevel(req, res){
    var levelId= req.params.id;
    var update = req.body;

    Level.findByIdAndUpdate(levelId,update,(err,levelUpdate)=>{
        if(err){
            res.status(500).send({message:'Error al actualizar  el nivel'});
        }  else{
            if(!levelUpdate){
                res.status(404).send({message:'No se ha podido actualizar el nivel'});
            }else{
                res.status(200).send({level:levelUpdate});
            }
        }
    });
}
    
module.exports= {
    getLevels,
    saveLevel,
    updateLevel
};