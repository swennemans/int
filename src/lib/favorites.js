import { Favorites } from './collections'
export default Astro.Class({
  name: 'Favorite',
  collection: Favorites,
  fields: {
    userId: {
      type: 'string',
      index: 1
    },
    folderId: {
      type: 'string',
      optional: true
    },
    docName: 'string',
    docId: 'string',
    type: 'string',
    behaviors: {
      timestamp: {
        hasCreatedField: true,
        createdFieldName: 'createdAt',
        hasUpdatedField: true,
        updatedFieldName: 'updatedAt'
      }
    },
    relations: {
      users: {
        type: 'one',
        class: 'User',
        local: 'userId',
        foreign: '_id'
      }
    }
  }
})