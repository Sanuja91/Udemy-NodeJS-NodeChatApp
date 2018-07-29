require('./config/config')

const express = require('express')
const bodyParser = require('body-parser')

const path = require('path')

const publicPath = path.join(__dirname, '../public')

const app = express()

app.use(express.static(publicPath))
// app.use(bodyParser.json())


// app.get('/', (req, res) => {
//     res.send(publicPath + '/index.htm')
// })

app.listen(process.env.PORT, () => {
    console.log(`Server is up on port ${process.env.PORT}`)
})

module.exports = { app }