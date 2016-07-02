var subject = require('./parse-options')

module.exports = {
  passThru: function () {
    var result = subject({user: 'B', password: 'C'})

    assert.deepEqual(result, {user: 'B', password: 'C'})
  },
  envVarOverrides: function () {
    process.env['SIMPLISAFE_USER'] = 'A'
    process.env['SIMPLISAFE_PASSWORD'] = 'B'

    var result = subject({user: 'Y', password: 'Z'})

    delete process.env['SIMPLISAFE_USER']
    delete process.env['SIMPLISAFE_PASSWORD']

    assert.deepEqual(result, {user: 'A', password: 'B'})
  },
  envOnly: function () {
    process.env['SIMPLISAFE_USER'] = 'D'
    process.env['SIMPLISAFE_PASSWORD'] = 'E'

    var result = subject()

    delete process.env['SIMPLISAFE_USER']
    delete process.env['SIMPLISAFE_PASSWORD']

    assert.deepEqual(result, {user: 'D', password: 'E'})
  },
  emptyInvocation: function () {
    assert.deepEqual(subject(), {user: undefined, password: undefined})
  }
}
