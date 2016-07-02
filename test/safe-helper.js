require('dotenv').config()

global.assert = require('core-assert')

if (!process.env['SIMPLISAFE_TEST_PASSWORD']) {
  console.error('SIMPLISAFE_TEST_USER and SIMPLISAFE_TEST_PASSWORD ' +
                'env vars are required! Aborting S.A.F.E. tests!')
  process.exit(1)
}
