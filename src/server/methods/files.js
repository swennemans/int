const AWS_ACCESS_KEY = 'AKIAINYFIHRQTAVJUXIA';
const AWS_SECRET_KEY = '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'
const S3_BUCKET = 'zihdocs'
const region = 'eu-west-1'
import { Folders, Files } from '../../lib/collections'
import Folder from '../../lib/folders'
import File from '../../lib/files'

//import { check } from 'meteor/check'

Meteor.methods({
  'kenniscentrum.signS3'(fileName, fileType) {
    check(fileName, String)
    check(fileType, String)

    AWS.config.update({
      accessKeyId: AWS_ACCESS_KEY,
      secretAccessKey: AWS_SECRET_KEY,
      region: region
    })
    var s3 = new AWS.S3()
    var s3_params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read'
    }
    let result = null;
    try {
      const signedURL = s3.getSignedUrl('putObject', s3_params)
      result = {
        signedURL,
        url: 'https://' + S3_BUCKET + '.s3-' + region + '.amazonaws.com/' + fileName
      }
    } catch (e) {
      result = e;
    }

    return result;
  },

  'kenniscentrum.uploadFile'(fileName, fileType, folderId, fileUrl, userId) {
    check(folderId, String)
    check(fileName, String)
    check(userId, String)
    check(fileType, String)
    check(fileType, String)

    const fileData = {fileName, folderId, fileType, fileUrl, userId}
    const file = new File()
    file.set(fileData)
    file.save()
  },
  /* In order to keep favorites up to date, each collection
   , files and folders, are queried seperatly and combined.
   */
  'kenniscentrum.getFavorites'(userId) {
    check(userId, String)
    const user = Meteor.users.findOne({_id: userId})

    const files = Files.find({_id: {$in: user.favoriteFiles}}, {
      transform: null,
      fields: {
        _id: 1,
        fileName: 1,
        fileType: 1,
        fileUrl: 1,
        folderId: 1
      }
    }).fetch()
    const folders = Folders.find({_id: {$in: user.favoriteFolders}}, {
      transform: null,
      fields: {
        _id: 1,
        folderName: 1,
        parentFolder: 1,
        folderId: 1
      }
    }).fetch()
    const result = files.concat(folders)
    return result
  }
})