const mongoose = require('mongoose')

const crypto = require('crypto');  
const { createTokenForUser } = require('../../services/authentication');
const CustomerSchema=new mongoose.Schema({
   
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

    registeredIn: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        }
    ],
    type:{
        type:String,
        default:'customer'
    }
    
})

CustomerSchema.pre('save', function(next) {
    const user = this;

    if (!user.isModified('password')) return next();

    const salt = crypto.randomBytes(16).toString('hex'); 
    const hashedPassword = crypto.createHmac('sha256', salt).update(user.password).digest('hex');
    user.salt = salt;
    user.password = hashedPassword;

    next();
});


CustomerSchema.static('matchPassword', async function(email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error('User not found');

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedPassword = crypto.createHmac('sha256', salt).update(password).digest('hex');

    if (hashedPassword !== userProvidedPassword) throw new Error('Password incorrect');
    console.log('matchpassword',user)
    const token=createTokenForUser(user)
    return token;
});

const Customer = mongoose.model('customer', CustomerSchema);

module.exports = Customer;