import { root } from "./graphql";
import {listItems, getItem} from './controllers/items';
import {createUser} from './controllers/users';
import {login} from './controllers/sessions'
jest.mock('./controllers/users');
jest.mock('./controllers/sessions');
jest.mock('./controllers/items')

describe('Returns correct value',()=>{
  test('test',()=>{
    expect(root.test()).toStrictEqual(true);
  })
})

describe('Calls correct controller functions',()=>{
  test('CreateUser',async ()=>{
    let result: any = await root.CreateUser({email: 'test', password: 'test'});
    expect(result).toStrictEqual(createUser('test','test'))
  })
  test('Login', async ()=>{
    let result: any = await root.Login({email: 'test', password: 'test'})
    expect(result).toStrictEqual(login('test','test'))
  })
  test('Authorize',async ()=>{
    let result: any = await root.Authorize({session: 'test'})
    expect(result.success).toStrictEqual(true)
    expect(result.email).toBe('test');
    expect(result.role).toBe('test');
  })
  test('ListItems',async ()=>{
    let result: any = await root.ListItems({page: 0});
    expect(result).toStrictEqual(listItems(0))
  })
  test('GetItem',async ()=>{
    let result: any = await root.GetItem({_id: 'test'});
    expect(result).toStrictEqual(getItem('test'));
  })
})