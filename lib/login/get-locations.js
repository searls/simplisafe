var request = require('../wrappers/request')

module.exports = function (userId, cb) {
  var url = 'https://simplisafe.com/mobile/' + userId + '/locations'
  request.post(url, {
    no_persist: 0,
    XDEBUG_SESSION_START: 'session_name'
  }, function (er, res, body) {
    cb(null, body.locations)
  })
}

