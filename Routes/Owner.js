const router=require('express').Router();
const Owner = require('../models/Owner')
const Orders = require('../models/Orders')
const Products = require('../models/Products')
const jwt = require('jsonwebtoken');
const {validateToken} = require('../middleware/OwnerAuth');

//Register Owner
router.post('/register', async (req, res) => {
    const owner = new Owner(req.body);
    const username = await Owner.findOne({"username":req.body.username})
    if(!username){
        await owner.save();
        res.send("Success") 
    }else{
        res.send("User Name Already Taken");
    }
})

//Login Owner
router.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const login = await Owner.findOne({"username": username, "password":password});
    if(login){
        const accessToken = jwt.sign({_id: login._id}, "infowareownerauthentication");
        res.json(accessToken); 
    }else{
        res.send("Error");
    }
})


//Add New Products
router.post('/add', validateToken, async (req, res) => {
    const products = new Products(req.body);
    if(products){
        await products.save();
        res.send("Success")
    }else{
        res.send("Error");
    }
})

//Show All Orders
router.get('/orders', validateToken, async (req, res) => {
    const orders = await Orders.find();
    res.send(orders)
})

module.exports=router;