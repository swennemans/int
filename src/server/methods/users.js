//import User from '../../lib/users'
//import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'

Meteor.methods({
  'users.listUsers'() {
    console.log('called listUsers')
    const users = Meteor.users.find({}, {fields: {profile: 1}}).fetch()
    const searchList = users.map((user) => {
      return {
        value: user._id,
        label: user.profile.firstName + ' ' + user.profile.lastName
      }
    })
    return searchList
  },
  'contacten.list_paginated'(page, order) {
    const positiveIntegerCheck = Match.Where(function (x) {
      check(x, Match.Integer);
      return x >= 0;
    })
    check(page, positiveIntegerCheck)
    check(order, String)

    let sort
    if (order === 'Alfabetisch') {
      sort = {
        "profile.lastName": 1
      }
    } else if (order === 'Discipline') {
      sort = {
        discipline: 1
      }
    } else if (order === 'EMC') {
      sort = {
       emc: 1
      }
    }
    const limit = 25
    const skip = page * 25
    const selector = {}
    const options = {
      transform: null,
      fields: {
        profile: 1,
        emc: 1,
        discipline: 1
      },
      sort,
      limit: limit,
      skip: skip
    }
    return Meteor.users.find(selector, options).fetch()
  },
  'contacten.getFavorites'(userId) {
    check(userId, String)
    const user = Meteor.users.findOne({_id: userId})


    const selector = {_id : {$in : user.favoriteContacts}}
    const options = {
      transform: null,
      fields: {
        _id: 1,
        profile: 1,
        contact: 1
      }
    }
    const results = Meteor.users.find(selector, options).fetch()
    return results
  }
})
