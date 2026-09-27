import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Project } from '@/models/Project';

const MOCK_PROJECTS = [
  {
    _id: 'mock-1',
    title: 'KRISHIVAN',
    shortDescription: 'Agriculture marketplace connecting farmers and buyers directly.',
    technologies: ['Next.js', 'React', 'Node.js', 'MongoDB', 'Razorpay'],
    status: 'Completed',
    featured: true
  },
  {
    _id: 'mock-2',
    title: 'NEON SNAKE 4K',
    shortDescription: 'A futuristic neon snake game with increasing speed and obstacles.',
    technologies: ['React', 'TypeScript', 'Vite', 'Canvas'],
    status: 'Completed',
    featured: true
  }
];

export async function GET() {
  try {
    const db = await dbConnect();
    
    if (!db) {
      // Graceful fallback if MongoDB is not configured
      return NextResponse.json({ success: true, data: MOCK_PROJECTS, isMock: true });
    }

    const projects = await Project.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: projects });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = await dbConnect();

    if (!db) {
       console.warn("Mock DB Save", body);
       return NextResponse.json({ success: true, data: { ...body, _id: 'mock-new' }, isMock: true }, { status: 201 });
    }

    const project = await Project.create(body);
    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
