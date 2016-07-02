var logout = require('./logout')

module.exports = function (info) {
  return {
    logout: function (cb) {
      logout(info, cb)
    }
  }
}

