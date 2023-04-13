import Joi from "joi";

const userExpensesSchema = Joi.object({
  name: Joi.string().required(),
  total: Joi.number().max(999999).min(0),
  date: Joi.string(),
  description: Joi.string().allow(''),
  category: Joi.string(),
});

export default userExpensesSchema;