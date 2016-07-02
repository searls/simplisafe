var sendCredentials = require('./send-credentials')
var getLocations = require('./get-locations')

module.exports = function (credentials, cb) {
  sendCredentials(credentials, function (er, user) {
    if (er) return cb(er)

    getLocations(user.uid, function (er, locations) {
      if (er) return cb(er)

      cb(null, {
        userId: user.uid,
        locationId: Object.keys(locations)[0]
      })
    })
  })
}

