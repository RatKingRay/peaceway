const express = require('express')
const app = express()

const userRoutes = require('./server/routes/user')

app.use('/users', userRoutes)

const PORT = process.env.PORT || 3000