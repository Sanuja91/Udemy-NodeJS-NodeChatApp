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

socket.on('newLocationMessage', function (message) {
    console.log('New Location message', message)

    let li = jQuery('<li></li>')
    // a is an anchor tag 
    let a = jQuery('<a target="_blank">My current location</a>')
    li.text(`${message.from}: `)
    
    a.attr('href', message.url)
    li.append(a)

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

const locationButton = jQuery('#send-location')

locationButton.on('click', function () {
    if (!navigator.geolocation)
        return alert('Geolocation not supported by your browser')

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function () {
        alert('Unable to fetch location')
    })
})