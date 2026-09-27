import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  issuer: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
  certificateUrl: { type: String },
  tags: [{ type: String }],
  order: { type: Number, default: 0 },
  isVisible: { type: Boolean, default: true },
}, { timestamps: true });

export const Certificate = mongoose.models.Certificate || mongoose.model('Certificate', certificateSchema);
