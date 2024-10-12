import { CollectionConfig } from 'payload';

import {
  HTMLConverterFeature,
  lexicalEditor,
  lexicalHTML
} from '@payloadcms/richtext-lexical'

const NewsArticle: CollectionConfig = {
    slug: 'news-articles',
    admin: {
      components: {
      },
      useAsTitle: 'title',
      
    },
    access: {
      read: () => true, // Allow public read access
      // Restrict other operations as needed
  
    },
    
    fields: [
      {
        name: 'title',
        label: {
          en: 'Article',
          id: 'Article'
        },
        type: 'text',
        localized: true,
        required: true,
      },
      
      {
        name: 'content',
        type: 'richText', // Change to 'richText' or appropriate type that supports structured data
        editor: lexicalEditor({
          features: ({ defaultFeatures }) => [
            ...defaultFeatures,
            // The HTMLConverter Feature is the feature which manages the HTML serializers.
            // If you do not pass any arguments to it, it will use the default serializers.
            HTMLConverterFeature({}),
          ],
        }),
        localized: true,
        required: true,
        
      },
      {
        name: 'images',
        type: 'array',
        fields: [
          {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
          },
        ],
        localized: false, // Images are not localized
      },
      {
        name: 'bannerImage',
        type: 'upload',
        relationTo: 'media',
        required: true,
        localized: false,
      },
      {
        name: 'previewImage',
        type: 'upload',
        relationTo: 'media',
        required: true,
        localized: false,
      },
      {
        name: 'date',
        type: 'date',
        required: true,
        localized: false,
      },
      {
        name: 'author',
        type: 'text',
        required: true,
        localized: false,
      },
      lexicalHTML('content', { name: 'content_html' }),
    ],
    
};

export default NewsArticle;
