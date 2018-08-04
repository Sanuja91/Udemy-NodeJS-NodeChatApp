require('./config/config')

const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const { generateMessage } = require('./utils/message')
const publicPath = path.join(__dirname, '../public')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

app.use(express.static(publicPath))

// Registers an event listener
// Lets you listen for a new connection
io.on('connection', (socket) => {
    console.log('New user connected')

    // Emits a message to yourself only
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))

    // Emits a message to everyone except yourself
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user has joined the app'))

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
        socket.broadcast.emit('newMessage', generateMessage(message.from, message.text))

    })

})


server.listen(process.env.PORT, () => {
    console.log(`Server is up on port ${process.env.PORT}`)
})

module.exports = { app }