const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const studentSchema = mongoose.Schema({
  email: {type: String, required: true, unique: true},
  regNumber: {type: String, required: true, unique: true},
  imagePath: {type: String, required: true, unique: true},  
  rfidTag: {type: String, required: true, unique: true}
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Student', studentSchema);