const mongoose = require('mongoose')
const { Schema } = mongoose

const schema = new Schema({
    itemID: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    daysOfWeek: {
        type: Array,
        required: true,
    }
})

const name = "class_item"
module.exports = mongoose.models[name] || mongoose.model(name, schema)