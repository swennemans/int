import { Files } from '../../lib/collections'
//import { Meteor } from 'meteor/meteor'

Meteor.publish('kenniscentrum.listFiles', (folderId) => {
  //TODO: ADD Foldername (??) ADD USER CHECK
  const selector = {}
  const options = {
    fields: {
      fileName: 1,
      fileUrl: 1,
      fileType: 1,
      folderId: 1,
      createdAt: 1
    }
  }
  return Files.find(selector, options)
})
