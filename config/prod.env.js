'use strict'

function getVar (variable) {
  return process.env[`${process.env.HEAD.toUpperCase()}_${variable}`] || process.env[variable]
}

module.exports = {
  CLIENT_ID: `"${getVar('CLIENT_ID')}"`,
  REDIRECT_URI: `"${getVar('REDIRECT_URI')}"`,
  BLADEY_API_ROOT: `"${getVar('BLADEY_API_ROOT')}"`
}
