import { NextResponse } from 'next/server';
import formidable from 'formidable';
import fs from 'fs/promises';
import { GoogleGenerativeAI } from '@google/generative-ai';

const categories = [
  'Electronics', 'Clothing', 'Food', 'Beverages', 'Furniture', 'Kitchen Appliances',
  'Home Decor', 'Books', 'Toys', 'Sports Equipment', 'Tools', 'Gardening',
  'Automotive', 'Health and Beauty', 'Cleaning Supplies', 'Office Supplies',
  'Pet Supplies', 'Jewelry', 'Art Supplies', 'Music Instruments', 'Outdoor Equipment',
  'Luggage', 'Crafts', 'Baby Items', 'Medications', 'Party Supplies',
  'Seasonal Decorations', 'Stationery', 'Collectibles', 'Other'
];

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
      `Identify the main item in this image and categorize it into one of the following categories: ${categories.join(', ')}. 
      Respond in the following format:
      Item: [item name]
      Category: [category]
      If the item doesn't fit into any of the listed categories, use 'Other'.`,
      ...imageParts,
    ]);

    const response = result.response.text().trim();
    const [itemLine, categoryLine] = response.split('\n');
    const itemName = itemLine.split(':')[1].trim();
    const category = categoryLine.split(':')[1].trim();

    // Return the identified item name and category
    return NextResponse.json({ itemName, category });
  } catch (error) {
    console.error('Error processing image:', error);
    return NextResponse.json({ error: 'Error processing image' }, { status: 500 });
  }
}