import Joi from "joi";

export const createUsersValidation = Joi.object().keys({
  username: Joi.string().required().messages({
    "any.required": "username을 입력해주세요."
  }),
  email: Joi.string().email().required().messages({
    "string.email": "이메일을 입력해주세요.",
    "any.required": "이메일을 입력해주세요."
  }),
  role: Joi.string(),
  password: Joi.string().min(6).max(45).required().messages({
    "number.min": "비밀번호는 6자리 이상 입력해야합니다.",
    "number.max": "비밀번호는 45자리 이하여야 합니다."
  }),
});

export const loginValidation = Joi.object().keys({
  email: Joi.string().email().required().messages({
    "string.email": "이메일을 입력해주세요."
  }),
  password: Joi.string().min(6).max(45).required().messages({
    "number.min": "비밀번호는 6자리 이상 입력해야합니다.",
    "number.max": "비밀번호는 45자리 이하여야 합니다."
  }),
});

export const resumeValidation = Joi.object().keys({
  title: Joi.string().required().messages({
    "any.required": "제목을 입력해주세요"
  }),
  content: Joi.string().required().messages({
    "any.required": "내용을 입력해주세요"
  }),
  status: Joi.string().valid("APPLY", "DROP", "PASS", "INTERVIEW1", "INTERVIEW2", "FINAL_PASS").messages({
    "any.only": "APPLY, DROP, PASS, INTERVIEW1, INTERVIEW2, FINAL_PASS 중 하나를 작성해주세요"
  }),
});

export const resumeListSearchValidation = Joi.object().keys({
  orderKey: Joi.string().valid("status", "resumeId").required().messages({
    "any.only": "orderKey 값이 잘못되었습니다. status와 resumeId 중 하나를 작성해주세요."
  }),
  orderValue: Joi.string().valid("asc", "desc").required()
})