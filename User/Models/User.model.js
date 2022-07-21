const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    phone:{
        type: String,
        unique: true,
        trim: true,
        validate: [/^\d{10}$/, 'Please provide a valid phone number.'],
        required: [true, 'Phone number is required.'],
    },
    email: {
        type: String,
        required:[true, 'Email is required'],
        unique: true,
    },
    role: {
        type: String,
        lowercase:true,
        trim:true,
        required:[true, 'Role is required'],
        enum:[ 'admin', 'customer' ]
    },
    password:{
        type: String,
        required: [true, 'Password is required']
    },
    state:{
        type: String,
    },
    city:{
        type: String,
    },
    house:{
        type: String,
    },
    pincode: {
        type: Number,
    }, 
    otpCode:{
        type: Number,
        default: null
    },
    token:{
        type:String
    }
},
{
    timestamps: true
})
const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;