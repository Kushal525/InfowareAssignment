const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price:{
        type: Number,
        required: true,
        }

})

const Products = mongoose.model('Products', productsSchema)

module.exports = Products;
