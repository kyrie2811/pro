const mongoose = require('mongoose')

const siteModel = mongoose.Schema({
    siteName: {
        require: true,
        type: String
    },
    siteAmount: {
        require: true,
        type: String
    },
    siteAddress: {
        require: true,
        type: String
    },
    siteTime: {
        // require: true,
        type: String
    },
    sitePhone: {
        require: true,
        type: String
    },
    siteIntroduce: {
        // require: true,
        type: String
    },

    style: {
        type: String
    },
    poster: {
        require: true,
        type: String
    },

    date: {
        type: String,
        // require: true
    }
})

module.exports = mongoose.model('Site', siteModel)