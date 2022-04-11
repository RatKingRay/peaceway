const express = require('express')
const app = express()

const userRoutes = require('./server/routes/user')
app.use(express.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
})

app.use('/users', userRoutes)

app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'public', 'login.html'))
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server stated on port ${PORT}!`))