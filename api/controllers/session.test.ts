import User from '../models/user';
import Session from '../models/session';
import { createSession, login } from "./sessions";
jest.mock('../models/session');
jest.mock('../models/user');

describe('Calls database models',()=>{
  test('login',async ()=>{
    const mock = jest.spyOn(User,'findOne')
    await login('test','test');
    expect(mock).toBeCalled();
    mock.mockRestore()
  })
  test('createSession',async ()=>{
    const mockGet = jest.spyOn(Session,'get')
    const mockSet = jest.spyOn(Session,'set')
    await createSession('test')
    expect(mockGet).toBeCalled();
    expect(mockSet).toBeCalled();
    mockGet.mockRestore();
    mockSet.mockRestore();
  })
})

describe('Returns success: false on error',()=>{
  test('login', async ()=>{
    jest.spyOn(User,'findOne')
      .mockImplementation(()=>{throw 'test'})
    let result = await login('test','test');
    expect(result.success).toStrictEqual(false);
  })
})