
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./coinbase-connector.cjs.production.min.js')
} else {
  module.exports = require('./coinbase-connector.cjs.development.js')
}
