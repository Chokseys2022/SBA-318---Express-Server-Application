//UTILITIES ERROR.JS

// Function to create a custom error object with a specified status code and message
function error(status, msg) {
  let err = new Error(msg); // Create a new Error object with the given message
  err.status = status; // Set the status property of the error object to the specified status code
  return err; // Return the error object
}

module.exports = error; // Export the error function for use in other modules

//----------------------------END CODE-------------------------------------//


