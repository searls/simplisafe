
var subject, sendCredentials, getLocations
module.exports = {
  beforeEach: function () {
    sendCredentials = td.replace('./send-credentials')
    getLocations = td.replace('./get-locations')

    subject = require('./index')
  },
  happyPath: function () {
    td.when(sendCredentials('credentials')).thenCallback(null, {userId: 'x'})
    td.when(getLocations('x')).thenCallback(null, {
      y: { system_state: 'Quantum' }
    })

    var error, result
    subject('credentials', function (er, user) {
      error = er
      result = user
    })

    assert.ifError(error)
    assert.deepEqual(result, {
      userId: 'x',
      locationId: 'y',
      state: 'quantum'
    })
  },
  loginFailed: function () {
    var expectedError = new Error('Failz')
    td.when(sendCredentials('credentials')).thenCallback(expectedError)
    td.when(getLocations(), {ignoreExtraArgs: true}).thenCallback(new Error())

    var actualError, result
    subject('credentials', function (er, user) {
      actualError = er
      result = user
    })

    assert.equal(actualError, expectedError)
    assert.equal(result, undefined)
  },
  locationsFailed: function () {
    var expectedError = new Error('Failz')
    td.when(sendCredentials('credentials')).thenCallback(null, {userId: 'A'})
    td.when(getLocations('A')).thenCallback(expectedError)

    var actualError, result
    subject('credentials', function (er, user) {
      actualError = er
      result = user
    })

    assert.equal(actualError, expectedError)
    assert.equal(result, undefined)
  }
}
