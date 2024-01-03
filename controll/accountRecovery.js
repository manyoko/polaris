const User = require('../models/user');

exports.forgotPassword = async (req, res, next) => {
    // get the user from email based on email
    const userEmail = req.body.userEmail;

    const user = await User.findOne({ email: userEmail});
    if (!user) {
        res.status(404).json({ message: "no user with provided email"})

    }
    console.log(`the user with the email ${userEmail} has been found and called, ${user.firstName}`)

    // generate token to be sent to user email
    const resetToken =  user.createResetPasswordToken();

    console.log(`token for account recovery is ${resetToken}`)
    
    // this will save the reset token for the user in the database
    await user.save()
}

exports.passwordReset = (req, res, next) => {

}