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
        default: 1
    },
    shop: [String],
    added_date: Date,
    fulfilled_date: Date
    
})

module.exports = Item = mongoose.model('item', ItemSchema)