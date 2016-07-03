var _ = require('lodash')

var sendCredentials = require('./send-credentials')
var getLocations = require('./get-locations')

module.exports = function (credentials, cb) {
  sendCredentials(credentials, function (er, user) {
    if (er) return cb(er)

    getLocations(user.userId, function (er, locations) {
      if (er) return cb(er)
      var loc = _(locations).entries().first()
      cb(null, {
        userId: user.userId,
        locationId: loc[0],
        state: _.lowerCase(loc[1].system_state)
      })
    })
  })
}

