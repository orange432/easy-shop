import User from '../models/user';
import Session from '../models/session';
import { createSession, login, authorizeSession } from "./sessions";
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
  test('authorizeSession',async ()=>{
    const mockGet = jest.spyOn(Session,'get')
    await authorizeSession('test')
    expect(mockGet).toBeCalled();
    mockGet.mockRestore();
  })
})

describe('On Returns success: false on error',()=>{
  test('login', async ()=>{
    jest.spyOn(User,'findOne')
      .mockImplementation(()=>{throw 'test'})
    let result = await login('test','test');
    expect(result.success).toStrictEqual(false);
  })
  test('createSession', async ()=>{
    jest.spyOn(Session,'get')
      .mockImplementation(()=>{return Promise.reject(new Error('test'))})
    let result = await createSession('test');
    expect(result.success).toStrictEqual(false);
  })
  test('authorizeSession', async ()=>{
    jest.spyOn(Session,'get')
      .mockImplementation(()=>{return Promise.reject(new Error('test'))})
    let result: any = await authorizeSession('test');
    expect(result.success).toStrictEqual(false);
  })
})
