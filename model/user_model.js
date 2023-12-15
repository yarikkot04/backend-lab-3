const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const path = require('path')

class User {
    constructor(name) {
        this.id = uuidv4()
        this.name = name
    }

    async save() {
        const users = await User.getAll()
        users.push({ id: this.id, name: this.name })
        return new Promise((resolve, reject) => {
            fs.writeFile(path.resolve(__dirname, '../data/user_list.json'), JSON.stringify(users), (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(users[users.length - 1])
                }
            })
        })
    }
    static async removeUser(id) {
        let users = await User.getAll()
        users = users.filter(u => u.id !== id)
        return new Promise((resolve, reject) => {
            fs.writeFile(path.resolve(__dirname, '../data/user_list.json'), JSON.stringify(users), (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(users)
                }
            })
        })
    }

    static async getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(path.resolve(__dirname, '../data/user_list.json'), 'utf-8', (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(JSON.parse(data))
                }
            })
        })
    }
    static async findById(id) {
        const users = await User.getAll()
        const selectedUser = users.find(u => u.id === id)
        return selectedUser
    }
}

module.exports = User