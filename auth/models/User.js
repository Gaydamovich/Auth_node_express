const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    roles: [{ type: String, ref: 'Role' }],
})

const UserModel = model('User', UserSchema)

module.exports = UserModel