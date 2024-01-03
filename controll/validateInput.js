// the fuction perform validation for order placing
const ValidateInput = async function validateInput(customerId, items, shippingDetails) {
    try {
      // Example: Check if customerId is valid
      if (!isValidCustomerId(customerId)) {
        throw new Error('Invalid customer ID');
      }
  
      // Example: Check if items array is not empty
      if (!items || items.length === 0) {
        throw new Error('Items list is empty');
      }
  
      // Example: Validate shipping details
      validateShippingDetails(shippingDetails);
  
      // All validation passed, return true or any desired response
      return true;
    } catch (error) {
      // Catch and handle validation errors
      console.error('Validation Error:', error.message);
      throw error; // Rethrow the error to indicate validation failure
    }
  }
  
  function isValidCustomerId(customerId) {
    // logic to validate customer ID
    // check if it's a non-empty string or follows a certain pattern
   return typeof customerId === 'string' && customerId.trim() !== '';
    // return typeof customerId === 'object';
  }
  
  function validateShippingDetails(shippingDetails) {
    // logic to validate shipping details
    // check if all required fields are present
    if (!shippingDetails || !shippingDetails.address.street || !shippingDetails.address.district) {
      throw new Error('Invalid shipping details');
    }
  }
  
  module.exports = ValidateInput;