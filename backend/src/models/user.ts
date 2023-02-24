const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String },
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre('save', async function(next) {
  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(this.password, salt);

    // Set the hashed password on the user document
    this.password = passwordHash;
    next();
  } catch (error) {
    next(error);
  }
});

export const User = mongoose.model('User', userSchema);