import User from '../models/user';
import validator from 'validator';
import { sha256, randomString } from '../util/encryptor';

// Creates a new user with the given fields
export const createUser = async (email: string, password: string) => {
  // Check for valid fields
  if(!validator.isEmail(email) || password.length<5){
    return {success: false, error: "Invalid Credentials", code: "INVALID_CREDENTIALS"};
  }

  //Check if email already exists
  let user = await getUserByEmail(email);
  if(user===false){
    return {success: false, error: "Database error. Please try again.", code: "DATABASE_ERROR"};
  }
  if(user){
    return {success: false, error: "Email already in use", code: "EMAIL_IN_USE"};
  }
  // Create hashed and salted password
  let salt = randomString(32);
  let saltedPassword = sha256(`${salt}${password}`);
  try{
    await User.create({email,password: saltedPassword,salt});
  }catch(err){
    console.log(err);
    return {success: false, error: "Database error. Please try again.", code: "DATABASE_ERROR"}
  }
  return {success: true};
}

export const getUserByEmail = async (email: string) => {
  try{
    let user = await User.findOne({email});
    return user;
  }catch(err){
    console.log(err);
    return false
  }
}

export const getUserById = async (id: string) => {
  try{
    let user = await User.findOne({_id: id});
    return user;
  }catch(err){
    console.log(err);
    return false
  }
}