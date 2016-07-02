var _ = require('lodash')

var sendCredentials = require('./send-credentials')
var getLocations = require('./get-locations')

module.exports = function (credentials, cb) {
  sendCredentials(credentials, function (er, user) {
    if (er) return cb(er)

    getLocations(user.uid, function (er, locations) {
      if (er) return cb(er)
      var loc = _(locations).entries().first()
      cb(null, {
        userId: user.uid,
        locationId: loc[0],
        state: loc[1].system_state
      })
    })
  })
}

