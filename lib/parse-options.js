module.exports = function (opts) {
  return {
    user: process.env['SIMPLISAFE_USER'] || opts.user,
    password: process.env['SIMPLISAFE_PASSWORD'] || opts.password
  }
}

