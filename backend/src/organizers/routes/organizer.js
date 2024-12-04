const express= require('express')
const Organizer = require('../models/organizer')
const { validateToken } = require('../../services/authentication')
 
const router=express.Router()

router.post('/signup',async (req,res) =>{

    const {
        name,
        contact,
        email,
        password

    } = req.body
   
    console.log(req.body)

     
    try {
        const org=await Organizer.create({name,email,contact,password}) 
        console.log(org)
        return res.status(200).json({message:'successfully registered'})
    } catch (error) {
        console.log(error)
        return res.status(400).json({message:'error in creating account'})
    }
      
})

router.get('/',async(req,res)=>{
   
    try {
        const allOrg = await Organizer.find({})
        return res.json(allOrg)
    } catch (error) {
        return res.status(400).json(error,{msg:" no org found"})
    }

})

router.get('/:orgid', async (req, res) => {
    try {
        console.log("Received orgid:", req.params.orgid);
         const orgId =req.params.orgid[0] !== ':' ?req.params.orgid : req.params.orgid.split(':')[1];
        console.log('orgdds',orgId)

        
        let org = await Organizer.findById(orgId);
        if (!org) {
            console.log('hehehe')
            return res.status(404).json({ message: "Organization not found" });
        }
        org={...org.toObject(),password:null,salt:null}
        console.log(org)

        return res.json(org);
    } catch (error) {
        console.error("Error finding organization:", error);
        return res.status(500).json({ message: "Server error" });
    }
});

router.post('/signin',async(req,res)=>{

    const {email,password}=req.body
    console.log('signin',req.body)
    try {
        const token = await Organizer.matchPassword(email,password)
        const payload=validateToken(token)
         
        return res.json({...payload,password:password,salt:null,token})
    } catch (error) {
        return res.status(400).json({message:'User Not Found'});
    }
})

module.exports= router