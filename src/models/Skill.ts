import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // e.g., 'Programming', 'Web', 'Database', 'AI / ML'
  order: { type: Number, default: 0 }
}, { timestamps: true });

export const Skill = mongoose.models.Skill || mongoose.model('Skill', skillSchema);
