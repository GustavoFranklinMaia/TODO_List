const mongoose = require('mongoose');

// Definir os schemas + modelos
const UserSchema = { 
  userName: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String
};

module.exports = mongoose.model('users', UserSchema);