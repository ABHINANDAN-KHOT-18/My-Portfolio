import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Setting } from '@/models/Setting';

const MOCK_SETTINGS = [
  { _id: 'set1', key: 'name', value: 'Abhinandan Khot' },
  { _id: 'set2', key: 'role', value: 'BCA Student | Aspiring Software Developer' },
  { _id: 'set3', key: 'email', value: 'contact@example.com' },
];

export async function GET() {
  try {
    const db = await dbConnect();
    if (!db) return NextResponse.json({ success: true, data: MOCK_SETTINGS, isMock: true });
    
    const items = await Setting.find({});
    return NextResponse.json({ success: true, data: items });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
