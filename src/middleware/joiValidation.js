import Joi from "joi";

export const authSchema = Joi.object({
  firstName: Joi.string().min(2).max(30).required(),
  lastName: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string()

    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
  userType: Joi.string(),
  Age: Joi.number().min(10).max(60).required(),
  City: Joi.string().uppercase().required(),
});
