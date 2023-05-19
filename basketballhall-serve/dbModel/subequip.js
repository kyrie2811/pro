const mongoose = require('mongoose')


const subequiModel = mongoose.Schema({
    subsite: {
        require: true,
        type: String,
    },
    subdate: {
        require: true,
        type: String
    },
    subtime: {
        require: true,
        type: String
    },
    subphone: {
        require: true,
        type: String
    },
    subId: {
        require: true,
        type: String
    },



})
// mongoose.model(集合名称，model)
module.exports = mongoose.model('subequi', subequiModel)