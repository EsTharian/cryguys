const jwt = require('jsonwebtoken')

function authMiddleware (req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1]
    req.userData = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    return res.status(400).json({result: false, reason: 'Token cannot be verified.'})
  }
}

module.exports = {
  authMiddleware
}
