const expect = require('expect')
const { app } = require('../server.js')
const { server } = require('../server.js')
const { generateMessage } = require('./message')


describe('generateMessage', () => {
    it('should generate correct message object', () => {
        let from = 'Sanuja'
        let text = 'Some message'
        let message = generateMessage(from, text)


        expect(typeof message.createdAt).toBe('number')
        expect(message).toMatchObject({ from, text })
    })
})