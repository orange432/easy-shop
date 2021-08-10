import User from '../models/user';
import { createUser, getUserByEmail,getUserById } from './users';
jest.mock('../models/user');

describe('Calls database models',()=>{
  test('createUser',async ()=>{
    const mockTwo = jest.spyOn(User,'findOne')
      .mockImplementation(()=>{return ''});
    const mock = jest.spyOn(User,'create');
    await createUser('test@test.com','testpassword');
    expect(mock).toBeCalled();
    expect(mockTwo).toBeCalled();
    mock.mockRestore();
  });
  test('getUserByEmail', async ()=>{
    const mock = jest.spyOn(User,'findOne');
    await getUserByEmail('test@test.com');
    expect(mock).toBeCalled();
    mock.mockRestore();
  })
  test('getUserById', async ()=>{
    const mock = jest.spyOn(User,'findOne');
    await getUserById('5ab32324');
    expect(mock).toBeCalled();
    mock.mockRestore();
  })
})

describe('Returns false on error', ()=>{
  test('createUser', async ()=>{
    jest.spyOn(User,'findOne').mockImplementation(()=>(''))
    jest.spyOn(User,'create')
      .mockImplementation(()=>{throw 'test'})
    let result = await createUser('test','test');
    expect(result.success).toStrictEqual(false);
  })
  test('getUserByEmail', async ()=>{
    jest.spyOn(User,'findOne')
      .mockImplementation(()=>{throw 'test'})
    let result = await getUserByEmail('test');
    expect(result).toStrictEqual(false);
  })
  test('getUserById', async ()=>{
    jest.spyOn(User,'findOne')
      .mockImplementation(()=>{throw 'test'})
    let result = await getUserById('test');
    expect(result).toStrictEqual(false);
  })
})