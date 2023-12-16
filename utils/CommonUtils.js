const Category = require('../model/category_model')
const User = require('../model/user_model')
const Record = require('../model/record_model')

class CommonUtils {
    static async checkUsernameByNameNotExists(username) {
        const users = await User.find()
        for (let i = 0; i < users.length; i++) {
            if (users[i].name === username) {
                return false
            }
        }
        return true
    }
    static checkCurrencyValidity(currency) {
        const currencies_arr = ['UAH', 'USD', 'EUR', 'GBP', 'JPY', 'CAD']
        if (currencies_arr.includes(currency)) {
            return true
        }
        return false
    }
    static async verifyUserExistenceById(id) {
        let candidate
        try {
            candidate = await User.findById(id)
        } catch (e) {
            candidate = null
        }
        if (!candidate) return false
        return true
    }
    static async checkCategoryByNameNotExists(categoryName) {
        const categories = await Category.find()
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].name === categoryName) {
                return false
            }
        }
        return true
    }
    static async verifyCategoryExistenceById(id) {
        let candidate
        try {
            candidate = await Category.findById(id)
        } catch (e) {
            candidate = null
        }
        if (!candidate) return false
        return true
    }
    static checkAmountValidity(amount) {
        if (isNaN(+amount)) return false
        if (amount.includes(',')) return false
        const amount_decimal_part = amount.split('.')[1]
        if (amount_decimal_part) {
            if (amount_decimal_part.length > 2) return false
        }
        return true
    }
    static async verifyRecordExistenceById(id) {
        let candidate
        try {
            candidate = await Record.findById(id)
        } catch (e) {
            candidate = null
        }
        if (!candidate) return false
        return true
    }
}

module.exports = {
    CommonUtils,
}