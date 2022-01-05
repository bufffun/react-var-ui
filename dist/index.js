
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-var-ui.cjs.production.min.js')
} else {
  module.exports = require('./react-var-ui.cjs.development.js')
}
