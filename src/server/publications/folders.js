import { Folders } from '../../lib/collections'
//import { Meteor } from 'meteor/meteor'

Meteor.publish('kenniscentrum.listFolders', (folderId) => {
    //TODO: ADD Foldername (??) ADD USER CHECK
  const selector = {}
  const options = {
    fields: {
      files: 1,
      childFolders: 1,
      folderName: 1,
      parentFolder: 1,
      createdAt: 1,
      createdBy: 1
    }
  }
    return Folders.find(selector, options)
})
