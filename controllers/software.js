'use strict'
var Software = require('../models/software');


function getSoftwares(req, res){
    var softwareId = req.params.id;
    if(!softwareId){
        var find = Software.find({active: true}).sort('name');
    }else{
        var find= Software.findOne({id: softwareId});
    }  
    find.exec((err, softwares)=>{
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!softwares){
                res.status(404).send({message: 'No se encontraron software'});
            }else{
                if(softwares.length > 0){
                    res.status(200).send({softwares: softwares});
                }else{
                    res.status(404).send({message: 'No se encontraron software'});
                }
                
            }
        }        
    });   
}
function saveSoftware(req, res){
     var software = new Software();
    var params = req.body;
    
    software.name= params.name;
    software.active= true;
    
    
    if(params.name != null){
        software.save((err, softwareStored)=>{
            if(err){                        
                        res.status(500).send({message: 'Error al guardar el software'});
                    }else{                        
                       if(!softwareStored){                           
                        res.status(404).send({message: 'No se ha registrado el software'});
                       } else{
                        res.status(200).send({software: softwareStored});
                       }
                    }
        });
    } else{
        res.status(200).send({message: 'Rellena todos los campos'});    
    }                            
}

function updateSoftware(req, res){
    var softwareId= req.params.id;
    var update = req.body;

    Software.findByIdAndUpdate(softwareId,update,(err,softwareUpdate)=>{
        if(err){
            res.status(500).send({message:'Error al actualizar  el software'});
        }  else{
            if(!softwareUpdate){
                res.status(404).send({message:'No se ha podido actualizar el software'});
            }else{
                res.status(200).send({software:softwareUpdate});
            }
        }
    });
}
    
module.exports= {
    getSoftwares,
    saveSoftware,
    updateSoftware
};