var _ = require('lodash')
var request = require('../wrappers/request')

module.exports = function (userId, cb) {
  var url = 'https://simplisafe.com/mobile/' + userId + '/locations'
  request.post(url, {
    no_persist: 0,
    XDEBUG_SESSION_START: 'session_name'
  }, function (er, res, body) {
    if (er) return cb(new Error('Failed to retrieve locations: ' + er.message))
    if (_.size(body.locations) === 0) {
      return cb(new Error('Server returned no valid locations'))
    }
    cb(null, body.locations)
  })
}

