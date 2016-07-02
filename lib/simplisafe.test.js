module.exports = {
  createsAndReturnsAClient: function () {
    var parseOptions = td.replace('./parse-options')
    var login = td.replace('./login')
    var buildClient = td.replace('./build-client')
    var subject = require('./simplisafe')

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
  }
}
