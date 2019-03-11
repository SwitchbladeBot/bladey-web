'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  CLIENT_ID: '"513840177890721812"',
  REDIRECT_URI: '"http://localhost:8080/auth"',
  BLADEY_API_ROOT: '"http://localhost:9050/api"'
})
