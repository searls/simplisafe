var request = require('request')
var _ = require('lodash')

module.exports = {
  post: function (url, params, cb) {
    request({
      url: url,
      method: 'POST',
      json: true,
      jar: true,
      form: params
    }, cb)
  }

}
