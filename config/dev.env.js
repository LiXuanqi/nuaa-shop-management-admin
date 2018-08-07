'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"https://nuaashop.yuwenjie.cc/"',
  QINIU_UPLOAD_URL: '"http://upload.qiniup.com"'
})
