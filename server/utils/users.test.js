const expect = require('expect')
const { Users } = require('./users')

describe('Users', () => {
    var users
    beforeEach(() => {
        users = new Users()
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Jen',
            room: 'React Course'
        }, {
            id: '3',
            name: 'Sanuja',
            room: 'Node Course'
        }]
    })

    it('should add new user', () => {
        let user = {
            id: 123,
            name: 'Sanuja',
            room: 'Players'
        }

        let resUser = users.addUser(user.id, user.name, user.room)
        expect(users.users).toEqual(expect.arrayContaining([user]))
    })


    it('should remove a user', () => {
        let userId = '1'
        let user = users.removeUser(userId)
        expect(user[0].id).toBe(userId)
        expect(users.users.length).toBe(2)
    })

    it('should not remove a user', () => {
        let userId = '44'
        let user = users.removeUser(userId)
        expect(user).toEqual([])
        expect(users.users.length).toBe(3)
    })

    it('should find a user', () => {
        let userId = '2'
        let user = users.getUser(userId)
        expect(user[0].id).toBe(userId)
    })

    it('should not find a user', () => {
        let userId = '99'
        let user = users.getUser(userId)
        expect(user).toEqual([])
    })


    it('should return names for node course', () => {
        let userList = users.getUserList('Node Course')
        expect(userList).toEqual(['Mike', 'Sanuja'])
    })

    it('should return names for react course', () => {
        let userList = users.getUserList('React Course')
        expect(userList).toEqual(['Jen'])
    })


})