export default {
  name: 'mainImage',
  type: 'image',
  title: 'Image',
  options: {
    hotspot: true,
    accept: 'image/*'
  },
  validation: Rule => Rule.required().error('A main image is required!'),
  fields: [
    {
      name: 'description',
      type: 'string',
      title: 'Descritpion',
      description: 'La description aide à optimiser le SEO',
      options: {
        isHighlighted: true
      },
      validation: Rule => Rule.error('You have to fill out the description text.').required()
    },
    /* {
      title: 'Tags mainImage',
      name: 'tags',
      type: 'array',
      of: [{ type: 'string' }],
      validation: Rule => Rule.unique(),
      options: {
        layout: 'tags',
        isHighlighted: true
      }
    } */
    {
      name: 'tags',
      title: 'Tags',
      type: 'tags',
      options: {
        isHighlighted: true // <-- make this field easily accessible
      }
    }
  ],
  preview: {
    select: {
      imageUrl: 'asset.url',
      title: 'caption'
    }
  }
}
