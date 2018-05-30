'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"https://www.easy-mock.com/mock/5b0e405ff08d787345e6b2d5"',
})
