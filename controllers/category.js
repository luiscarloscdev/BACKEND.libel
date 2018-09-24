'use strict'
var Category = require('../models/category');


function getCategories(req, res){
    var categoryId = req.params.id;
    if(!categoryId){
        var find = Category.find({active: true}).sort('name');
    }else{
        var find= Category.findOne({id: categoryId});
    }  
    find.exec((err, categories)=>{
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!categories){
                res.status(404).send({message: 'No se encontraron categorias'});
            }else{
                if(categories.length > 0){
                    res.status(200).send({categories: categories});
                }else{
                    res.status(404).send({message: 'No se encontraron categorias'});
                }
                
            }
        }        
    });   
}
function saveCategories(req, res){
     var categoria = new Category();
    var params = req.body;
    console.log(params);
    categoria.name= params.name;
    categoria.active= true;
    
    
    if(params.name != null){
        categoria.save((err, categoriaStored)=>{
            if(err){                        
                        res.status(500).send({message: 'Error al guardar la categoria'});
                    }else{                        
                       if(!categoriaStored){                           
                        res.status(404).send({message: 'No se ha registrado la categoria'});
                       } else{
                        res.status(200).send({category: categoriaStored});
                       }
                    }
        });
    } else{
        res.status(200).send({message: 'Rellena todos los campos'});    
    }                            
}

function updateCategory(req, res){
    var categoryId= req.params.id;
    var update = req.body;

    Category.findByIdAndUpdate(categoryId,update,(err,categoryUpdate)=>{
        if(err){
            res.status(500).send({message:'Error al actualizar  la categoria'});
        }  else{
            if(!categoryUpdate){
                res.status(404).send({message:'No se ha podido actualizar la categoria'});
            }else{
                res.status(200).send({category:categoryUpdate});
            }
        }
    });
}
    
module.exports= {
    getCategories,
    saveCategories,
    updateCategory
};