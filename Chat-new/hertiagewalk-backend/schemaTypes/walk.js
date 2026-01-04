// archaeo-backend/schemaTypes/walk.js

export default {
  name: 'walk',
  title: 'Heritage Walks',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Walk Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug (Unique ID)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    },
    {
      name: 'mainImage',
      title: 'Main Poster Image',
      type: 'image',
      options: { hotspot: true }, // Allows cropping
    },
    {
      name: 'date',
      title: 'Date & Time',
      type: 'datetime',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Price (INR)',
      type: 'number',
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3
    },
    {
      name: 'qrCode',
      title: 'GPay/UPI QR Code',
      type: 'image',
      description: 'Upload the QR code for payment here',
      options: { hotspot: true }
    }
  ],
}