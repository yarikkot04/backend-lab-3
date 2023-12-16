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
}

module.exports = {
    CommonUtils,
}