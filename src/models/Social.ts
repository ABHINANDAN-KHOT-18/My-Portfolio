import mongoose from 'mongoose';

const socialSchema = new mongoose.Schema({
  platform: { type: String, required: true },
  url: { type: String, required: true },
  icon: { type: String }
}, { timestamps: true });

export const Social = mongoose.models.Social || mongoose.model('Social', socialSchema);
