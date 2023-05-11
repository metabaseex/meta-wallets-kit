
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./inpage-connector.cjs.production.min.js')
} else {
  module.exports = require('./inpage-connector.cjs.development.js')
}
