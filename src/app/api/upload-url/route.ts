// app/api/upload-url/route.js
import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

// Configure AWS S3 client
const s3Client = new S3Client({
  region: 'ap-south-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Bucket name
const bucketName = 'awg-wholesale';

export async function POST(request) {
  try {
    // Parse the FormData
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Generate a unique filename
    const filename = formData.get('filename') || `${uuidv4()}-${file.name.replace(/\s+/g, '-')}`;
    const contentType = file.type;
    
    // Set up the S3 upload parameters for pre-signed URL
    const key = `products/${filename}`;
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      ContentType: contentType,
    });

    // Generate a pre-signed URL (valid for 5 minutes)
    const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 });
    
    // Construct the public URL for the file once it's uploaded
    const imageUrl = `https://${bucketName}.s3.ap-south-1.amazonaws.com/${key}`;
    
    return NextResponse.json({ 
      presignedUrl,
      imageUrl,
      key,
      contentType
    });
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    return NextResponse.json(
      { error: 'Failed to generate upload URL' },
      { status: 500 }
    );
  }
}