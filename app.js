require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const router = require('./auth/router')
const { old_mongoose_uri, mongoose_config } = require('./config')
const PORT = process.env.PORT ?? 5500

const app = express()

app.use(express.json())
app.use('/auth', router)

function start() {
  mongoose
    .connect(old_mongoose_uri, mongoose_config)
    .then(() => app.listen(PORT, () => console.log(`Server has been started on port: ${PORT}`)))
    .catch(e => console.log(e))
}

start()