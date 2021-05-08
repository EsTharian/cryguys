module.exports = {
  loveCoffee: (req, res) => res.status(418).json({
    status: 418,
    reason: 'Don\'t worry, I\'m not a teapot, binaenaleyh, ben saksı da değilim!'
  })
}
