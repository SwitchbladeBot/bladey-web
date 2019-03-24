'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  CLIENT_ID: '"346014632395407362"',
  REDIRECT_URI: '"http://localhost:8080/auth"',
  BLADEY_API_ROOT: '"https://dev.switchblade.xyz/api"'
})
