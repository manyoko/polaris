const User = require('../models/user');
const {sendEmail} = require('./email');
const crypto = require('crypto');
require('dotenv').config();
const { validateUserPasswordAfterReset, handleValidationError } = require('./validateUserPasswordafterReset1')

exports.forgotPassword = async (req, res, next) => {
    // get the user from email based on email
    const userEmail = req.body.userEmail;
    console.log(userEmail)

    const user = await User.findOne({ email: userEmail});
    if (!user) {
        res.status(404).json({ message: "no user with provided email"})

    }
    console.log(`the user with the email ${userEmail} has been found and called, ${user.firstName}`)

    // generate token to be sent to user email
    const resetToken =  user.createResetPasswordToken();

    
    // this will save the reset token for the user in the database
    await user.save({validateBeforeSave: false})

    // send the token back to the user email
    const resetUrl = `${req.protocol}://${req.get('host')}/api/users/recoverPassword/${resetToken}`
    const message = `we have received a request to recover password. please use the below link to reset passsword \n\n${resetUrl}`
   
   try {
   
    await sendEmail({
        email: user.email,
        subject: 'password reset',
        message: message
    })
    console.log('email successfully sent')

    return res.status(201).json({ message: `password reset token successfully sent to: ${user.email} `})
   } catch(error){
    // if the promise to send email is rejected set token and token expire time to undefined
    user.passwordResetToken = undefined,
    user.passwordResetTokenExpires = undefined,
    user.save({validateBeforeSave: false})
    console.log(error)
    
    return error;
   }

    

}

exports.passwordReset = 
    async (req, res, next) => {
        try {
        // validate user password
        
        validateUserPasswordAfterReset(req, res)

        const token = crypto.createHash('sha256').update(req.params.token).digest('hex')
        const user = await User.findOne({
            passwordResetToken: token, passwordResetTokenExpires : {$gt: Date.now()}
        })
        
        if (!user) {
         return res.status(404).json( { message: 'password reset token has expired'})
        }
    
    //change user password and set token and token expiring time to undefined  
    user.password = req.body.password; 
   
    userPasswordResetToken = undefined;
    userPasswordResetTokenExpires = undefined;
    
    user.save()

    // automatically log in the user
    req.body.session = user

    return res.status(201).json( { message: 'password has been successfully recovered'})




    }catch(error) {
        handleValidationError(res, error)

}
}
