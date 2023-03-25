import { z } from 'zod';

const userSettingsSchema = z.object({
  totalBudget: z.number().max(9999999),
});

export default userSettingsSchema;