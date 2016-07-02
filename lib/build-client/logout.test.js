var subject, request
module.exports = {
  beforeEach: function () {
    request = td.replace('../wrappers/request')

    subject = require('./logout')
  },
  happyPath: function () {
    td.when(request.post('https://simplisafe.com/mobile/logout', {
      no_persist: 0,
      XDEBUG_SESSION_START: 'session_name'
    })).thenCallback(null, 'some response object', {
      return_code: 1
    })

    var error, ok
    subject('some info', function (er) {
      error = er
      ok = true
    })

    assert.ifError(error)
    assert.equal(ok, true)
  }
}
