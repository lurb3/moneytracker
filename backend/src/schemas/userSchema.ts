import Joi from 'joi';

const userSchema = Joi.object({
  username: Joi.string().max(255),
  email: Joi.string().email(),
  password: Joi.string(),
  categories: Joi.array(),
  totalBudget: Joi.number(),
});

export default userSchema;