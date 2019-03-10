const { OAuth2Client } = require('google-auth-library');
const clientID = process.env.GOOGLEID;
const client = new OAuth2Client(clientID)

module.exports = {
  googleAuth: function(token) {
    return client.verifyIdToken({
      idToken: token,
      audience: clientID,
    })
  }
}