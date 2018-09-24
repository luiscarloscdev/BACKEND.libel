'use strict'
var Country = require('../models/Country');


function getCountries(req, res){
    var countryId = req.params.id;
    if(!countryId){
        var find = Country.find().sort('name');
    }else{
        var find= Country.findOne({id: countryId});
    }  
    find.exec((err, country)=>{
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!country){
                res.status(404).send({message: 'No se encontraron países'});
            }else{
                if(country.length > 0){
                    res.status(200).send({countries: country});
                }else{
                    res.status(404).send({message: 'No se encontraron países'});
                }
                
            }
        }        
    });   
}
function saveCountry(req, res){
     var country = new Country();
    var params = req.body;    
    country.name= params.name;
    country.active= true;        
    if(params.name != null){
        country.save((err, countryStored)=>{
            if(err){                        
                        res.status(500).send({message: 'Error al guardar el país'});
                    }else{                        
                       if(!countryStored){                           
                        res.status(404).send({message: 'No se ha registrado el país'});
                       } else{
                        res.status(200).send({country: countryStored});
                       }
                    }
        });
    } else{
        res.status(200).send({message: 'Rellena todos los campos'});    
    }                            
}

function updateCountry(req, res){
    var countryId= req.params.id;
    var update = req.body;
    
    Country.findByIdAndUpdate(countryId,update,(err,countryUpdate)=>{
        if(err){
            res.status(500).send({message:'Error al actualizar  la categoria'});
        }  else{
            if(!countryUpdate){
                res.status(404).send({message:'No se ha podido actualizar la categoria'});
            }else{
                res.status(200).send({country:countryUpdate});
            }
        }
    });
}
    
module.exports= {
    getCountries,
    saveCountry,
    updateCountry
};