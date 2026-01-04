export default {
  name: 'story',
  title: 'Story / Testimonial',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Person Name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'text',
      title: 'Review Text',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required(),
    },
    {
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(5),
    },
    {
      name: 'avatar',
      title: 'User Avatar',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};