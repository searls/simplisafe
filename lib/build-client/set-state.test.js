var subject, request
module.exports = {
  beforeEach: function () {
    request = td.replace('../wrappers/request')

    subject = require('./set-state')
  },
  happyPath: function () {
    var info = {userId: 'X', locationId: 'Y', state: 'home'}
    td.when(request.post('https://simplisafe.com/mobile/X/sid/Y/set-state', {
      state: 'away',
      mobile: 1,
      no_persist: 0,
      XDEBUG_SESSION_START: 'session_name'
    })).thenCallback(null, 'some response object', {
      result: 5
    })

    var error
    subject('away', info, function (er) {
      error = er
    })

    assert.ifError(error)
    assert.equal(info.state, 'away')
  },
  unknownError: function () {
    var info = {userId: 'X', locationId: 'Y', state: 'home'}
    td.when(request.post('https://simplisafe.com/mobile/X/sid/Y/set-state', {
      state: 'away',
      mobile: 1,
      no_persist: 0,
      XDEBUG_SESSION_START: 'session_name'
    })).thenCallback(new Error('UGH'))

    var error
    subject('away', info, function (er) {
      error = er
    })

    assert.equal(error.message, 'Failed to change state: UGH')
    assert.equal(info.state, 'home')
  },
  invalidState: function () {
    var info = {userId: 'X', locationId: 'Y', state: 'home'}
    td.when(request.post('https://simplisafe.com/mobile/X/sid/Y/set-state', {
      state: 'away',
      mobile: 1,
      no_persist: 0,
      XDEBUG_SESSION_START: 'session_name'
    })).thenCallback(null, 'something', {
      result: 99
    })

    var error
    subject('away', info, function (er) {
      error = er
    })

    assert.equal(error.message, 'Invalid state: 99')
  }
}
