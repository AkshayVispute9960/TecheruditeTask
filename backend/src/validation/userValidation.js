import Joi from 'joi';

const registerSchema = Joi.object({
  firstName: Joi.string().min(3).max(30).required()
    .messages({
      "string.base": "firstName must be a string.",
      "string.empty": "firstName is required.",
      "string.min": "firstName must be at least 3 characters long.",
      "string.max": "firstName must not exceed 30 characters.",
    }),

    lastName: Joi.string().min(3).max(30).required()
    .messages({
      "string.base": "lastName must be a string.",
      "string.empty": "lastName is required.",
      "string.min": "lastName must be at least 3 characters long.",
      "string.max": "lastName must not exceed 30 characters.",
    }),

    email: Joi.string().email().required()
    .messages({
      "string.base": "Email must be a string.",
      "string.email": "Invalid email format.",
      "string.empty": "Email is required.",
    }),

    password: Joi.string().min(6).required()
    .messages({
      "string.base": "Password must be a string.",
      "string.min": "Password must be at least 6 characters long.",
      "string.empty": "Password is required.",
    }),

    role: Joi.string().valid('admin', 'customer').required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).required()
  .messages({
    "string.base": "Password must be a string.",
    "string.min": "Password must be at least 6 characters long.",
    "string.empty": "Password is required.",
  }),

  email: Joi.string().email().required()
  .messages({
    "string.base": "Email must be a string.",
    "string.email": "Invalid email format.",
    "string.empty": "Email is required.",
  }),

  role: Joi.string().valid('admin', 'customer').required(),
})


export {
    registerSchema,
    loginSchema
}
