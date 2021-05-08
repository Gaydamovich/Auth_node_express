const Router = require('express')
const AuthController = require('./auth.controller.js')
const { check } = require('express-validator')
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

const router = new Router()

router.post('/login', AuthController.login)
router.post(
  '/register',
    check('email').isEmail(),
    check('password', 'Неккоректная длина').isLength({ min: 5, max: 15 }),
  AuthController.register
)
router.get('/users', authMiddleware, roleMiddleware(['ADMIN']), AuthController.getUsers)

module.exports = router