import { root } from "./graphql";

describe('Returns correct value',()=>{
  test('test',()=>{
    expect(root.test()).toStrictEqual(true);
  })
})