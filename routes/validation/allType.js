'use strict'

var Joi = require('joi');
 
const getValidation ={
 params: {
      id: Joi.string()
  }   
};

const updateValidation={
  body:{
    name: Joi.string().regex(/[a-zA-Z0-9]{3,30}/),    
    active: Joi.boolean()
  },
  params: {
      id: Joi.string().required()
  }    
};
const addValidation={
  body:{
    name: Joi.string().regex(/[a-zA-Z0-9]{3,30}/),        
  },      
};


module.exports= {
  getValidation,
  updateValidation,
  addValidation   
};

 