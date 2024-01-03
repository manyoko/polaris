const User = require('../models/user');
const app = require('express');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const userRouter = app.Router();
const { validateUser, handleValidationError }= require('../controll/validateUser')
const { forgotPassword, passwordReset } = require('../controll/accountRecovery'); 






// route to create new user
// Route to add a new pharmaceutical product to database
userRouter.post('/create', async (req, res) => {
    try {
         // exctract user details from the request body
         const { email, firstName, lastName, password} = req.body;
         
   
         
         // validate user inputs
        await validateUser(email, firstName, lastName, password);
        console.log(email, firstName, lastName, password);
         

         // hashing the password
         //const hashedPassword = await bcrypt.hash(password, 10);
         //console.log(hashedPassword);

         // Create a new user instance using the schema
        const newUser = new User({
            firstName, 
            lastName, 
            email, 
            password
          
         }) 
         // save the user to the mongoDb database
         const saveUser = await newUser.save()
        // a success response
        res.status(201).json({ message: `${newUser.firstName} added successfully` });
      } catch (error) {
        // handle error and send an error response
       handleValidationError(res, error);
       //console.log(error.message);
       // res.status(500).json({ message: 'Internal Server Error' }) 
      }
  
});

// a login route
userRouter.post('/login', async (req, res) => {
    try{
        const { email, password} = req.body;
        const user = await User.findOne({email});
        console.log(user)
        if (!user) {
            return res.status(401).json({ message: 'Email or password is incorrect'});
        }
       const isMatch = await bcrypt.compare(password, user.password);
       console.log(isMatch)
       
        if(!isMatch) {
           return res.status(401).json({ message: 'password is incorrect'});
       }

       if (isMatch) {
        req.session.user = user;
        //res.json({ message: "login successfully" });
       }
        //const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {expiresIn: '2h'});
         
       // res.cookie("jwt", token, {
       //     httpOnly: true
       // });


    res.status(201).json({ message: "User successfully logged in", user: user._id});
    } catch (error) {
       // console.error(error);
        res.status(500).send('Error logging in');
    }
})

// route to handle logout
//userRouter.post('/logout', async (req, res) => {
//    const token = req.cookies.jwt;  // get token from cookie
//    try {
//        const decoded = jwt.verify(token, jwt)
//    } catch (error) {
  //      console.error(error);
   // }
//})

// route to handle logout
userRouter.post('/logout', async (req, res) => {
    
    try {
        // Destroy the session
        req.session.destroy( err => {
            if (err) {
                console.error('Error destroying session', err);
                res.sendStatus(500);
            } else {
               // res.redirect('/login') // redirect to a login page
               res.status(200).json({ message: "Logout successfully" })
            }
            
        })
    } catch (error) {
        console.error(error);
    }
})



// A route to update user role
userRouter.put('/role/update', async (req, res) => {
    
        const {role, id} = req.body;
        console.log(req.body);
        // verifying if the role and the id are present
        if (role && id) {
            if (role === "admin") {
                await User.findById(id)
                 .then((user) => {
                    // verifies if the user is not admin
                    if (user.role !== "admin") {
                        user.role = role;
                        user.save()
                        res.status(200).json({ message: "user successfully set to admin" });
                    } else {
                        res.status(400).json({ message: "user is already admin" });
                    }
                 }).catch( error => { res.status(400).json({ message: "An error occured", error: error.message })} )
            } else {
                res.status(400).json({ message: "Role is not admin",})
            }
        } else{
            res.status(400).json({message: "Role or Id not present"})
        }
    
});

// A route to delete user
userRouter.delete('/delete/', async (req, res) => {
    const { id } = req.body;
    try {
        const deletedUser = await User.deleteOne({ _id: id});
        if (deletedUser.deletedCount === 1) {
            res.status(201).json({ message: "User successfully deleted", user: deletedUser });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "An error occured", error: error.message })
    }

});

// a route to handle recovery  link
 userRouter.post('/forgotpassword/', (req, res) => {
    // call the function to generate token for user's account recovery
    forgotPassword(req, res)

    // validate token and render password reset form
 })

 // a router for saving new password for user
 userRouter.post('/recoverPassword/:token', (req, res) => {
    const recoveryToken = req.params.token;
    const newpassword = req.body.newPassword;

    // update user password in the database


    // redirect to a login page
 })
module.exports = userRouter;
