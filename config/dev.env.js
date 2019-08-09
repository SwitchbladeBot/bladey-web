'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  CLIENT_ID: '"515607503648718868"',
  REDIRECT_URI: '"http://localhost:8080/auth"',
  BLADEY_API_ROOT: '"http://localhost:8000/api"'
})
