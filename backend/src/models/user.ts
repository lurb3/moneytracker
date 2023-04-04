import bcrypt from 'bcryptjs';
import mongoose from "mongoose";

interface UserPreSave {
  password: string,
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  totalBudget: { type: Number, default: 0 },
  token: { type: String },
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre<UserPreSave>('save', async function(next: () => any) {
  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(this.password, salt);

    // Set the hashed password on the user document
    this.password = passwordHash;
    next();
  } catch (error) {
    next();
  }
});

export const User = mongoose.model('User', userSchema);