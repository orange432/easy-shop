import User from '../models/user';
import Session from '../models/session';
import { getUserById } from './users';
import { sha256 } from '../util/encryptor';
import {v4 as uuidv4} from 'uuid';
const SESSION_EXPIRY = 30*60;

// Creates a session for the given user id
export const createSession = async (user_id: string) => {
  let session = uuidv4();
  let result;
  
  // Check if UUID already exists (should never happen)
  try{
    result = await Session.get(`sess:${session}`);
  }catch(err){
    return {success: false, error: "Database error, please try again", code: "DATABASE_ERROR"}
  }
  if(result){
    return {success: false, error: "Session generation error error, please try again", code: "UUID_ERROR"}
  }

  // No match add to redis
  Session.set(`sess:${session}`,JSON.stringify({user_id}),'EX',SESSION_EXPIRY)
  return {success: true, payload: session};
}

// Checks a users credentials then returns a session id if valid
export const login = async (email: string, password: string) => {
  let user;
  try{
    user = await User.findOne({email}); 
  }catch(err){
    console.log(err);
    return {success: false, error: "Database error, please try again", code: "DATABASE_ERROR"}
  }
  // Check details
  if(!user || user.password!==sha256(`${user.salt}${password}`)){
    return {success: false, error: "Invalid username/password combination", code: "WRONG_CREDENTIALS"}
  }

  // User is valid, create session
  let session = await createSession(user._id);
  return session;
}

// Makes sure the user session exists.  Returns the users id if it does.
export const authorizeSession = async (session_id: string) => {
  let session;
  try{
    session = await Session.get(`sess:${session_id}`);
  }catch(err){
    console.log(err);
    return {success: false, error: "Database error, please try again", code: "DATABASE_ERROR"}
  }
  if(!session){
    return {success: false, error: "Session invalid or expired", code: "INVALID_SESSION"};
  }
  // Details valid, insert user details:
  let {user_id} = JSON.parse(session);
  let user;
  try{
    user = await getUserById(user_id);
  }catch(err){
    console.log(err);
    return {success: false, error: "Database error, please try again", code: "DATABASE_ERROR"}
  }
  return {success: true, payload: user};
}