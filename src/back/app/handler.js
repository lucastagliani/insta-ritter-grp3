const AWS = require('aws-sdk');

const s3 = new AWS.S3();
const moment = require('moment');
const fileType = require('file-type');
// const sha1 = require('sha1');

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
          photo: '/photos/1',
        },
        {
          id: 2,
          uri: 'https://s2.images.com/1',
          photo: '/photos/2',
        },
      ],
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

// RUN LOCAL: serverless invoke local --function photoById --path src/back/data/mock_photo.json
module.exports.photoById = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify(
      {
        id: event.pathParameters.photo_id,
        uri: `https://s3.imagens.com/${event.pathParameters.photo_id}`,
        photo: `/photos/${event.pathParameters.photo_id}`,
      },
    ),
  };

  callback(null, response);
};

const getFile = (fileMime, buffer) => {
  const fileExt = fileMime.ext;
  // let hash = sha1(new Buffer(new Date().toString()));
  const now = moment().format('YYYY-MM-DD HH:mm:ss');

  const filePath = `${now.replace(' ', '').replace(/:/g, '').replace(/-/g, '')}/`;
  const fileName = `${Date.now()}.${fileExt}`;
  const fileFullName = filePath + fileName;
  const fileFullPath = `https://s3.amazonaws.com/instaritter/${fileFullName}`;

  const params = {
    Bucket: 'instaritter',
    Key: fileFullName, // this is simply the filename and the extensions e.g fileFullname + fileExt
    Body: buffer,
  };

  const uploadFile = {
    size: buffer.toString('ascii').length,
    type: fileMime.mime,
    name: fileName,
    full_path: fileFullPath,
  };

  return {
    params,
    uploadFile,
  };
};

// RUN LOCAL: serverless invoke local --function photo
module.exports.photo = (event, context, callback) => {
  console.log('1.79');
  const request = JSON.parse(event.body);
  console.log('request.base64String:', request.base64String);

  const { base64String } = request;
  const buffer = Buffer.from(base64String, 'base64');
  const fileMime = fileType(buffer);
  if (fileMime == null) {
    return context.fail('The string supplied is not a file type.');
  }

  const file = getFile(fileMime, buffer);
  const { params } = file.params;

  s3.putObject(params, (err) => {
    if (err) {
      return console.log(err);
    }

    return console.log('File URL', file.uploadFile.full_path);
  });

  const response = {
    statusCode: 201,
  };

  callback(null, response);
};
