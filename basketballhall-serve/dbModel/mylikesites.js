const mongoose = require('mongoose')


const MylikeModel = mongoose.Schema({
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
// mongoose.model(集合名称，model)
module.exports = mongoose.model('Mylike', MylikeModel)