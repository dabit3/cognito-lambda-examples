const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();

exports.handler =  (event, context, callback) => {
  const params = {
    GroupName: 'STUDENTS',
    Username: event.userName,
    UserPoolId: event.userPoolId,
  };

  cognito.adminAddUserToGroup(params, (err, data) => {
    if (err) {
      callback(err)
    }

    callback(null, event);
  });
};
