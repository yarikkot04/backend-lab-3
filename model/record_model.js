const { Schema, model } = require('mongoose')

const recordSchema = new Schema({
    user_id : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    category_id : {
        type : Schema.Types.ObjectId,
        ref : 'Category',
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    },
    amount : {
        type : String,
        required : true
    },
    currency : {
        type : String,
        required : true
    }
})

module.exports = model('Record', recordSchema)