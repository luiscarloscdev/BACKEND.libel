'use strict'

var Joi = require('joi');
 
const loginValidation ={
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required(),
    gethash: Joi.boolean()
  }
};

const updateValidation={
  body:{
    username: Joi.string().regex(/[a-zA-Z0-9]{3,30}/),
    email: Joi.string().email(),
    firstname: Joi.string().regex(/[a-zA-Z0-9]{3,30}/),
    lastname: Joi.string().regex(/[a-zA-Z0-9]{3,30}/),
    provider: Joi.string().regex(/[a-zA-Z0-9]{3,30}/),
    provider_id: Joi.string().regex(/[a-zA-Z0-9]{3,30}/),
    password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/),
    image: Joi.string().regex(/[a-zA-Z0-9]{3,30}/)
  },
  params: {
      id: Joi.number().required()
  }    
};
const addValidation={
  body:{
    username: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required(),
    email: Joi.string().email().required(),
    firstname: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required(),
    lastname: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required(),
    provider: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required(),
    provider_id: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required(),
    password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required(),
    image: Joi.string().regex(/[a-zA-Z0-9]{3,30}/)
  }    
};
// const schema = {
//     // query: {
//     //     name: Joi.string().required()
//     // }
//     // ,
//     // body: {
//     //     age: Joi.number().required(),
//     //     company: Joi.object({
//     //         name: Joi.string().required(),
//     //         role: Joi.string().required().valid('HR', 'Technical') //enum style validation
//     //     }).required()
//     // },
//     params: {
//         id: Joi.number().required()
//     }
// }

module.exports= {
  loginValidation,
  updateValidation,
  addValidation   
};

 