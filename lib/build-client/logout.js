var request = require('../wrappers/request')

var LOGOUT_URL = 'https://simplisafe.com/mobile/logout'

module.exports = function (info, cb) {
  request.post(LOGOUT_URL, {
    no_persist: 0,
    XDEBUG_SESSION_START: 'session_name'
  }, function (er, res, body) {
    if (er) return cb(new Error('Logout failed: ' + er.message))
    if (body.return_code !== 1) return cb(new Error('Invalid logout: ' + body.return_code))

    cb(null)
  })
}
