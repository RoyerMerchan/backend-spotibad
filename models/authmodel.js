const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  username: {type: String,  require: true, unique: true},
  email: {type: String,  require: true, unique: true},
  password: {type: String,  require: true}, 
  autor: {type: Boolean, require: true}
});

userSchema.pre('save' , async function(next){
  if(this.isModified('password')){    
  this.password = await bcrypt.hash(this.password, 10);
} next();
})

userSchema.set('toJSON',{
  transform: (document, returnedObject) =>
      {
          returnedObject.id = returnedObject._id
          .toString();
          delete returnedObject._id
          delete returnedObject.__v;
          delete returnedObject.password
      },
})

module.exports = mongoose.model('User', userSchema);