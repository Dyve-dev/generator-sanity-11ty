export default {
  name: 'project',
  type: 'document',
  title: 'Project',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Some frontends will require a slug to be set to be able to show the person',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'mainImage',
      type: 'mainImage',
      title: 'Main image'
    },
    {
      title: 'Images',
      name: 'images',
      type: 'array',
      of: [
        {
          title: 'Image',
          type: 'image',
          fields: [
            {
              name: 'description',
              type: 'string',
              title: 'Description',
              description: 'La description aide à optimiser le SEO',
              validation: Rule =>
                Rule.error('You have to fill out the description text.').required(),
              options: {
                isHighlighted: true // <-- make this field easily accessible
              }
            },
            /* {
              title: 'Tags',
              name: 'tags',
              type: 'array',
              of: [{ type: 'string' }],
              validation: Rule => Rule.unique().error('Les Tags doivent être uniques!'),
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
          ]
        }
      ],
      options: {
        accept: 'image/*'
      },
      previews: {
        select: {
          title: 'description'
        }
      }
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      media: 'mainImage'
    }
  }
}
