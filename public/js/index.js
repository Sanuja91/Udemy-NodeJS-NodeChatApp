var socket = io()

socket.on('connect', function () {
    console.log('Connected to server')

})

socket.on('disconnect', function () {
    console.log('Disconnected from server')
})

socket.on('newMessage', function (message) {
    console.log('New message', message)
    
    // Below is a list iem
    let li = jQuery('<li></li>')
    li.text(`${message.from}: ${message.text}`)
    jQuery('#messages').append(li)
})

socket.emit('createMessage', {
    from: 'Sanuja',
    text: 'Checking if message received'
}, function (response) {
    console.log('Message received = ', response)
})

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault()

    socket.emit('createMessage', {
        from: 'Sanuja',
        text: jQuery('[name=message]').val()
    }, function () {

    })
})