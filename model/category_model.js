const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const path = require('path')

class Category {
    constructor(name) {
        this.id = uuidv4()
        this.name = name
    }
    async save() {
        const categories = await Category.getAll()
        const candidate = categories.findIndex(c => c.name === this.name)
        if (candidate !== -1) {
            return new Promise((resolve, reject) => {
                resolve({ error: 'Category already exists', status : 1})
            })
        } else {
            categories.push({ id: this.id, name: this.name })
            return new Promise((resolve, reject) => {
                fs.writeFile(path.resolve(__dirname, '../data/category_list.json'), JSON.stringify(categories), (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve({ saved : categories[categories.length - 1], status : 0})
                    }
                })
            })
        }
    }

    static async removeCategoryByName(name) {
        let categories = await Category.getAll()
        const candidate = categories.find(c => c.name === name)
        if (candidate) {
            categories = categories.filter(c => c.name !== name)
            return new Promise((resolve, reject) => {
                fs.writeFile(path.resolve(__dirname, '../data/category_list.json'), JSON.stringify(categories), (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(categories)
                    }
                })
            })
        } else {
            return new Promise((resolve, reject) => {
                resolve({ error: 'No category with this name exists', status : 1})
            })
        }
    }

    static async getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(path.resolve(__dirname, '../data/category_list.json'), 'utf-8', (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(JSON.parse(data))
                }
            })
        })
    }
    static async findById(id) {
        const categories = await Category.getAll()
        const selectedCategory = categories.find(c => c.id === id)
        return selectedCategory
    }
}



module.exports = Category