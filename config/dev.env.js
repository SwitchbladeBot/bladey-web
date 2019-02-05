'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  CLIENT_ID: '"346014632395407362"',
  REDIRECT_URI: '"http://localhost:8080/auth"',
  BLADEY_API_ROOT: '"http://localhost:8000/api"'
})
