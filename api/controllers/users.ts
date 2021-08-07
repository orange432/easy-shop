import User from '../models/user';
import validator from 'validator';
import { sha256, randomString } from '../util/encryptor';

export const createUser = async (email: string, password: string) => {
  if(!validator.isEmail(email) || password.length<5){
    return {success: false, error: "Invalid Credentials", code: "INVALID_CREDENTIALS"};
  }
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