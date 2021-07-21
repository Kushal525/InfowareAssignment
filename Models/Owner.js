const mongoose = require('mongoose')
const ownerSchema = new mongoose.Schema({
    username:{
        unique:true,
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required : true
    }
})

const Owner = mongoose.model('Owner', ownerSchema)
module.exports = Owner;
