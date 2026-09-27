import mongoose from 'mongoose';

const journeySchema = new mongoose.Schema({
  year: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  category: { type: String },
  location: { type: String },
  highlight: { type: Boolean, default: false },
}, { timestamps: true });

export const Journey = mongoose.models.Journey || mongoose.model('Journey', journeySchema);
