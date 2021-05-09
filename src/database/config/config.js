const path = require('path')

module.exports = {
  development: {
    storage: path.join(__dirname, '..', 'dev.sqlite'),
    dialect: 'sqlite'
  },
  test: {
    storage: path.join(__dirname, '..', 'test.sqlite'),
    dialect: 'sqlite'
  },
  production: {
    storage: path.join(__dirname, '..', 'prod.sqlite'),
    dialect: 'sqlite'
  }
}
