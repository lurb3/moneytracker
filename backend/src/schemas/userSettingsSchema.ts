import Joi from 'joi'

const userSettingsSchema = Joi.object({
  totalBudget: Joi.number().max(9999999),
});

export default userSettingsSchema;