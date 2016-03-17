import { Folders } from './collections'
export default Astro.Class({
    name: 'Folder',
    collection: Folders,
    fields: {
        folderName: 'string',
        createdBy: 'string',
        allowedUsers: 'array',
        parentFolder: 'string',
        parentFolderId: 'string',
        childFolders: 'array'
    },
    behaviors: {
        timestamp: {
            hasCreatedField: true,
            createdFieldName: 'createdAt',
            hasUpdatedField: true,
            updatedFieldName: 'updatedAt'
        }
    },
    indexes: {
      folderName: {
          fields: {
              folderName: 1
          },
          options: {
              unique: true
          }
      }
    },
    relations: {
        users: {
            type: 'one',
            class: 'User',
            local: 'createdBy',
            foreign: '_id'
        },
        files: {
            type: 'many',
            class: 'File',
            local: '_id',
            foreign: 'folderId'

        }
    }
})
//export default Folder
