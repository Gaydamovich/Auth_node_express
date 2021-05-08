const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const { jwt_key } = require('../config')
const jwt = require('jsonwebtoken')
const User = require('./models/User')
const Role = require('./models/Role')

const generateToken = (id, roles) => jwt.sign({ id, roles }, jwt_key, { expiresIn: '24h' })

class AuthController {
  static async login(req, res) {
    try {
      const { email, password } = req.body

      const candidate = await User.findOne({ email })
      if (!candidate) return res.status(400).json({ message: `User ${email} not found` })

      const passwordIsValid = await bcrypt.compare(password, candidate.password)

      if (!passwordIsValid) return res.status(400).json({ message: 'Login or password is wrong' })

      const token = generateToken(candidate._id, candidate.roles)
      return res.status(200).json({ token })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Login failed' })
    }
  }

  static async register(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

      const { email, password } = req.body
      const candidate = await User.findOne({ email })

      if (candidate) return res.status(400).json({ message: 'This is user already register' })

      const hasPassword = await bcrypt.hash(password, 10)
      const { role } = await Role.findOne({ role: 'USER' })
      const user = new User({ email, password: hasPassword, roles: [role] })
      await user.save()

      return res.status(201).json({ message: 'User has been successfully created' })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Registration failed' })
    }
  }

  static async getUsers(req, res) {
    try {
      const users = await User.find()
      res.json(users)
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = AuthController