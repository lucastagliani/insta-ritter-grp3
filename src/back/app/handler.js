'use strict';

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
        uri : 'https://s3.imagens.com/'+event['pathParameters']['photo_id'],
        photo : '/photos/'+event['pathParameters']['photo_id'],
      }
  )};

  callback(null, response);
};

module.exports.photo = (event, context, callback) => {
  const response = {
    statusCode: 200
  };

  callback(null, response);
};
