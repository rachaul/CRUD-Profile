const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    birth: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('User', profileSchema)