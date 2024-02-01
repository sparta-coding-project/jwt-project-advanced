import Joi from "joi";

export const createUsersValidation = Joi.object().keys({
    id: Joi.string().required(),
    email: Joi.string().email().required(),
    role: Joi.string(),
    password: Joi.string().min(6).max(45).required()
})