export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  __experimental_actions: ['update', /* 'create', 'delete', */ 'publish'],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Décrivez votre site pour les moteurs de recherche.'
    },
    {
      name: 'keywords',
      type: 'array',
      title: 'Keywords',
      description: 'Ajouter des mots clés qui décrivent votre site.',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'hero',
      type: 'hero',
      title: 'Hero'
    },
    {
      name: 'author',
      type: 'reference',
      description: 'Publier un Autheur et indiquez sa référence ici.',
      title: 'Author',
      to: [{ type: 'author' }]
    }
  ]
}
