const mongoose = require("mongoose")
const jwt = require ("jsonwebtoken")

const MarkSchema = new mongoose.Schema({
    email:  {
        type: String,
        required: true,
        ref: "users"
    },
    S1: {
        type: Number,
        required: true
    },
    S2: {
        type: Number,
        required: true
    },
    S3: {
        type: Number,
        required: true
    },
})

const MarkModel = mongoose.model("data",MarkSchema)

module.exports = MarkModel
