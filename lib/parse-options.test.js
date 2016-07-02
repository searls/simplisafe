var subject = require('./parse-options')

module.exports = {
  passThru: function () {
    var result = subject({user: 'B', password: 'C'})

    assert.deepEqual(result, {user: 'B', password: 'C'})
  }
}
