var subject, request
module.exports = {
  beforeEach: function () {
    request = td.replace('../wrappers/request')

    subject = require('./send-credentials')
  },
  happyPath: function () {
    td.when(request.post('https://simplisafe.com/mobile/login/', {
      name: 'A',
      pass: 'B',
      device_name: 'Node.js',
      device_uuid: 'f81d4fae-7dec-11d0-a765-00a0c91e6bf6',
      version: 1200,
      no_persist: 1,
      XDEBUG_SESSION_START: 'session_name'
    })).thenCallback(null, 'some response object', {
      return_code: 1,
      session: 'i am a session',
      uid: '12345',
      username: 'A'
    })

    var error, result
    subject({user: 'A', password: 'B'}, function (er, user) {
      error = er
      result = user
    })

    assert.ifError(error)
    assert.deepEqual(result, {userId: '12345'})
  },
  unknownError: function () {
    td.when(request.post('https://simplisafe.com/mobile/login/',
      td.matchers.isA(Object))).thenCallback(new Error('X'))

    var error, result
    subject({}, function (er, user) {
      error = er
      result = user
    })

    assert.equal(error.message, 'Unexpected login error: X')
    assert.equal(result, undefined)
  },
  loginFailed: function () {
    td.when(request.post('https://simplisafe.com/mobile/login/',
      td.matchers.isA(Object))).thenCallback(null, 'a response', {
        return_code: 0
      })

    var error, result
    subject({user: 'D'}, function (er, user) {
      error = er
      result = user
    })

    assert.equal(error.message, 'Login failed for "D"')
    assert.equal(result, undefined)
  }

}
