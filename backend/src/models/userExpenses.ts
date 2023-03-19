const mongoose = require('mongoose');

const userExpenses = new mongoose.Schema({
  total: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  category: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export const UserExpenses = mongoose.model('UserExpenses', userExpenses);