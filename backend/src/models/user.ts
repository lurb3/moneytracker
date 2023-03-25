import bcrypt from 'bcryptjs';
import { Document, Schema, model, Model } from "mongoose";

interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  token?: string;
  createdAt?: Date;
}

const userSchema = new Schema<UserDocument>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String },
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre<UserDocument>('save', async function(next: () => any) {
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

export const User: Model<UserDocument> = model<UserDocument>('User', userSchema);