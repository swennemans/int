//import { Users } from './collections'
export const UserProfile = Astro.Class({
  name: 'UserProfile',
  fields: {
    /* Any fields you want to be published to the client */
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    'functie': {
      type: 'string'
    },
    'image': {
      type: 'string'
    }
  }
})

export const UserContact = Astro.Class({
  name: 'UserContact',
  fields: {
    phone: {
      type: 'string'
    },
    mobile: {
      type: 'string'
    },
    fax: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    website: {
      type: 'string'
    }
  }
})


const User = Astro.Class({
  name: 'User',
  collection: Meteor.users,
  transform: false,
  fields: {
    profile: {
      type: 'object',
      nested: 'UserProfile',
      default: function () {
        return {};
      }
    },
    contact: {
      type: 'object',
      nested: 'UserContact',
      default: function () {
        return {}
      }
    },
    nevenfuncties: {
      type: 'array',
      default: function () {
        return []
      }
    },
    specialisaties: {
      type: 'array',
      default: function () {
        return []
      }
    },
    adressen: {
      type: 'array',
      default: function () {
        return []
      }
    },
    discipline: {
      type: 'string'
    },
    emc: {
      type: 'string'
    },
    bio: {
      type: 'string'
    },
    favoriteContacts: {
      type: 'array',
      default: function () {
        return []
      }
    },
    favoriteFiles: {
      type: 'array',
      default: function () {
        return []
      }
    },
    favoriteFolders: {
      type: 'array',
      default: function () {
        return []
      }
    },
    roles: {
      type: 'array',
      default: function () {
        return []
      }
    }
  },
  behaviors: {
    timestamp: {
      hasCreatedField: true,
      createdFieldName: 'createdAt',
      hasUpdatedField: true,
      updatedFieldName: 'updatedAt'
    }
  }
})

if (Meteor.isServer) {
  User.extend({
    fields: {
      services: 'object'
    }
  });
}

export default User;