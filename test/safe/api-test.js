var simplisafe = require('../../lib/simplisafe')

var _ = require('lodash')

module.exports = {
  setSystemState: function (done) {
    simplisafe({
      user: process.env['SIMPLISAFE_TEST_USER'],
      password: process.env['SIMPLISAFE_TEST_PASSWORD']
    }, function (er, client) {
      assert.ifError(er)
      assert(_.includes(['home', 'away', 'off'], client.info.state),
          'Unexpected state: ' + client.info.state)

      if (process.env['CONTINUOUS_INTEGRATION']) {
        return done(null) // Don't want Travis CI to send cops to my house.
      }

      client.setState('home', function (er) {
        assert.ifError(er)
        assert.equal(client.info.state, 'home')

        client.setState('off', function (er) {
          assert.ifError(er)
          assert.equal(client.info.state, 'off')

          client.logout(function (er) {
            done(er)
          })
        })
      })
    })
  }
}

