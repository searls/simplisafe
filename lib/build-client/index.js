var logout = require('./logout')
var setState = require('./set-state')

module.exports = function (info) {
  return {
    info: info,
    logout: function (cb) {
      logout(info, cb)
    },
    setState: function (newState, cb) {
      setState(newState, info, cb)
    }
  }
}

