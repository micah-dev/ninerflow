const mongoose = require('mongoose')
const { Schema } = mongoose

const schema = new Schema({
    userID: {
        type: String,
        required: true
    },
    enable_class_list: {
        type: Boolean,
        required: true,
    },
    enable_todo_list: {
        type: Boolean,
        required: true,
    },
    enable_weather: {
        type: Boolean,
        required: true,
    },
    enable_news: {
        type: Boolean,
        required: true,
    },
})

const name = "brief_item"
module.exports = mongoose.models[name] || mongoose.model(name, schema)