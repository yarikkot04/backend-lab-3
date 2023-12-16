const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    default_currency : {
        type : String,
        required : true,
        default: '$',
    }
})

module.exports = model('User', userSchema)