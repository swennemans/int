//import { Users } from '../lib/collections'
SearchSource.defineSource('users', function (searchText, options) {

  var options = {
    transform: null,
    sort: {
      "profile.lastName": 1
    },
    limit: 20
  }
  if (searchText) {
    var regExp = buildRegExp(searchText);
    var selector = {
      $or: [
        {"profile.firstName": regExp},
        {"profile.lastName": regExp}
      ]
    }

    var results = Meteor.users.find(selector, options).fetch()
    return results
  } else {
    return Meteor.users.find({}, options).fetch()
  }
})

function buildRegExp(searchText) {
  // this is a dumb implementation
  var parts = searchText.trim().split(/[ \-\:]+/);
  return new RegExp("(" + parts.join('|') + ")", "ig");
}