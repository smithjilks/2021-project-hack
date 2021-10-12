const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const studentSchema = mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  regNumber: {type: String, required: true, unique: true},
  imagePath: {type: String, required: true, unique: true},  
  rfidTag: {type: String, required: true, unique: true}
});

studentSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Student', studentSchema);