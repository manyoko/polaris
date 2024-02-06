const validator = require('validator');
const User = require('../models/user');
const { body, validationResult } = require('express-validator');

const validateUserPasswordAfterReset = async (req, res) => {
    try {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        return res.status(400).json({errors: errorMessages });
      }
  
      const { password } = req.body;
  
      // Additional validation using the validator package (optional)
      if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ errors: ['Password must meet complexity requirements'] });
      }
  
      
  
      return res.json({ message: 'Password is strong as fuck' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
    
    
  

 
const handleValidationError = function (res, error) {
   
  console.error('Validaton Error:', error.message)
    return res.status(506).json({
      status: 'error',
      message: 'Validation error',
      
    });
  };
  

  module.exports = { validateUserPasswordAfterReset, handleValidationError };