const mongoose = require('mongoose')

const equipmentModel = mongoose.Schema({
    equipmentName: {
        require: true,
        type: String
    },
    equipmentAmount: {
        require: true,
        type: String
    },
    equipmentstyle: {
        require: true,
        type: String
    },
    equipmentuse: {
        // require: true,
        type: String
    },
    equipmentspecification: {
        require: true,
        type: String
    },
    equipmentIntroduce: {
        // require: true,
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

module.exports = mongoose.model('Equipment', equipmentModel)