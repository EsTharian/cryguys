const controllers = require('./controllers')

const middleware = require('./middleware')

module.exports = function router(app) {
  app.route('/login')
    .get(controllers.loveCoffee)

  app.get('/', middleware.authMiddleware, controllers.loveCoffee)
}
