const Joi = require("joi");

const validateSignUpSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  preferences: Joi.array().required(),
});

const validateLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = { validateLoginSchema, validateSignUpSchema };
