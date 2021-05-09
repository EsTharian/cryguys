const controllers = require('./controllers')
const path = require('path')
const middleware = require('./middleware')

module.exports = function router(app) {
  app.route('/login')
    .get(controllers.loveCoffee)
    .post(controllers.postLogin)

  app.get('/current-user', middleware.authMiddleware, (req, res) => {
    res.json({
      ...req.userData,
      result: true
    })
  })

  app.route('/*')
    .get(function (req, res) {
      res.sendFile(path.join(__dirname + '/../public/' + req.path))
    })
}
