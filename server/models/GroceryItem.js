const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    fulfilled: {
        type: Boolean,
        required: true,
    },
    shop: [String],
    added_date: Date,
    fulfilled_date: Date,
    quantity: Number
})

module.exports = Item = mongoose.model('item', ItemSchema)