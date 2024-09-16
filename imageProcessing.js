import fs from 'fs/promises';
import path from 'path';

export async function convertToBase64(imagePath) {
  try {
    const data = await fs.readFile(imagePath);
    return data.toString('base64');
  } catch (error) {
    console.error('Error reading image file:', error);
    throw error;
  }
}
export function getImageMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    default:
      throw new Error(`Unsupported image format: ${ext}`);
  }
};