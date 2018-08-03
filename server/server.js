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
io.on('connection', (socket) => {
    console.log('New user connected')

    socket.on('disconnect', (socket) => {
        console.log('User was disconnected')
    })

    socket.on('createMessage', (message) => {
        console.log('Create message', message)
       // Emits a message to everyone
        // io.emit('newMessage',{
        //     from:message.from,
        //     text:message.text,
        //     createdAt:new Date().getTime()
        // })

        // Emits a message to everyone except yourself
        socket.broadcast.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })
    })

})


server.listen(process.env.PORT, () => {
    console.log(`Server is up on port ${process.env.PORT}`)
})

module.exports = { app }