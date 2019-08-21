
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./deep-shape-equals.cjs.production.min.js')
} else {
  module.exports = require('./deep-shape-equals.cjs.development.js')
}
