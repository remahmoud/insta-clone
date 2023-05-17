import Joi from "joi";

export const register = Joi.object({
    fname: Joi.string().required().min(3).max(30).label("First Name"),
    lname: Joi.string().required().min(3).max(30).label("Last Name"),
    username: Joi.string().required().min(3).max(30).label("Username"),
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).max(30).label("Password"),
});
export const login = Joi.object({
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).max(30).label("Password"),
});

export const post = Joi.object({
    caption: Joi.string().optional().max(250).label("Caption"),
});
