export default {
  widgets: [
    { name: 'structure-menu' },
    {
      name: 'project-info',
      options: {
        data: [
          { title: 'Frontend', value: 'https://arbellay-ch-11-ty.netlify.app', category: 'apps' }
        ]
      }
    },
    {
      name: 'document-list',
      options: { title: 'Projets récents', order: '_createdAt desc', types: ['project'] },
      layout: { width: 'medium' }
    }
    /* {
      name: 'cloudinary-media-widget',
      //layout: {width: 'medium'}
    } */
  ]
}
