const nodemailer = require("nodemailer");
require('dotenv').config();

// create a function to send an email

 

exports.sendEmail = async (option) => {

    // create transporter for email
    console.log(process.env.EMAIL_HOST)
    const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io', //process.env.EMAIL_HOST,
    port: 25, //process.env.PORT,
    auth: {
        user: 'd651a1036f5b03', //process.env.EMAIL_USER,
        pass: '1c2e20a233b13a' //process.env.EMAIL_PASSWORD
     },

 })

    // define email options
    const emailOptions = {
        from: 'ManyokoTech support<manyokotech@gmail.com>',
        subject: option.subject,
        to: option.email,
        text: option.message
    }

    // send email
    await transporter.sendMail(emailOptions);
}


