const { validateRequest } = require('../middleware/validateRequest');
const Joi = require('joi');

exports.createSchema = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        name: Joi.string().required(),
        age: Joi.number().required(),
        gender: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        hobbies: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

exports.loginSchema = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });
    validateRequest(req, next, schema);
}

