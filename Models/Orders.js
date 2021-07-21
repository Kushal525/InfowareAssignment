const mongoose = require('mongoose');
const users = require('./Users');
const products = require('./Products');

const ordersSchema = new mongoose.Schema({
    productsName: {
        type: [mongoose.Schema.Types.Array],
        ref: products,
      },
      price:{
          type: Number,
      },
    username: {
        type: mongoose.Schema.Types.String,
        ref: users,
      }

})

const Orders= mongoose.model('Orders', ordersSchema)

module.exports = Orders;