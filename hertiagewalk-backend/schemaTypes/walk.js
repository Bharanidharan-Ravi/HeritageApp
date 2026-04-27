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
      options: { hotspot: true },
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
      rows: 3,
    },

    // ─── Registration Type ───────────────────────────────────────────
    {
      name: 'registrationType',
      title: 'Registration Type',
      type: 'string',
      options: {
        list: [
          { title: 'QR Code Only',       value: 'qr_only'   },
          { title: 'Form Only',          value: 'form_only' },
          { title: 'Both QR + Form',     value: 'both'      },
        ],
        layout: 'radio', // shows as radio buttons in Sanity Studio
      },
      initialValue: 'qr_only',
      validation: Rule => Rule.required(),
    },

    // ─── QR Code (shown when qr_only or both) ───────────────────────
    {
      name: 'qrCode',
      title: 'GPay/UPI QR Code',
      type: 'image',
      description: 'Upload the QR code for payment here',
      options: { hotspot: true },
      hidden: ({ document }) =>
        document?.registrationType === 'form_only',  // hide if form only
    },

    // ─── Zoho Form URL (shown when form_only or both) ────────────────
    {
      name: 'formUrl',
      title: 'Zoho Form URL',
      type: 'url',
      description: 'Paste your Zoho registration form link here',
      hidden: ({ document }) =>
        document?.registrationType === 'qr_only',    // hide if qr only
    },
  ],
}