const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Cube = require('./cube');
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please enter a username"],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
});

userSchema.post('save', function(doc, next) {
  console.log('New user was created and saved', doc);
  next();
}) 

userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next();
})

const User = mongoose.model('user', userSchema);

module.exports = User;






