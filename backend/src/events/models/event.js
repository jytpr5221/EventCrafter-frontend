const mongoose= require('mongoose')
const Organizer=require('../../organizers/models/organizer.js')

const EventSchema=new mongoose.Schema({

    title:{

        type:String,
        required:true
    },
    type:{

        type:String,
        required:true
    },
    createdOn:{

        type:Date,
        default:Date.now,
        required:true
    },
    availableTickets:{
        type:Number,
        required:true
    },
    eventDate:{
        type:Date,
        required:true
    },
    ticketsClosedOn:{
        type:Date,
        required:true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organizer', 
        required: true
    },
    registeredBy:
        [
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Customer'
            } 
             

        ]
    
})


const Event=mongoose.model('event',EventSchema)

module.exports=Event