import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  email: String,
  password: String,
  salt: String,
  role: {type: String, default: 'user'}
})

const User = mongoose.model('user', schema);

export default User