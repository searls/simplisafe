var parseOptions, login, buildClient, subject

module.exports = {
  beforeEach: function () {
    parseOptions = td.replace('./parse-options')
    login = td.replace('./login')
    buildClient = td.replace('./build-client')
    subject = require('./simplisafe')
  },
  createsAndReturnsAClient: function () {
    td.when(parseOptions({user: 'A', password: 'B'})).thenReturn('parsed opts')
    td.when(login('parsed opts')).thenCallback(null, 'initial state')
    td.when(buildClient('initial state')).thenReturn('shiny client')

    var error, result
    subject({user: 'A', password: 'B'}, function (er, client) {
      error = er
      result = client
    })

    assert.ifError(error)
    assert.equal(result, 'shiny client')
  },
  ifLoginFails: function () {
    td.when(parseOptions({user: 'A', password: 'B'})).thenReturn('parsed opts')
    td.when(login('parsed opts')).thenCallback(new Error('Login failed'), null)
    td.when(buildClient(td.matchers.anything())).thenThrow(new Error('WAT?!'))

    var error, result
    subject({user: 'A', password: 'B'}, function (er, client) {
      error = er
      result = client
    })

    assert.equal(error.message, 'Login failed')
    assert.equal(result, null)
  }
}
