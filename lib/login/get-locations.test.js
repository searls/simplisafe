var subject, request
module.exports = {
  beforeEach: function () {
    request = td.replace('../wrappers/request')

    subject = require('./get-locations')
  },
  happyPath: function () {
    td.when(request.post('https://simplisafe.com/mobile/ABC/locations', {
      no_persist: 0,
      XDEBUG_SESSION_START: 'session_name'
    })).thenCallback(null, 'some response object', {
      num_locations: 1,
      locations: {
        xyz: {
          system_status: 'off i guess',
          other_junk: 'yup'
        }
      }
    })

    var error, result
    subject('ABC', function (er, locations) {
      error = er
      result = locations
    })

    assert.ifError(error)
    assert.deepEqual(result, {
      xyz: {
        system_status: 'off i guess',
        other_junk: 'yup'
      }
    })
  },
  error: function () {
    td.when(request.post('https://simplisafe.com/mobile/ABC/locations', {
      no_persist: 0,
      XDEBUG_SESSION_START: 'session_name'
    })).thenCallback(new Error('X'))

    var error, result
    subject('ABC', function (er, user) {
      error = er
      result = user
    })

    assert.equal(error.message, 'Failed to retrieve locations: X')
    assert.equal(result, undefined)
  },
  noLocations: function () {
    td.when(request.post('https://simplisafe.com/mobile/ABC/locations', {
      no_persist: 0,
      XDEBUG_SESSION_START: 'session_name'
    })).thenCallback(null, 'something', {locations: {}})

    var error, result
    subject('ABC', function (er, user) {
      error = er
      result = user
    })

    assert.equal(error.message, 'Server returned no valid locations')
    assert.equal(result, undefined)
  }
}
