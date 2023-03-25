import { z } from 'zod';

const userExpensesSchema = z.object({
  name: z.string(),
  total: z.string().max(999999).min(0),
  date: z.string(),
  description: z.string(),
  category: z.string(),
});

export default userExpensesSchema;