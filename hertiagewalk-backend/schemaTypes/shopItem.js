export default {
  name: 'shopItem',
  title: 'Shop Item',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'price',
      title: 'Price (₹)',
      type: 'number', // We use number for better sorting/calc
      validation: Rule => Rule.required(),
    },
    {
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    },
  ],
};