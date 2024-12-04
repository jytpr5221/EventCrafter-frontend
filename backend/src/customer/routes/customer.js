const express=require('express')
const { validateToken } = require('../../services/authentication.js')
const router=express.Router()
const Customer=require('../models/customer.js')
  
router.post('/signup',async(req,res)=>{
    
    console.log('body',req.body)
    const {
        name, 
        contact,
        email,
        password

    } = req.body
   
    try {
        const existingCustomer = await Customer.findOne({ email: email });
        if (existingCustomer) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const customer=await Customer.create({name,email,contact,password})
        return res.json(customer)
    } catch (error) {
        return res.status(400).json(error)
    }
})

router.get('/',async (req,res)=>{

    try {
        const customers=await Customer.find({})
        return res.json(customers)
    } catch (error) {
        return res.json({error:'no customer found'})
    }
})

router.get('/:userid',async(req,res)=>{
   
    try {
        const allCustomer = await Customer.find(req.params.userid)
        res.json(allCustomer)
    } catch (error) {
        return res.status(400).json({error:"userid not found"})
    }

})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    console.log('signin', req.body);
    try {
        const token = await Customer.matchPassword(email, password);
        const payload = validateToken(token);
        const customer = await Customer.findOne({ email }) 
        console.log(payload);
        return res.json({ ...customer,  password: null, salt: null,token });
    } catch (error) {
        return res.status(400).json({message:'User Not Found'});
    }
});


module.exports= router