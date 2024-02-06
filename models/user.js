const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const { isEmail} = require('validator');
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
       // validate: [isEmail, 'please enter a valid email']
    },
    password: String,
    salt: String,
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    organizationName: {
        type: String,
        required: true,
    },
    accountType: {
        type: String,
        required: true,
    }
    ,
    role: {
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer',
    },

  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}, 
  isActivated: { type: Boolean, default: false}, 
  passwordResetToken: String,
  accountActivationToken: String,
  passwordResetTokenExpires: Date,
  accountActivationTokenExpires: Date,


});

UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.salt = salt;
    next();
});


UserSchema.methods.createAccountActivationToken = function(){
    const activationToken = crypto.randomBytes(32).toString('hex');
    
    this.accountActivationToken = crypto.createHash('sha256').update(activationToken).digest('hex')
    this. accountActivationTokenExpires = Date.now() + 10 * 60 * 1000; 
    return activationToken
}

UserSchema.methods.createResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    this. passwordResetTokenExpires = Date.now() + 10 * 60 * 1000; 
    return resetToken
}
const User = mongoose.model('User', UserSchema);
module.exports = User;