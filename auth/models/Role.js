const { Schema, model } = require('mongoose')

const RoleSchema = new Schema({
    role: { type: String, unique: true, required: true, default: 'USER' },
})

const RoleModel = model('Role', RoleSchema)

module.exports = RoleModel