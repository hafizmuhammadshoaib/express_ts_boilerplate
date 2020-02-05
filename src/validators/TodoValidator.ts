import Joi from '@hapi/joi';

export const InsertValidator = Joi.object({
    title: Joi.string().required().max(25).min(3),
    item: Joi.string().required().max(250).min(10)
});
export const UpdateValidator = Joi.object(
    {
        id: Joi.number().required(),
        title: Joi.string().max(25).min(3),
        item: Joi.string().max(250).min(10)
    }
);
export const deleteValidator = Joi.object(
    {
        id: Joi.number().required(),
    }
)