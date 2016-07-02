module.exports = function (opts) {
  opts = opts || {}

  return {
    user: process.env['SIMPLISAFE_USER'] || opts.user,
    password: process.env['SIMPLISAFE_PASSWORD'] || opts.password
  }
}

