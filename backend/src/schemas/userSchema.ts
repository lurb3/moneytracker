import { z } from 'zod';

const userSchema = z.object({
  username: z.string().max(255),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string()
});

export default userSchema;