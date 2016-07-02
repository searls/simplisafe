var subject, logout, setState
module.exports = {
  beforeEach: function () {
    logout = td.replace('./logout')
    setState = td.replace('./set-state')

    subject = require('./index')
  },
  logoutCallsLogout: function () {
    var client = subject({some: 'info'})
    var cb = function () {}

    client.logout(cb)

    td.verify(logout({some: 'info'}, cb))
  }
}
