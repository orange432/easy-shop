import Item from "../models/item";
import { listItems,getItem,createItem } from './items';
jest.mock('../models/item');

describe('Calls database models',()=>{
  test('listItems',async ()=>{
    const mock = jest.spyOn(Item,'find')
    await listItems(0);
    expect(mock).toHaveBeenCalled();
    mock.mockRestore()
  })
  test('createItem',async ()=>{
    const mock = jest.spyOn(Item,'create')
    await createItem('test','test','test',1,'test');
    expect(mock).toBeCalled();
    mock.mockRestore()
  })
  test('getItem',async ()=>{
    const mock = jest.spyOn(Item,'findOne')
    await getItem('test');
    expect(mock).toHaveBeenCalled();
    mock.mockRestore()
  })
})

describe('Errors return false',()=>{
  test('listItems', async ()=>{
    jest.spyOn(Item,'find')
    .mockImplementation(()=>{throw 'err'})
    let result = await listItems(0);
    expect(result).toStrictEqual([]);
  })
  test('createItem', async ()=>{
    jest.spyOn(Item,'create')
    .mockImplementation(()=>{throw 'err'})
    let result = await createItem('test','test','test',1,'test');
    expect(result.success).toStrictEqual(false);
  })
  test('getItem', async ()=>{
    jest.spyOn(Item,'findOne')
    .mockImplementation(()=>{throw 'err'})
    let result = await getItem('abcd');
    expect(result).toStrictEqual(false);
  })
})