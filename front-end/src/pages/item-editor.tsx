import React, { useState, useEffect, useReducer, FormEvent } from 'react'
import styled from '@emotion/styled';
import { useAuth } from '../context/authContext';
import { APICall } from '../util/api';
import LoadingScreen from '../components/loading-screen';
import UnauthorizedScreen from '../components/unauth-screen';
import { Modal, Overlay } from '../components/modal';
import { Label } from '../components/label';
import { Input } from '../components/input';
import Button from '../components/button';

const Form = styled.form`
  border: 1px solid #111;
  margin: 0 auto;
  max-width: 640px;
  width: 100%;
`

const reducer = (state: any,action: any) => {
  switch(action.type){
    case 'field':
      return {
        ...state,
        [action.field]: action.value
      }
    case 'loadItem':
      return {
        ...state,
        _id: action.value._id,
        name: action.value.name,
        description: action.value.description,
        category: action.value.category,
        price: action.value.price,
        image: action.value.image
      }
    case 'clear':
      return {
        ...state,
        _id: '',
        name: '',
        description: '',
        price: 0,
        category: '',
        image: ''
      }
    default:
      break;
  }
}

const initialState = {
  itemList: [],
  modalVisible: false,
  _id: '',
  name: '',
  description: '',
  price: 0,
  category: '',
  image: ''
}

const ItemEditor = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isLoading,setIsLoading]= useState(true);


  // Creates a new Item
  const newItem = () => {
    dispatch({type: 'clear'})
  }

  // Loads an item
  const loadItem = (id: string) => {
    const query = `
      query{
        LoadItem(){
          _id
          name
          description
          category
          price
          image
        }
      }
    `
    APICall(query)
    .then(({data})=>{
      let item = data.LoadItem;
      dispatch({type: 'loadItem', value:item})
      dispatch({type: 'field', field: 'modalVisible',value: false})
    })
  }

  // Saves an Item
  const saveItem = (e: FormEvent) => {
    e.preventDefault();
    const query = `
      mutation{
        SaveItem(session: "${localStorage.getItem('session')}", input: {_id: "${state._id}",name: "${state.name}",description: "${state.description}", price: ${state.price},category: "${state.category}" }){
          success
        }
      }
    `
    APICall(query)
    .then(({data})=>{
      if(data.success){
        alert("Item successfully saved!")
      }
    })
  }

  // Gets a list of all the available items
  const getItemList = () =>{
    const query = `
      query{
        ListAllItems{
          _id
          name
        }
      }
    `
    APICall(query)
    .then(({data})=>{
      dispatch({type: 'field',field: 'itemList', value: data.ListAllItems})
    })
  } 

  const auth: any = useAuth();

 
  useEffect(()=>{
    auth.authorize()
    .then((data: any)=>{
      getItemList();
      setIsLoading(false);
    })
  },[])

  if(isLoading){
    return(
      <LoadingScreen/>
    )
  }

  if(auth.isAuthorized){
    return (
      <div>
        <div style={{display: (state.modalVisible)?'block':'none'}}>
          <Overlay>
            <Modal>
              <h2>Load Items</h2>
              <div style={{textAlign: 'center'}}>
                <Button onClick={()=>dispatch({type: 'field', field: 'modalVisible',value: false})}>Close</Button>
              </div>
              {state.itemList.map((item: {_id: string, name: string})=>(
                <div style={{display: 'flex'}}>
                  <div>{item.name}</div>
                  <div><Button type="button" onClick={()=>loadItem(item._id)}>Load</Button></div>
                </div>
              ))}
            </Modal>
          </Overlay>
        </div>
        <h1 style={{textAlign: 'center'}}>Item Editor</h1>
        <Form onSubmit={saveItem}>
          <h3>ID: {state._id}</h3>
          <Label>Name</Label>
          <Input onChange={e=>dispatch({type: 'field', field: 'name',value: e.target.value})} value={state.name} />
          <Label>Description</Label>
          <Input onChange={e=>dispatch({type: 'field', field: 'description',value: e.target.value})} value={state.description} />
          <Label>Price</Label>
          <Input onChange={e=>dispatch({type: 'field', field: 'price',value: +e.target.value})} value={state.price} />
          <Label>Category</Label>
          <Input onChange={e=>dispatch({type: 'field', field: 'category',value: e.target.value})} value={state.category} />
          <Label>Image</Label>
          <Input onChange={e=>dispatch({type: 'field', field: 'image',value: e.target.value})} value={state.image} />
          <div>
            <Button type="submit">Save</Button>
            <Button type="button" onClick={newItem}>New</Button>
            <Button type="button" data-testid="load-btn" onClick={()=>dispatch({type: 'field',field: 'modalVisible',value: true})}>Load</Button>
          </div>
        </Form>
      </div>
    )
  }

  return(
    <UnauthorizedScreen/>
  )
}

export default ItemEditor
