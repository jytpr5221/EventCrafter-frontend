const mongoose = require('mongoose');
const crypto = require('crypto');  
const {createTokenForUser,validateToken}=require('../../services/authentication.js')
const OrganizerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: Number,
        required: true,
         
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String
    },
   created:[

    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Events'
    }
   ],
    type:{
        type:String,
        default:'organizer'
    }
});

OrganizerSchema.pre('save', function(next) {
    const user = this;

    if (!user.isModified('password')) return next();

    const salt = crypto.randomBytes(16).toString('hex'); 
    const hashedPassword = crypto.createHmac('sha256', salt).update(user.password).digest('hex');
    user.salt = salt;
    user.password = hashedPassword;

    next();
});

OrganizerSchema.static('matchPassword', async function(email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error('User not found');

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedPassword = crypto.createHmac('sha256', salt).update(password).digest('hex');

    if (hashedPassword !== userProvidedPassword) throw new Error('Password incorrect');
    console.log('matchpassword',user)
    const token = createTokenForUser(user);
    console.log('token',token)
    
    return token;
});

const Organizer = mongoose.model('Organizer', OrganizerSchema);

module.exports = Organizer;
