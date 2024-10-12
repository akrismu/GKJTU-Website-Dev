
import  SelectAddressField  from './components/SelectAdress';
import { CollectionConfig } from 'payload';
import CustomSaveDraftButton from './components/CustomSaveDraftButton';

import {
  HTMLConverterFeature,
  lexicalEditor,
  lexicalHTML
} from '@payloadcms/richtext-lexical'

interface NominatimResult {
  display_name: string;
  lat: string;
  lon: string;
}

const Churches: CollectionConfig = {
  slug: 'churches',
  admin: {
    useAsTitle: 'NameOfTheChurch',
    components: {
      edit:{
        SaveButton: CustomSaveDraftButton
      },
      
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'PageTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'NameOfTheChurch',
      type: 'text',
      required: true,
    },
    {
      name: 'village',
      type: 'text',
      required: true
    },
    /*{
      name: 'selectedAddress',
      type: 'text',
      admin: {
        components: {
          Field: SelectAddressField,
        },
        condition: (data) => !data.gotCoordinates,
      }
      
    },*/
    {
      name: 'addressResults',
      type: 'array',
      fields: [
        {
          name: 'display_name',
          type: 'text',
        },
        {
          name: 'lat',
          type: 'number',
        },
        {
          name: 'lon',
          type: 'number',
        },
      ],
      admin: {
        components: {
          Field: SelectAddressField,
        },
        condition: (data) => !data.gotCoordinates,
      }
    },
    {
      name: 'gotCoordinates', // required
      type: 'checkbox', // required
      defaultValue: false,
      admin: {
        hidden: true,
        readOnly: true,
      },
    },
    {
      name: 'coordinates',
      type: 'group',
      fields: [
        {
          name: 'latitude',
          type: 'number',
          required: false,
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'longitude',
          type: 'number',
          required: false,
          admin: {
            readOnly: true,
          },
        },
      ],
    },
    {
      name: 'shortDescription',
      label: {
        en: 'One Sentence Description',
        id: 'Deskripsi Satu Kalimat',
      },
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      label: {
        en: 'Description of the Church',
        id: 'Deskripsi Gereja',
      },
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HTMLConverterFeature({}),
        ],
      }),
      localized: true,
      required: true,
    },
    {
      name: 'services',
      type: 'array',
      fields: [
        {
          name: 'service',
          type: 'text',
          localized: true,
          required: true,
        },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
        },
        {
          name: 'address',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'bannerUrl',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'previewImage',
      type: 'upload',
      relationTo: 'media',
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
          required: true,
        },
      ],
    },
    lexicalHTML('description', { name: 'description_html' }),
  ],
  hooks: {
    beforeChange: [
      async ({ operation, data, req }) => {
        console.log("BeforeChange hook triggered");
        console.log("Initial data:", JSON.stringify(data, null, 2));
        
        if (operation === 'create' || operation === 'update') {
           const villageName = data.village;
           console.log("Village Name: ", villageName)

          // Query the Nominatim API with the village name

          if(data.addressResults == 0)
            {
              console.log("API Request")
              const apiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(villageName)}&format=json`;
              const response = await fetch(apiUrl);
              const addressResults = await response.json();
              console.log("API:", addressResults)

                // If multiple addresses are found, call the getUserSelectedAddress function
                if (addressResults.length > 1) {
                  data.addressResults = addressResults.map((result: NominatimResult) => ({
                    display_name: result.display_name,
                    lat: result.lat,
                    lon: result.lon,
                  }));
                  //console.log("AFter API: ", data.addressResults)
                } else if (addressResults.length === 1) {
                  data.coordinates.latitude = addressResults[0].lat;
                  data.coordinates.longitude = addressResults[0].lon;
                  data.gotCoordinates = true;
                }

            }else{
              console.log("Full:", data.addressResults)
            }     
        }
        console.log("Final data:", JSON.stringify(data, null, 2));
        return data;
  }]
  },
  
};

export default Churches;
