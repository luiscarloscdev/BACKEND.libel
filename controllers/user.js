'use strict'
var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');

function prueba(req, res){
    res.status(200).send({message:'la api rest esta andando bien!!!'});
}
function saveUser(req, res){
    var user = new User();
    var params = req.body;

    user.username= params.username;
    user.email= params.email;
    user.firstname= params.firstname;
    user.lastname= params.lastname;
    user.provider="local";
    user.provider_id='null';
    user.image='null' ;
    
    
    if(params.password){
        bcrypt.hash(params.password, null, null, function(err,hash){
            user.password=hash;
            if(user.username != null && user.email != null && user.lastname!= null && user.firstname != null){
                //guardar el usuario
                user.save((err, userStored)=>{
                    if(err){
                        res.status(500).send({message: 'Error al guardar el usuario'});
                    }else{
                           console.log(userStored);
                       if(!userStored){
                           res.status(404).send({message: 'No se ha registrado el usuario'});
                       } else{
                           res.status(200).send({user: userStored});
                       }
                    }
                });
            }else{
               res.status(200).send({message: 'Rellena todos los campos'});
            }
        });
        
    }else{
      res.status(200).send({message: 'introduce la contraseña'});
    }
    
}
function updateUser(req, res){
    var userId= req.params.id;
    var update = req.body;

    User.findByIdAndUpdate(userId,update,(err,userUpdate)=>{
        if(err){
            res.status(500).send({message:'Error al actualizar  el usuario'});
        }  else{
            if(!userUpdate){
                res.status(404).send({message:'No se ha podido actualizar el usuario'});
            }else{
                res.status(200).send({user:userUpdate});
            }
        }
    });
}
function uploadImage(req, res){
    var userId= req.params.id;
    var file_name = 'No subido...';
    var fileOld;
    if(req.files){
        var file_path = req.files.image.path;
        var file_split= file_path.split('\\');
        var file_name= file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext= ext_split[1].toLowerCase();
        if(file_ext =='png' || file_ext =='jpg'||file_ext =='gif' ){
            User.findById(userId,(err,userOld)=>{
                if(err){
                    res.status(500).send({message:'Error al actualizar  el usuario'});
                }  else{
                    if(!userOld){
                        res.status(404).send({message:'No se ha podido actualizar el usuario'});
                    }else{
                        fileOld= userOld.image;        
                        User.findByIdAndUpdate(userId, {image: file_name},(err,userUpdate)=>{
                             if(err){
                                    res.status(500).send({message:'Error al actualizar  el usuario'});
                                }  else{
                                    if(!userUpdate){
                                        res.status(404).send({message:'No se ha podido actualizar el usuario'});
                                    }else{
                                        fs.exists('./uploads/users/'+ fileOld, function(exists){
                                            if(exists){
                                                fs.unlink('./uploads/users/'+ fileOld, function(err, result) {
                                                    if (!err){
                                                        res.status(200).send({user:userUpdate});
                                                    }
                                                  });
                                            }else{
                                                res.status(200).send({user:userUpdate});
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
        console.log(file_path);
    }else{
        res.status(200).send({message: 'No ha subido ninguna imagen ...'});
    }
}
function loginUser(req, res){
    var params = req.body;

    var email= params.email.toLowerCase();
    var password = params.password;
    User.findOne({email: email}, (err, user)=>{
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!user){
                res.status(404).send({message: 'El usuario no es correcto'});
            }else{
                bcrypt.compare(password,user.password, (err,check)=>{
                    
                    if(check){
                        if(params.gethash){
                            res.status(200).send({token: jwt.createToken(user)});                            
                        }else{
                            res.status(200).send({user});
                        }
                    }else{
                        res.status(404).send({message: 'El usuario y/o la contraseña no son correctas'});
                    }
                })
            }
        }
    });
}
function getImageFile(req,res){
    var imageFile = req.params.imageFile;
    var path_file = './uploads/users/'+ imageFile;
    console.log('entro');
    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message: 'No existe la imagen'});
        }
    });
}
module.exports= {
    prueba,
    saveUser,
    loginUser,
    updateUser,
    uploadImage,
    getImageFile
};