const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = Shop = mongoose.model('shop', ShopSchema)