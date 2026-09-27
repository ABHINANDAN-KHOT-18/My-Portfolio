import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Certificate } from '@/models/Certificate';

const MOCK_CERTIFICATES = [
  {
    _id: 'mock-cert-1',
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: '2025-05-10',
    description: 'Foundational understanding of AWS Cloud concepts, security, and services.',
    imageUrl: '',
    certificateUrl: 'https://aws.amazon.com/certification/',
    tags: ['Cloud', 'AWS'],
    isVisible: true
  }
];

export async function GET() {
  try {
    const db = await dbConnect();
    if (!db) {
      return NextResponse.json({ success: true, data: MOCK_CERTIFICATES, isMock: true });
    }
    const certs = await Certificate.find({}).sort({ order: 1, createdAt: -1 });
    return NextResponse.json({ success: true, data: certs });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = await dbConnect();

    if (!db) {
       console.warn("Mock DB Save Certificate", body);
       return NextResponse.json({ success: true, data: { ...body, _id: `mock-new-${Date.now()}` }, isMock: true }, { status: 201 });
    }

    const cert = await Certificate.create(body);
    return NextResponse.json({ success: true, data: cert }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
