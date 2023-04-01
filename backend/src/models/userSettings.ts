const mongoose = require('mongoose');

const userSettingsSchema = new mongoose.Schema({
  totalBudget: { type: Number, default: 0 },
  currency: { type: String, default: 'EUR' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export const UserSettings = mongoose.model('UserSettings', userSettingsSchema);