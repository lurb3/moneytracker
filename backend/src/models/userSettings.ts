const mongoose = require('mongoose');

const userSettingsSchema = new mongoose.Schema({
  totalBudget: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export const UserSettings = mongoose.model('UserSettings', userSettingsSchema);