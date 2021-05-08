const {httpsMiddleware} = require('./https')
const {authMiddleware} = require('./auth')

module.exports = {
  httpsMiddleware,
  authMiddleware
}
