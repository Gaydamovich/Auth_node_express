const jwt = require('jsonwebtoken')
const { jwt_key } = require('../config')

module.exports = function (req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) return res.status(403).json({ message: 'пользователь не авторизован' })

    req.user = jwt.verify(token, jwt_key)
    next()
  } catch (e) {
    return res.json({ message: e.message })
  }
}