const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');  //npm install --save mongoose-unique-validator


const tagSchema = mongoose.Schema({
  rfid: {type: String, required: true, unique: true}, 
  isAssigned: {type: Boolean, required: true},
  isActive: {type: Boolean, required: true}
});

tagSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Tag', tagSchema);