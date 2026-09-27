import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Social } from '@/models/Social';

const MOCK_SOCIALS = [
  { _id: 'soc1', platform: 'GitHub', url: 'https://github.com/abhinandan' },
  { _id: 'soc2', platform: 'LinkedIn', url: 'https://linkedin.com/in/abhinandan' },
  { _id: 'soc3', platform: 'Twitter', url: 'https://twitter.com/abhinandan' },
];

export async function GET() {
  try {
    const db = await dbConnect();
    if (!db) return NextResponse.json({ success: true, data: MOCK_SOCIALS, isMock: true });
    
    const items = await Social.find({});
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
    
    const item = await Social.create(body);
    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
