var socket = io()

socket.on('connect', function () {
    console.log('Connected to server')

})

socket.on('disconnect', function () {
    console.log('Disconnected from server')
})

socket.on('newMessage', function (message) {
    console.log('New message', message)
})

socket.emit('createMessage', {
    from: 'Sanuja',
    text: 'Checking if message received'
}, function (response) {
    console.log('Message received = ', response)
})