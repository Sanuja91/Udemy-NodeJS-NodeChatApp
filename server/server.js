require('./config/config')

const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

app.use(express.static(publicPath))

// Registers an event listener
// Lets you listen for a new connection
io.on('connection', (socket)=>{
    console.log('New user connected')

    socket.on('disconnect', (socket)=>{
        console.log('User was disconnected')
    })
    
})


server.listen(process.env.PORT, () => {
    console.log(`Server is up on port ${process.env.PORT}`)
})

module.exports = { app }