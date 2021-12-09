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
    dueDate: {
        type: String,
        required: true,
    },
    dueTime: {
        type: String,
        required: true,
    },
})

const name = "todo_item"
module.exports = mongoose.models[name] || mongoose.model(name, schema)