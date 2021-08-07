import {sha256, randomString} from './encryptor';

describe('Basic Functionality test',()=>{
  test('sha256',()=>{
    expect(sha256('test')).toBe('n4bQgYhMfWWaL+qgxVrQFaO/TxsrC4Is0V1sFbDwCgg=');
  })
  test('randomString',()=>{
    expect(randomString(32).length).toBe(32);
  })
})