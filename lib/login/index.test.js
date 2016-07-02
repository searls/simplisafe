
var subject, sendCredentials, getLocations
module.exports = {
  beforeEach: function () {
    sendCredentials = td.replace('./send-credentials')
    getLocations = td.replace('./get-locations')

    subject = require('./index')
  },
  happyPath: function () {
    td.when(sendCredentials('credentials')).thenCallback(null, {uid: 'x'})
    td.when(getLocations({uid: 'x'})).thenCallback(null, {locationId: 'y'})

    var error, result
    subject('credentials', function (er, user) {
      error = er
      result = user
    })

    assert.ifError(error)
    assert.deepEqual(result, {
      userId: 'x',
      locationId: 'y'
    })
  }
}
