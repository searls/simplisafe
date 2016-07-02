# simplisafe

Wraps the (undocumented!) HTTP API used by the Simplisafe iOS application,
offering Simplisafe subscribers a way to remotely control their security system.

``` js
var simplisafe = require('simplisafe')

simplisafe({ user: 'foo@bar.com', password: '123' }, function (er, client) {
  if (er) throw er

  client.info.state // 'off' or 'home' or 'away'

  client.setState('away', function (er) {})

  client.logout(function (er) {}) // Log out, clean out the connection
})
```

## limitations

The Simplisafe API is made more complex by its support for multiple locations.
Since I only have one house, this API currently assumes the first location
returned is the one you want to work with.

If someone wants multiple location support and is willing to send a PR or fund
the effort, feel free to reach out to me.
