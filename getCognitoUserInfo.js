const AWS = require('aws-sdk')
const cognito = new AWS.CognitoIdentityServiceProvider({apiVersion: '2016-04-18'})
var userpoolId = process.env.USER_POOL_ID

async function getGroupsForUser(event) {
  // first gets the user attributes from the sub of the user invoking the event
  let userSub = event.requestContext.identity.cognitoAuthenticationProvider.split(':CognitoSignIn:')[1]
  let userParams = {
    UserPoolId: userpoolId,
    Filter: `sub = "${userSub}"`,
  }
  let userData = await cognito.listUsers(userParams).promise()
  const user = userData.Users[0]
  // next gets the groups for the user invoking the event
  var groupParams = {
    UserPoolId: userpoolId,
    Username: user.Username
  }
  const groupData = await cognito.adminListGroupsForUser(groupParams).promise()
  // returns the group data
  return groupData
}

async function canPerformAction(event, group) {
  return new Promise(async (resolve, reject) => {
    if (!event.requestContext.identity.cognitoAuthenticationProvider) {
      return reject('not authorized to perform this action')
    }
    const groupData = await getGroupsForUser(event)
    const groupsForUser = groupData.Groups.map(group => group.GroupName)
    if (groupsForUser.includes(group)) {
      resolve()
    } else {
      reject('user not in group, cannot perform action..')
    }  
  })
}

exports.handler = async event => {
  try {
    await canPerformAction(event, 'Admin')
    // do something
    return { success: 'performing action' }
  } catch (err) {
    return { error: err }
  }
}