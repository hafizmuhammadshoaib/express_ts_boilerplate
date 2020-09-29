import Joi from '@hapi/joi';

export const SignupValidator = Joi.object({
    name: Joi.string().required().min(3).max(25),
    email: Joi.string().email(),
    password: Joi.string().required().max(15).min(8)
});


export const SigninValidator = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().required().max(15).min(8)
});