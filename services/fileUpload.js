const AWS = require('aws-sdk')
const keys = require("../config/keys")

function uploadToS3(file, filename) {
  const s3bucket = new AWS.S3({
    accessKeyId: keys.IAM_USER_KEY,
    secretAccessKey: keys.IAM_USER_SECRET,
    Bucket: keys.BUCKET_NAME,
    region: 'eu-west-1'
  })

  console.log(s3bucket)

  return new Promise((resolve, reject) => {
    s3bucket.createBucket(function () {
      var params = {
        Bucket: keys.BUCKET_NAME,
        Key: filename,
        Body: file.data,
        ContentType: file.mimetype,
      }
      s3bucket.upload(params, (err, data) => {
        if (err) {
          reject(err)
        }
        else resolve(data)
      })
    })
  })

}

function getFilesByPath(path, callback) {
  let s3bucket = new AWS.S3({
    accessKeyId: keys.IAM_USER_KEY,
    secretAccessKey: keys.IAM_USER_SECRET,
    Bucket: keys.BUCKET_NAME
  })

  var params = {
    Bucket: keys.BUCKET_NAME,
    Prefix: path,
  }

  s3bucket.listObjects(params, callback)
}

module.exports = {
  uploadToS3,
  getFilesByPath
}