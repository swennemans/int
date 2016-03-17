import { Files } from './collections'
export default Astro.Class({
    name: 'File',
    collection: Files,
    fields: {
        fileName: 'string',
        tags: 'string',
        fileUrl: 'string',
        fileType: 'string',
        userId: 'string',
        folderId: {
            type: 'string',
            index: 1
        }
    },
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
});

