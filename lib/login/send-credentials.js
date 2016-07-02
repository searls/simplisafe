var request = require('../wrappers/request')

var LOGIN_URL = 'https://simplisafe.com/mobile/login/'

module.exports = function (credentials, cb) {
  request.post(LOGIN_URL, {
    name: credentials.user,
    pass: credentials.password,
    device_name: 'Node.js',
    device_uuid: 'f81d4fae-7dec-11d0-a765-00a0c91e6bf6',
    version: 1200,
    no_persist: 1,
    XDEBUG_SESSION_START: 'session_name'
  }, function (er, res, body) {
    if (er) return cb(new Error('Unexpected login error: ' + er.message))
    if (body.return_code !== 1) return cb(new Error('Login failed for "' + credentials.user + '"'))

    cb(er, {
      userId: body.uid
    })
  })
}
