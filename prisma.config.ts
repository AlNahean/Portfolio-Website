// prisma.config.ts
import { defineConfig } from '@prisma/config';
import dotenv from 'dotenv';

// 1. Try to load .env
dotenv.config();
// 2. Also try to load .env.local (common in Next.js)
dotenv.config({ path: '.env.local' });

// Debug: Print to terminal to check if it's found
const url = process.env.DATABASE_URL;
console.log('------------------------------------------------');
console.log('DEBUG: Loaded DATABASE_URL:', url ? 'YES (Found)' : 'NO (Undefined)');
if (url) console.log('DEBUG: URL starts with:', url.substring(0, 15) + '...');
console.log('------------------------------------------------');

if (!url) {
  throw new Error('DATABASE_URL is missing from .env or .env.local');
}

export default defineConfig({
  datasources: {
    db: {
      url: url,
    },
  },
});