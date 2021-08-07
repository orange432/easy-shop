import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  email: String,
  password: String,
  salt: String,
})

const User = mongoose.model('user', schema);

export default User