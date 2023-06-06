const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    fulfilled: {
        type: Boolean,
        required: true,
        default: false
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    added_date: {
        type: Date,
        required: true
    },
    shop: [String],
    fulfilled_date: Date
})

module.exports = Item = mongoose.model('item', ItemSchema)