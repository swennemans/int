import { Folders } from '../../lib/collections'
import Folder from '../../lib/folders'

import User from '../../lib/users'

faker.locale = 'nl'


if (!Folders.findOne({folderName: 'home'})) {
  const folderData = {folderName: 'home', createdBy: 'admin', parentFolder: 'none'}
  var folder = new Folder()
  folder.set(folderData)

  folder.save()
}

const emc = [
  'Molenzoom',
  'Dorp',
  'Hofspoor',
  'Schalkwijk',
  'Leebrug']

const disc = [
  'Fysiotherapeut',
  'Psycholoog',
  'Diëtist',
  'Apotheker',
  'Wijkverpleging',
  'Huisarts',
  'Facilitaire organisatie'
]


if (Meteor.users.find().count() < 5) {
  for (var i = 0; i < 200; i++) {
    const profile = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      image: faker.image.avatar(),
      functie: 'Huisarts'
    }

    const email = faker.internet.email()

    const contact = {
      phone: faker.phone.phoneNumber(),
      mobile: faker.phone.phoneNumber(),
      fax: faker.phone.phoneNumber(),
      email,
      website: faker.internet.domainName()
    }

    const adressen = [
      faker.address.streetAddress(),
      faker.address.streetAddress()
    ]

    const nevenfuncties = [
      'Functie 1',
      'Functie 2'
    ]

    const specialisaties = [
      'Specialisatie 1',
      'Specialisatie 2'
    ]


    const data = {
      profile,
      contact,
      nevenfuncties,
      specialisaties,
      adressen,
      emc: emc[Math.floor(Math.random()*emc.length)],
      discipline: disc[Math.floor(Math.random()*disc.length)],
      bio: faker.lorem.paragraph(1)
    }

    const user = new User()
    user.set(data)
    user.save()

    //Accounts.createUser(user)
  }
}
