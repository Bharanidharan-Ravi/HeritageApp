export default {
  name: 'contact',
  title: 'Company Settings', // This will appear in your dashboard
  type: 'document',
  fields: [
    {
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
      description: 'e.g., +91 9876543210'
    },
    {
      name: 'upiId',
      title: 'UPI ID (Optional)',
      type: 'string',
      description: 'e.g., archaeo@oksbi'
    },
    {
        name: 'email',
        title: 'Support Email',
        type: 'string',
    }
  ]
}