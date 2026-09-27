import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Journey } from '@/models/Journey';

const MOCK_JOURNEY = [
  {
    _id: 'mock-journey-1',
    year: '2024',
    title: 'Started Programming',
    description: 'Started exploring programming and web development, focusing on React and modern JS.',
    category: 'Education',
    highlight: true
  },
  {
    _id: 'mock-journey-2',
    year: '2025',
    title: 'AI / Machine Learning Focus',
    description: 'Started building AI and ML projects, including Car Resale Price Prediction models.',
    category: 'Projects',
    highlight: true
  }
];

export async function GET() {
  try {
    const db = await dbConnect();
    if (!db) {
      return NextResponse.json({ success: true, data: MOCK_JOURNEY, isMock: true });
    }
    const entries = await Journey.find({}).sort({ year: 1, createdAt: -1 });
    return NextResponse.json({ success: true, data: entries });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = await dbConnect();

    if (!db) {
       console.warn("Mock DB Save Journey", body);
       return NextResponse.json({ success: true, data: { ...body, _id: `mock-new-${Date.now()}` }, isMock: true }, { status: 201 });
    }

    const entry = await Journey.create(body);
    return NextResponse.json({ success: true, data: entry }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
