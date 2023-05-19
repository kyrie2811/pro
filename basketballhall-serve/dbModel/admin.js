const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const adminModel = mongoose.Schema({
    email: {
        require: true,
        type: String
    },
    username: {
        require: true,
        type: String
    },
    password: {
        require: true,
        type: String,
        set(val) {
            return bcrypt.hashSync(val, 10)
        }
    },
    identity: {
        require: true,
        type: String
    },
    date: {
        require: true,
        type: String
    },
    avatar: {
        require: true,
        type: String
    },

    nickname: {
        require: true,
        type: String,

    },
    age: {
        require: true,
        type: String
    },

    mobilePhoneNumber: {
        require: true,
        type: String
    },
    sex: {
        require: true,
        type: String
    },
    id: {
        require: true,
        type: String,

    },
    account: {
        require: true,
        type: String
    },
    area: {
        require: true,
        type: String
    },
    hobby: {
        require: true,
        type: String
    },
    work: {
        require: true,
        type: String,

    },
    design: {
        require: true,
        type: String
    },
    poster: {
        // require: true,
        type: String
    },
})
// mongoose.model(集合名称，model)
module.exports = mongoose.model('BasketballHull', adminModel)