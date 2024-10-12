import { CollectionConfig } from 'payload';

const Banners: CollectionConfig = {
  slug: 'banners',
  admin: {
    useAsTitle: 'pageCategory',
  },
  access: {
    read: () => true, // Allow public read access
    // Restrict other operations as needed

  },
  fields: [
    {
      name: 'pageCategory',
      type: 'select',
      options: ['home', 'about', 'history', 'news'],
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Banner', value: 'banner' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
    },
  ],
  timestamps: true,
};

export default Banners;