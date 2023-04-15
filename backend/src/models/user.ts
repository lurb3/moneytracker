import bcrypt from 'bcryptjs';
import mongoose from "mongoose";

interface UserPreSave {
  password: string,
}

const defaultCategories = ['Technology', 'Health & well being', 'Home bills', 'Food', 'Debt', 'Misc'];

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, immutable: true },
  totalBudget: { type: Number, default: 0 },
  categories: { type: Array, default: defaultCategories },
  token: { type: String },
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre<UserPreSave>('save', async function(next: () => any) {
  try {
    // Generate a salt and hash the password
    const salt = 10;
    const passwordHash = await bcrypt.hash(this.password, salt);

    // Set the hashed password on the user document
    this.password = passwordHash;
    next();
  } catch (error) {
    next();
  }
});

export const User = mongoose.model('User', userSchema);