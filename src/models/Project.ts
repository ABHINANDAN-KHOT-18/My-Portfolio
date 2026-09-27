import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  fullDescription: { type: String },
  technologies: [{ type: String }],
  imageUrl: { type: String },
  githubUrl: { type: String },
  liveUrl: { type: String },
  featured: { type: Boolean, default: false },
  status: { type: String, enum: ['Completed', 'In Progress'], default: 'Completed' },
}, { timestamps: true });

export const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
