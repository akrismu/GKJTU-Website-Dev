import { CollectionConfig } from 'payload'
import CustomSaveDraftButton from './components/CustomSaveDraftButton';

const Employee: CollectionConfig = {
    slug: 'Employee', // The unique identifier for this collection
    admin: {
      useAsTitle: 'name', // The field to use as the display title for each entry in the admin UI
      
      components: {
        edit:{
          SaveButton: CustomSaveDraftButton
        },
        
      },
    },
    access: {
      read: () => true, // Allow public read access
      // Restrict other operations as needed
  
    },
    
    fields: [
      {
        name: 'name', // Field for the user's name
        type: 'text',
        required: true,
        localized: false,
      },
      {
        name: 'role', // Field for selecting the user's role
        type: 'select',
        required: true,
        options: [
          { label: 'Ketua', value: 'Charimen' },
          { label: 'Karyawan', value: 'Employee' },
        ],
        localized: false,
      },
      {
        name: 'Job', // Field for the user's name
        type: 'text',
        required: true,
        admin: {
          className: 'localized-field'
        },
        localized: true,
      },
      {
        name: 'picture', // Field for uploading a picture
        type: 'upload',
        relationTo: 'media', // Assuming you have a 'media' collection for handling uploads
        required: true,
        localized: false,
      },
    ],
   
  };
  
  export default Employee;
  