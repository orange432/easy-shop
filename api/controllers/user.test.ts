import User from '../models/user';
import { createUser } from './users';
jest.mock('../models/user');

describe('Calls database models',()=>{
  test('createUser',async ()=>{
    const mock = jest.spyOn(User,'create');
    await createUser('test@test.com','testpassword');
    expect(mock).toBeCalled();
    mock.mockRestore();
  })
})