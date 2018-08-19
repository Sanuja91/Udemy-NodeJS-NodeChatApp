require('./config/config')

const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const { generateMessage, generateLocationMessage } = require('./utils/message')
const { isRealString } = require('./utils/validation')
const { Users } = require('./utils/users')
const publicPath = path.join(__dirname, '../public')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

var users = new Users()

app.use(express.static(publicPath))

// Registers an event listener
// Lets you listen for a new connection
io.on('connection', (socket) => {
    console.log('New user connected')
    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room))
            return callback('Name and room name are required')

        socket.join(params.room)
        users.removeUser(socket.id)
    users.addUser(socket.id, params.name, params.room)
        io.to(params.room).emit('updateUserList', users.getUserList(params.room))

        // socket.leave(params.room)

        // Rooms related socket calls
        // io.emit -> io.to(params.room).emit
        // socket.broadcast.emit -> socket.broadcast.to(params.room).emit
        // socket.emit ---- No need to target room as you target user directly

        // Emits a message to one user
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))

        // Emits a message to everyone except yourself in the room
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`))

        callback()
    })

    socket.on('disconnect', () => {
        console.log('User was disconnected')

        let user = users.removeUser(socket.id)[0]
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room))
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`))
        }
    })

    socket.on('createMessage', (message, callback) => {
        console.log('Create message', message)

        let user = users.getUser(socket.id)[0]
        // Emits a message to everyone
        io.to(user.room).emit('newMessage', generateMessage(user.name, message.text))
        callback()
    })

    socket.on('createLocationMessage', (coords) => {
        let user = users.getUser(socket.id)[0]
        // Emits a message to everyone
        io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
    })

})


server.listen(process.env.PORT, () => {
    console.log(`Server is up on port ${process.env.PORT}`)
})

module.exports = { app }