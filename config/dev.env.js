'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  CLIENT_ID: '"346014632395407362"',
  REDIRECT_URI: '"http://localhost:8080/auth"',
  BLADEY_API_ROOT: '"http://localhost:8000/api"',
  SENTRY_DSN: '"https://494ef9a64b194bf29d41a3896f599de8@o156437.ingest.sentry.io/5201998"'
})
