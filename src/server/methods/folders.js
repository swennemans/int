import { Folders } from '../../lib/collections'
import Folder from '../../lib/folders'
//import Folder from '../../lib/folders'
//import { Meteor } from 'meteor/meteor'
//import { check } from 'meteor/check'

Meteor.methods({
    'kenniscentrum.createFolder'(folderName, createdBy, allowedUsers, parentFolder) {
        //TODO: add user role check?
        check(folderName, String)
        check(createdBy, String)

        const folderData = {folderName, createdBy, allowedUsers, parentFolder}
        var folder = new Folder()
        folder.set(folderData)

        folder.save()
    },
    /* Don't need to be reactive, therefore just return data instead of subscription */
    //TODO: maybe return all files instead of folderName. Or preload next elements.
    'kenniscentrum.loadFolderContentsByName'(folderName) {
        check(folderName, String)

        console.log('called?')

        //TODO 1) request all files
        const folder = Folders.find({
            parentFolder: folderName
        }, {
            fields: {files: 1, childFolders: 1, folderName: 1, createdAt: 1, createdBy: 1}
        }).fetch()

        let files = null
        if (folder.files) {
            files = folder.files().map((file) => {
                return file
            })
        }
        console.log('folder', folder)
        return folder
    },

    'kenniscentrum.loadFolderContentsById'(folderId) {
        check(folderId, String)

        console.log('called', folderId)


        const folder = Folders.find({parentFolder: folderId}, {
            fields: {files: 1, childFolders: 1, folderName: 1, createdAt: 1, createdBy: 1}
        }).fetch()

        let files = null
        if (folder.files) {
            files = folder.files().map((file) => {
                return file
            })
        }

        return folder
    }


})