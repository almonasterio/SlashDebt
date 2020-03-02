const mongoose = require('mongoose')
const Schema = mongoose.Schema

const coasterSchema = new Schema({
    title: String,
    description: String,
    length: String,
    inversions: Number,
    imageUrl: String
}, {
    timestamps: true
})

const coasterModel = mongoose.model('Coaster', coasterSchema)
module.exports = coasterModel