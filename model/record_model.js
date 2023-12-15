const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const path = require('path')
const User = require('./user_model')
const Category = require('./category_model')

class Record {
    constructor(data) {
        this.id = uuidv4()
        this.userId = data.user_id
        this.categoryId = data.category_id
        this.date = data.date
        this.amount = data.amount
    }

    async save() {
        const records = await Record.getAll()
        const user = await User.findById(this.userId)
        const category = await Category.findById(this.categoryId)
        if (!user) {
            return new Promise((resolve, reject) => {
                resolve({ error: 'User with this id doesn`t exist!', status: 1 })
            })
        } else if (!category) {
            return new Promise((resolve, reject) => {
                resolve({ error: 'Category with this id doesn`t exist!', status: 1 })
            })
        } else {
            records.push({ id: this.id, userId: this.userId, categoryId: this.categoryId, date: this.date, amount: this.amount })
            return new Promise((resolve, reject) => {
                fs.writeFile(path.resolve(__dirname, '../data/record_list.json'), JSON.stringify(records), (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve({ saved: records[records.length - 1], status: 0 })
                    }
                })
            })
        }
    }

    static async getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(path.resolve(__dirname, '../data/record_list.json'), 'utf-8', (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(JSON.parse(data))
                }
            })
        })
    }

    static async removeRecordById(id) {
        let records = await Record.getAll()
        const candidate = records.find(c => c.id === id)
        if (candidate) {
            records = records.filter(c => c.id !== id)
            return new Promise((resolve, reject) => {
                fs.writeFile(path.resolve(__dirname, '../data/record_list.json'), JSON.stringify(records), (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(records)
                    }
                })
            })
        } else {
            return new Promise((resolve, reject) => {
                resolve({ error: 'No record with this id exists', status: 1 })
            })
        }
    }

    static async findById(id) {
        const records = await Record.getAll()
        const selectedRecord = records.find(r => r.id === id)
        if (selectedRecord) {
            return selectedRecord
        } else {
            return { error: 'Record with this id doesn`t exist!', status: 1 }
        }
    }

    static async filterByCategoryId(id) {
        let records = await Record.getAll()
        const filteredRecords = records.filter(c => c.categoryId.toString() === id.toString())
        if(filteredRecords.length) {
            return filteredRecords
        } else {
            return { error: 'Record with this categoryId doesn`t exist!'}
        }
    }

    static async filterByUserId(id) {
        let records = await Record.getAll()
        const filteredRecords = records.filter(c => c.userId.toString() === id.toString())
        if(filteredRecords.length) {
            return filteredRecords
        } else {
            return { error: 'Record with this userId doesn`t exist!'}
        }
    }

    static async filterByAllParams(userId, categoryId) {
        let records = await Record.getAll()
        const filteredRecords = records.filter(c => {
            return (c.userId.toString() === userId.toString()) && (c.categoryId.toString() === categoryId.toString())
        })
        if(filteredRecords.length) {
            return filteredRecords
        } else {
            return { error: 'Record with this userId and categoryId doesn`t exist!' }
        }
    }
}

module.exports = Record