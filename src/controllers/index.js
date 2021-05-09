const {loveCoffee} = require('./teapot')
const login = require('./login')

module.exports = {
  loveCoffee,
  ...login
}
