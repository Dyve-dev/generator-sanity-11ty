export default {
  name: 'hero',
  type: 'object',
  title: 'Hero',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'subtitle',
      type: 'string',
      title: 'Subtitle'
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image'
    }
  ],
  preview: {
    select: {
      imageUrl: 'asset.url',
      title: 'title'
    }
  }
}
