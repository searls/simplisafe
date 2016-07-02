var request = require('request')

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
