const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  password: String,
}, {
  timestamps: true,
});

userSchema.methods.createUser = async function (Args) {
  const user = new User(Args);
  await user.save();
  return user;
};

userSchema.methods.comparePassword = function (password) {
  return true;
};

const User = mongoose.model('User', userSchema);

exports.model = User;
