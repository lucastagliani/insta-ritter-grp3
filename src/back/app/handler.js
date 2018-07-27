'use strict';

const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const moment = require('moment');
const fileType = require('file-type');

// RUN LOCAL: serverless invoke local --function photos
module.exports.photos = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      path: '/photos',
      photos: [
        {
          id: 1,
          uri: 'https://s2.images.com/1',
          photo: '/photos/1'
        },
        {
          id: 2,
          uri: 'https://s2.images.com/1',
          photo: '/photos/2'
        }
      ]
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

// RUN LOCAL: serverless invoke local --function photoById --path src/back/data/mock_photoById.json
module.exports.photoById = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify(
      {
        id: event['pathParameters']['photo_id'],
        uri: 'https://s3.imagens.com/' + event['pathParameters']['photo_id'],
        photo: '/photos/' + event['pathParameters']['photo_id'],
      }
    )
  };

  callback(null, response);
};

// RUN LOCAL: serverless invoke local --function photo
module.exports.photo = (event, context, callback) => {
  let request = event.body;
  let base64String = request.base64String;
  console.log('base64String', base64String);
  let buffer = new Buffer(base64String, 'base64');
  let fileMime = fileType(buffer)
  if (fileMime == null) {
    return context.fail('The string supplied is not a file type.');
  }

  let file = getFile(fileMime, buffer);
  let params = file.params;

  s3.putObject(params, function (err, data) {
    if (err) {
      return console.log(err);
    }

    return console.log('File URL', file.full_path);
  });


  // const response = {
  //   statusCode: 200
  // };

  // callback(null, response);
};

let getFile = function (fileMime, buffer) {
  let fileExt = fileMime.ext;
  let hash = sha1(new Buffer(new Date().toString()));
  let now = moment().format('YYYY-MM-DD HH:mm:ss');

  let filePath = hash + '/';
  let fileName = unixTime(now) + '.' + fileExt;
  let fileFullName = filePath + fileName;
  let fileFullPath = 'https://s3.amazonaws.com/instaritter/' + fileFullName;

  let params = {
    Bucket: 'instaritter',
    Key: fileFullname + fileExt, //this is simply the filename and the extensions e.g fileFullname + fileExt
    Body: buffer
  }

  let uploadFile = {
    size: buffer.toString('ascii').length,
    type: fileMime.mime,
    name: fileName,
    full_path: fileFullPath
  }

  return {
    'params': params,
    'uploadFile': uploadFile
  }
}
