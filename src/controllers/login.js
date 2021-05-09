const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const models = require('../database/models')

function post (req, res) {
  if (!(req.body.email && req.body.password)) {
    return res.status(400).json({result: false, reason: 'Email and password fields must be provided.'})
  }

  models.User.findOne({
    where: {
      email: req.body.email
    }
  }).then((user) => {
    if (user?.password) {
      bcrypt.compare(
        req.body.password,
        user.password
      ).then((result) => {
        if (result) {
          const {email, name} = user

          const token = jwt.sign({
              email,
              name
            }, process.env.JWT_SECRET,
            {
              expiresIn: '24h'
            })

          return res.json({result, token})
        } else {
          return res.status(401).json({result, reason: 'Wrong email or password.'})
        }
      }).catch((err) => res.status(500).json({err, reason: 'bcrypt error'}))
    } else {
      return res.status(401).json({result: false, reason: 'Wrong email or password.'})
    }
  }).catch((err) => res.status(503).json({err}))
}

module.exports = {
  postLogin: post
}
