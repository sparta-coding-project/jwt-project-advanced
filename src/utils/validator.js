import Joi from "joi";

export const createUsersValidation = Joi.object().keys({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  role: Joi.string(),
  password: Joi.string().min(6).max(45).required(),
});

export const loginValidation = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(45).required(),
});

export const resumeValidation = Joi.object().keys({
  title: Joi.string().required(),
  content: Joi.string().required(),
  status: Joi.string().valid("APPLY", "DROP", "PASS", "INTERVIEW1", "INTERVIEW2", "FINAL_PASS").required(),
});
