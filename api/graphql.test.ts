import { root } from "./graphql";
jest.mock('./controllers/users');
jest.mock('./controllers/sessions');

describe('Returns correct value',()=>{
  test('test',()=>{
    expect(root.test()).toStrictEqual(true);
  })
})

describe('Calls correct controller functions',()=>{
  test('createUser',async ()=>{
    let result: any = await root.createUser({email: 'test', password: 'test'});
    expect(result.success).toBeTruthy()
    expect(result.payload).toBe('test')
  })
  test('login', async ()=>{
    let result: any = await root.login({email: 'test', password: 'test'})
    expect(result.success).toBeTruthy()
    expect(result.payload).toBe('test')
  })
  test('authorize',async ()=>{
    let result: any = await root.authorize({session: 'test'})
    expect(result.success).toBeTruthy();
  })
})