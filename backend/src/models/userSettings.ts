const mongoose = require('mongoose');

const userSettingsSchema = new mongoose.Schema({
  currency: { type: String, default: 'EUR' },
  updateTotalBudget: { type: Boolean, default: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export const UserSettings = mongoose.model('UserSettings', userSettingsSchema);