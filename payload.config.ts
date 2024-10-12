import path from 'path'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

//import { betterLocalizedFields } from '@payload-enchants/better-localized-fields';

import NewsArticle from './src/collections/NewsArticle';
import Employee from './src/collections/Employye';
import { Media } from './src/collections/Media'
import {Users} from './src/collections/Users';
import Churches from './src/collections/Churches';
import Banners from './src/collections/Banner';

import {vercelBlobStorage} from '@payloadcms/storage-vercel-blob';

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  cors: [
    'http://localhost:3000',
    'https://payload-3-0-demo-ten.vercel.app',
    'https://payload-3-0-demo-mocha.vercel.app', // Add this if it's your frontend URL
    
  ].filter(Boolean),
  csrf: [
    'http://localhost:3000',
    'https://payload-3-0-demo-ten.vercel.app',
    'https://payload-3-0-demo-mocha.vercel.app', // Add this if it's your frontend URL
    
  ].filter(Boolean),
  editor: lexicalEditor(),
  collections: [
    NewsArticle,
    Users,
    Media,
    Employee,
    Churches,
    Banners,
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || '',
  }),

  admin: {
    user: Users.slug,
  },

  plugins: [
    vercelBlobStorage({
      enabled: true, // Optional, defaults to true
      // Specify which collections should use Vercel Blob
      collections: {
        [Media.slug]: true,
      },
      // Token provided by Vercel once Blob storage is added to your Vercel project, the stuff at the end is just temp
      token: process.env.BLOB_READ_WRITE_TOKEN as string,
    }),
    //betterLocalizedFields(),
  ],

  localization: {
    locales: [
      {
        label: 'English',
        code: 'en',
      },
      {
        label: 'Indonesian',
        code: 'id',
      },
    ],
      
    defaultLocale: 'en',        // Set default locale
    fallback: true               // Enable fallback to default locale
  },

  // Sharp is now an optional dependency -
  // if you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.

  // This is temporary - we may make an adapter pattern
  // for this before reaching 3.0 stable
  sharp,
})
