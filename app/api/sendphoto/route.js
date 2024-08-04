import { NextResponse } from 'next/server';
import formidable from 'formidable';
import fs from 'fs/promises';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image');

    if (!file) {
      return NextResponse.json({ error: 'No image file uploaded' }, { status: 400 });
    }

    // Read the image file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Initialize the Gemini API client
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro-latest' });

    // Prepare the image data for Gemini
    const imageParts = [
      {
        inlineData: {
          data: buffer.toString('base64'),
          mimeType: file.type,
        },
      },
    ];

    // Send the image to Gemini with a custom prompt
    const result = await model.generateContent([
      'Identify the main item in this image. Respond with only the name of the item, nothing else.',
      ...imageParts,
    ]);

    const itemName = result.response.text().trim();

    // Return the identified item name
    return NextResponse.json({ itemName });
  } catch (error) {
    console.error('Error processing image:', error);
    return NextResponse.json({ error: 'Error processing image' }, { status: 500 });
  }
}