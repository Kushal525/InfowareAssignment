const router=require('express').Router();
const Products = require('../models/Products');
const Users = require('../models/Users');
const Orders = require('../models/Orders');
const jwt = require('jsonwebtoken');
const {validateToken} = require('../middleware/UserAuth');

//Register User
router.post('/register', async (req, res) => {
    const users = new Users(req.body);
    const username = await Users.findOne({"username":req.body.username})
    if(!username){
        await users.save();
        res.send("Success") 
    }else{
        res.send("User Name Already Taken");
    }
})

//Login User
router.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const login = await Users.findOne({"username": username, "password":password});
    if(login){
        const accessToken = jwt.sign({_id: login._id}, "infowareuserauthentication");
        res.json(accessToken); 
    }else{
        res.send("Error");
    }
})

//Profile
router.get('/profile', validateToken, async (req, res) => {
    const user = await User.findOne({"_id":res.user_id})
    res.send(user)
})

//Add New Orders
router.post('/order', validateToken, async(req, res)=>{
    const products = req.body.products;
    const user_id = res.user_id;
    const user = await Users.findOne({"_id": user_id})
    const userName = user.username;
    const results = await Products.find({ "name": { $in: products}})
    let length = results.length;
    let price = 0;
    let i = 0;
    while(length>0){
        price = price + results[i].price 
        i=i+1
        length = length -1
    }
    const order = new Orders({"productsName":products,"price":price,"userName":userName})
    await order.save()
    res.send(order)
})

//Browse Product
router.post('/search', validateToken, async(req, res)=>{
    const name = req.body.name;
    const products = await Products.find({"name": { $regex : name}})
    res.send(products)
})

//View MyOrders
router.get('/myorders', validateToken, async (req, res)=>{
    const user = await Users.findOne({"_id":res.user_id})
    const orders = await Orders.find({"username":user.username})
    res.send(orders);
})

module.exports=router;