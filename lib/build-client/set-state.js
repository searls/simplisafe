var request = require('../wrappers/request')

var RESPONSES = {
  2: 'off',
  4: 'home',
  5: 'away'
}

module.exports = function (newState, info, cb) {
  var url = 'https://simplisafe.com/mobile/' + info.userId +
    '/sid/' + info.locationId + '/set-state'

  request.post(url, {
    state: newState,
    mobile: 1,
    no_persist: 0,
    XDEBUG_SESSION_START: 'session_name'
  }, function (er, res, body) {
    if (er) return cb(new Error('Failed to change state: ' + er.message))
    if (!RESPONSES[body.result]) return cb(new Error('Invalid state: ' + body.result))
    info.state = RESPONSES[body.result]
    cb(null)
  })
}
