'use strict'

var Joi = require('joi');

const saveValidation={
  body:{
    title: Joi.string().regex(/[a-zA-Z0-9]{3,30}/),
    description:Joi.string().regex(/[a-zA-Z0-9]{3,300}/),    
    type:Joi.string().regex(/[a-zA-Z0-9]{3,30}/),
    categories: Joi.string(),
    level:Joi.string().regex(/[a-zA-Z0-9]{3,30}/),
    software: Joi.string()    
    
  }  
};


module.exports= {
  saveValidation   
};
