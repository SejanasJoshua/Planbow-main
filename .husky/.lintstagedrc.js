

  try {
    module.exports = {
      "src/**/*.js": ["npm run pre-commit"],
    };    
  } catch (error) {
    return error;
  }