const User = require('../models/user');
const {sendEmail} = require('./email');
const crypto = require('crypto');
require('dotenv').config();


exports.accountActivation = async (req, res, next) => {
    // get the user from email based on email
    const userEmail = req.body.email;

    const user = await User.findOne({ email: userEmail});
    if (!user) {
        res.status(404).json({ message: "no user with provided email"})

    }
    console.log(`the user with the email ${userEmail} has been found and called, ${user.firstName}`)

    // generate token to be sent to user email
    const accountActivationToken =  user.createAccountActivationToken();

    
    // this will save the reset token for the user in the database
    await user.save({validateBeforeSave: false})

    // send the token back to the user email
    const activationUrl = `${req.protocol}://${req.get('host')}/users/activation/${accountActivationToken}`
    const message = `You have received this email beacuse of your request to create account at  POLARIS. please use the below link to activate your account \n\n${activationUrl}`
   
   try {
   
    await sendEmail({
        email: user.email,
        subject: 'Account Activation',
        message: message
    })
    console.log('email successfully sent')

    res.render("account_created")
   } catch(error){
    // if the promise to send email is rejected set token and token expire time to undefined
    user.accountActivationToken = undefined,
    user.accountActivationTokenExpires = undefined,
    user.save({validateBeforeSave: false})
    console.log(error)
    
    return error;
   }

    

}
