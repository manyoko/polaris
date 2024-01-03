const validator = require('validator');
const User = require('../models/user')

const validateUser = async function (email, firstName, lastName, password) {
    const errors = {};
  
    // Validate presence of required fields
    if (!email || !password) {
      throw new Error('All fields are required');
    }

    if (!firstName || !lastName) {
      throw new Error('Name fields must be filled appropriately');
    }
  
    // Concurrent validation using Promise.all
    const [emailErrors, passwordErrors, namesErrors] = await Promise.all([
      validateEmail(email),
      validatePassword(password),
      validateNames(firstName, lastName),
    ]);
  

    // Organize errors by field and add field names to messages
    Object.entries(namesErrors).forEach(([field, fieldErrors]) => {
      errors[field] = fieldErrors.localeCompare(error => `${field}: ${error}`);

    })
    
    errors.email = emailErrors;
    errors.password = passwordErrors;
    
    // Check for any errors and return standardized object
    const totalErrors = Object.values(errors).flat();
    if (totalErrors.length > 0) {
      console.log(errors)
      throw new Error('Validation errors', { errors: totalErrors });
      
    
    }

      // Database logic moved outside of the validation function
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User with that email already exists.');
    }
  
    }
  
    
    // Process valid user data
  
  
  function validateEmail(email) {
    //const gmailRegex = / ^[a-zA-Z0-9._-]+@gmail.com$/; 
    if (!validator.isEmail(email)) {
    //if (!gmailRegex.test(email)) {
      return ['Invalid email address'];
    }
    return [];
  }
  
  function validatePassword(password) {
    if (!validator.isStrongPassword(password)) {
      return ['Password must be at least 6 characters long and contain a mix of uppercase, lowercase, numbers, and symbols'];
    }
    return [];
  }
  
  function validateNames(firstName, lastName) {
    const errors = [];
    if (!validator.isAlpha(firstName)) {
      errors.push('First and last names must contain only letters');
    }
   
    return errors;
  }
  
  const handleValidationError = function (res, error) {
   
  console.error('Validaton Error:', error.message)
    return res.status(400).json({
      status: 'error',
      message: 'Validation error',
      
    });
  };
  
  module.exports = { validateUser, handleValidationError };
  
  