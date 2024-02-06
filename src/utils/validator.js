import Joi from "joi";

export const createUsersValidation = Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    role: Joi.string(),
    password: Joi.string().min(6).max(45).required()
})

export const loginValidation = Joi.object().keys({
    id: Joi.string().required(),
    password: Joi.string().min(6).max(45).required()
})