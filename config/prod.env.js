'use strict'

const varKey = (v) => process.env.HEAD ? `${process.env.HEAD.toUpperCase()}_${v}` : v
const getVar = (v) => process.env[varKey(v)] || process.env[v]

module.exports = {
  CLIENT_ID: `"${getVar('CLIENT_ID')}"`,
  REDIRECT_URI: `"${getVar('REDIRECT_URI')}"`,
  BLADEY_API_ROOT: `"${getVar('BLADEY_API_ROOT')}"`
}
