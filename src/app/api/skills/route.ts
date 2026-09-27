import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Skill } from '@/models/Skill';

const MOCK_SKILLS = [
  { _id: 's1', name: 'JavaScript', category: 'Programming' },
  { _id: 's2', name: 'Python', category: 'Programming' },
  { _id: 's3', name: 'React', category: 'Web' },
  { _id: 's4', name: 'Next.js', category: 'Web' },
  { _id: 's5', name: 'Machine Learning', category: 'AI / ML' },
];

export async function GET() {
  try {
    const db = await dbConnect();
    if (!db) return NextResponse.json({ success: true, data: MOCK_SKILLS, isMock: true });
    
    const items = await Skill.find({}).sort({ category: 1, order: 1 });
    return NextResponse.json({ success: true, data: items });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = await dbConnect();
    if (!db) return NextResponse.json({ success: true, data: { ...body, _id: `mock-${Date.now()}` }, isMock: true }, { status: 201 });
    
    const item = await Skill.create(body);
    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
