const expect = require('expect')
const { app } = require('../server.js')
const { server } = require('../server.js')
const { generateMessage, generateLocationMessage } = require('./message')


describe('generateMessage', () => {
    it('should generate correct message object', () => {
        let from = 'Sanuja'
        let text = 'Some message'
        let message = generateMessage(from, text)


        expect(typeof message.createdAt).toBe('number')
        expect(message).toMatchObject({ from, text })
    })
})

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        let from = 'Sanuja'
        let latitude = 15
        let longitude = 19
        let url = `https://www.google.com/maps?q=15,19`
        let message = generateLocationMessage(from, latitude, longitude)


        expect(typeof message.createdAt).toBe('number')
        expect(message).toMatchObject({ from, url })
    })
})