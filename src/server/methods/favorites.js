import { Favorites } from '../../lib/collections'
import Favorite from '../../lib/favorites'

Meteor.methods({
  'favorites.getFavoritesByType'(userId, type) {
    check(userId, String)

    const selector = {
      userId: userId,
      type
    }
    const options = {
      fields: {
        docName: 1,
        docId: 1,
        type: 1
      }
    }
    return Favorites.find(selector, options)
  },
  'kenniscentrum.createFavorite'(docId, docName, userId, folderId, type) {
    check(docId, String)
    check(docName, String)
    check(userId, String)
    check(folderId, String)

    const selector = {
      _id: userId
    }

    let options
    if (type === 'file') {
      options = {
        $addToSet: {favoriteFiles: docId}
      }
    } else if (type === 'folder') {
      options = {
        $addToSet: {favoriteFolders: docId}
      }
    }


    return Meteor.users.update(selector, options)
  },
  'contacts.createFavorite'(docId, userId) {
    check(docId, String)
    check(userId, String)

    const selector = {
      _id: userId
    }
    const options = {
      $addToSet: {favoriteContacts: docId}
    }

    return Meteor.users.update(selector, options)
  }
})