import { Favorites } from '../../lib/collections'
Meteor.publish('kenniscentrum.favorites', (userId) => {
  const selector = {
    userId: userId
  }
  const options = {
    fields: {
      docName: 1,
      docId: 1,
      type: 1
    }
  }
  return Favorites.find(selector, options)
})