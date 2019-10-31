const mongoose = require('mongoose')
var Schema = mongoose.Schema
const ProductSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    name: {
        type: String
    },
    price: Number,
    image: String
})

module.exports = mongoose.model('Product', ProductSchema)
