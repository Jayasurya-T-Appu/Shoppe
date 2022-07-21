const Joi = require('joi')

const createUserSchema = Joi.object({
    name: Joi.string().required(),
    role: Joi.string().required(),
    email:Joi.string().email().required(),
    phone:Joi.number().required(),
    password:Joi.string().min(4).max(15).required(),
    state:Joi.string(),
    city:Joi.string(),
    house:Joi.string(),
    pincode:Joi.number()
})
const updateUserSchema = Joi.object({
    id:Joi.string(),
    name: Joi.string().required(),
    role: Joi.string().required(),
    email:Joi.string().email().required(),
    phone:Joi.number().required(),
    password:Joi.string().min(4).max(15).required(),
    state:Joi.string(),
    city:Joi.string(),
    house:Joi.string(),
    pincode:Joi.number()
})

module.exports = {
    createUserSchema,updateUserSchema,
}