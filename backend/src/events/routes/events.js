const express =require('express')
const Event = require('../models/event.js') 
const Organizer = require('../../organizers/models/organizer.js')
const Customer=require('../../customer/models/customer.js')
const { restrictToLoggedInUsers } = require('../../middlewares/middleware.js')
const router=express.Router()

router.post('/create-event',restrictToLoggedInUsers,async (req,res) =>{
 
   
    if (req.user === null) return res.status(400).json({error:'please signin/signup'})
     console.log(req.user,req.body)

    if(req.user.type === 'customer') return res.status(400).json({error:'customer can not create event'})
    const {
        title,
        type,
        availableTickets,
        eventDate,
        ticketsClosedOn,


    } = req.body

     
    try {
         const event=await Event.create({
            title,
            type,
            availableTickets,
            eventDate:new Date(eventDate),
            createdBy:req.user.id,
            ticketsClosedOn:new Date(ticketsClosedOn)
        })

        await Organizer.findByIdAndUpdate(
            req.user.id,
            {$push:{created:event.id}},
            {new:true}

        )
        return res.json({event,_message:'Event created successfully!'})
    } catch (error) {
        return res.json(error)
    }
    
    
})

router.get('/allEvents',async(req,res)=>{
   
    try {
    const allEvents = await Event.find({})
    res.json(allEvents)
   } catch (error) {
    return res.status(400).json({error:'no events found'})
   }

})

router.get('/:eventid',async(req,res)=>{

    try {
        const event= await Event.findById(req.params.eventid);
        return res.json(event)
    } catch (error) {
        return res.status(400).json({error:'no events '})
    }

})

router.post('/book-ticket/:eventid',restrictToLoggedInUsers,async(req,res)=>{
 

    if(req.user === null)return res.send('register or sign in') 
    try {
         
         if(req.user.type === 'organizer') return res.status(400).json({message:'customers only'})
            const event = await Event.findById(req.params.eventid)
          if (!event) {
             return res.status(404).json({ message: 'Event not found' })
         }
 
          
         const closed=new Date(event.ticketsClosedOn).getTime()
          
         if(Date.now() > closed) return res.status(400).json({message:'Registration closed now!'})
         
         if(event.availableTickets === 0) return res.status(400).json({message:'no tickets available'})

         if (event.registeredBy.includes(req.user.id)) {
             return res.status(400).json({ message: 'User already registered' })
         }

         
         event.registeredBy.push(req.user.id)
         event.availableTickets -= 1
         await event.save(); 
          
        const user=await Customer.findByIdAndUpdate(
            req.user.id,
            {$push:{registeredIn: req.params.eventid}},
            {new:true}
        )
         return res.json(user)


    } catch (error) {
        return res.status(400).json(error)
    }
})

module.exports= router