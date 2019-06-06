'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  CLIENT_ID: '"515607503648718868"',
  REDIRECT_URI: '"http://bladey-web-daavid665137575.codeanyapp.com:3000/auth"',
  BLADEY_API_ROOT: '"https://1grtt7sz.apps.lair.io/api"'
})
