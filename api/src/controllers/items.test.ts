import Item from "../models/item";
import { listItems,getItem,createItem, listAllItems } from './items';
jest.mock('../models/item');

describe('Calls database models',()=>{
  test('listItems',async ()=>{
    const mock = jest.spyOn(Item,'find')
    await listItems(0);
    expect(mock).toHaveBeenCalled();
    mock.mockRestore()
  })
  test('listAllItems',async ()=>{
    const mock = jest.spyOn(Item,'find')
    await listAllItems();
    expect(mock).toHaveBeenCalled();
    mock.mockRestore()
  })
  test('createItem no _id',async ()=>{
    const mock = jest.spyOn(Item,'create')
    await createItem('','test','test','test',1,'test');
    expect(mock).toHaveBeenCalled();
    mock.mockRestore()
  })
  test('createItem provided _id',async ()=>{
    const mock = jest.spyOn(Item,'findByIdAndUpdate')
    await createItem('abcd','test','test','test',1,'test');
    expect(mock).toHaveBeenCalled();
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
  test('listAllItems', async ()=>{
    jest.spyOn(Item,'find')
    .mockImplementation(()=>{throw 'err'})
    let result = await listAllItems();
    expect(result).toStrictEqual([]);
  })
  test('createItem no _id', async ()=>{
    jest.spyOn(Item,'create')
    .mockImplementation(()=>{throw 'err'})
    let result = await createItem('','test','test','test',1,'test');
    expect(result.success).toStrictEqual(false);
  })
  test('createItem provided _id', async ()=>{
    jest.spyOn(Item,'findByIdAndUpdate')
    .mockImplementation(()=>{throw 'err'})
    let result = await createItem('abcd','test','test','test',1,'test');
    expect(result.success).toStrictEqual(false);
  })
  test('getItem', async ()=>{
    jest.spyOn(Item,'findOne')
    .mockImplementation(()=>{throw 'err'})
    let result = await getItem('abcd');
    expect(result).toStrictEqual(false);
  })
})