const mongoose = require('mongoose')
const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
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
    },
    age:{
        type: Number,
    },
    address :{
        type: String,
        required : true
    }
})

const Users = mongoose.model('Users', usersSchema)

module.exports = Users;
