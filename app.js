const express = require("express");
require('./db/connection')
const app = express();
const usersRouter = require('./Routes/Users');
const ownerRouter = require('./Routes/Owner');

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));

const port = process.env.PORT || 3001

app.use('/users',usersRouter);
app.use('/owner',ownerRouter);

app.listen(port, ()=>{
    console.log(`Server running on ${port}`)
});