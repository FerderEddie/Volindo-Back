const mongoose = require("mongoose")
const Schema = mongoose.Schema


const fileSchema = new Schema({
    file: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        default:''
    }

})

module.exports = mongoose.model("files",fileSchema)