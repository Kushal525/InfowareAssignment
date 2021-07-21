const mongoose = require('mongoose')
require('dotenv').config()

const URI = process.env.URI;
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
},
console.log("DataBase Connected")
)