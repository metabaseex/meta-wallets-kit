
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./connect-wallet-connector.cjs.production.min.js')
} else {
  module.exports = require('./connect-wallet-connector.cjs.development.js')
}
