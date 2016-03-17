Meteor.publish('listUsers', () => {
  return Meteor.users.find({}, {fields: {_id: 1, profile: 1}})
})

Meteor.publish('contacten.list', (page) => {
  const positiveIntegerCheck = Match.Where(function (x) {
    check(x, Match.Integer);
    return x >= 0;
  })

  check(page, positiveIntegerCheck)

  const limit = 25
  const skip = page * 25
  const selector = {}
  const options = {
    fields: {
      _id: 1,
      profile: 1,
    },
    sort: {
      "profile.lastName": 1
    },
    limit: 25,
    skip: skip
  }
  return Meteor.users.find(selector, options)
})

Meteor.publish('profile.show', (userId) => {
  check(userId, String)
  const selector = {
    _id: userId
  }
  const options = {
    fields: {
      _id: 1,
      profile: 1,
      contact: 1
    }
  }
  const response = Meteor.users.find(selector)
  return response
})

Meteor.publish('contacten.favorites', (userId) => {
  check(userId, String)
  const user = Meteor.users.findOne({_id: userId})

  return Meteor.users.find({_id : {$in : user.contacts}} )
})