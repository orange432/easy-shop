import {createHash} from 'crypto';

// returns a sha256 hash of the input
export const sha256 = (input: string) => {
  return createHash('sha256').update(input).digest('base64');
}


// Generates a random string
export const randomString = (length: number) => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
  const charsLength = chars.length;
  let out='';
  for(let i=0;i<length;i++){
    out+=chars[Math.floor(Math.random()*charsLength)];
  }
  return out;
}