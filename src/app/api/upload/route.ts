import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) {
      console.warn("Cloudinary not configured. Returning fallback placeholder.");
      return NextResponse.json({ 
        success: true, 
        url: 'https://via.placeholder.com/800x600.png?text=Placeholder+Image',
        isMock: true 
      });
    }

    if (!image) {
      return NextResponse.json({ success: false, error: 'No image provided' }, { status: 400 });
    }

    // image should be a base64 string
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: 'abhinandan_portfolio',
    });

    return NextResponse.json({ success: true, url: uploadResponse.secure_url });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
