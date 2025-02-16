const Joi = require("joi");
const joi = require(`joi`);

exports.userRegisterValidation = Joi.object({
  username: Joi.string().min(3).required(),
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone_number: Joi.number().required(),
  password: Joi.string().min(6).required(),
});
