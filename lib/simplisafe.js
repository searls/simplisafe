var parseOptions = require('./parse-options')
var login = require('./login')
var buildClient = require('./build-client')

module.exports = function (config, cb) {
  var opts = parseOptions(config)
  login(opts, function (er, info) {
    if (er) return cb(er)
    cb(null, buildClient(info))
  })
}
