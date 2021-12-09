const mongoose = require('mongoose')
const { Schema } = mongoose

const schema = new Schema({
    userID: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: Date,
        required: true,
    }
})

const name = "test_item"
module.exports = mongoose.models[name] || mongoose.model(name, schema)