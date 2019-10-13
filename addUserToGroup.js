const aws = require('aws-sdk');

exports.handler = (event, context, callback) => {
  const cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' });

  const email = event.request.userAttributes.email.split('.')
  const domain = email[email.length - 1]

  if (domain === 'edu') {
    const params = {
      GroupName: 'STUDENTS',
      UserPoolId: event.userPoolId,
      Username: event.userName,
    }
  
    cognitoidentityserviceprovider.adminAddUserToGroup(params, (err) => {
      if (err) { callback(err) }
      callback(null, event);
    })
  } else {
    callback(null, event)
  }
}
