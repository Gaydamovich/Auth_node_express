const jwt = require('jsonwebtoken')
const { jwt_key } = require('../config')

module.exports = (roles) => (req, res, next) => {
  let hasAccess = false

  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) return res.status(403).json({ message: 'пользователь не авторизован' })

    const { roles: userRoles } = jwt.verify(token, jwt_key)

    userRoles?.forEach(role => {
      if (roles.includes(role)) hasAccess = true
    })

    if (!hasAccess) return res.status(403).json({ message: 'У вас нет прав' })

    next()
  } catch (e) {
    console.log(e)
  }
}