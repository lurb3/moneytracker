const mongoose = require('mongoose');

const userExpenses = new mongoose.Schema({
  name: { type: String, required: true },
  total: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String, },
  category: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export const UserExpenses = mongoose.model('UserExpenses', userExpenses);