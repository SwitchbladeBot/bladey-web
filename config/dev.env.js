'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ROOT_HOST: '"localhost:8080"',
  CLIENT_ID: '"346014632395407362"',
  REDIRECT_URI: '"http://localhost:8080/auth"'
})
