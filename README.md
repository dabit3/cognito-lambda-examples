### Examples of Lambda triggers and other functions to help you interact with Cognito from Lambda

1. `addUserToGroup.js`

Adds a user to a Cognito user group

2. `confirmFromDomain.js`

Automatically confirms a user based on their domain email address.

3. `getCognitoUserInfo.js`

Gets the Cognito user attributes based on the sub and then gets the Cognito groups based on the username. It then checks to see if the user is in a required group, and if so, will either authorize or deny the request.