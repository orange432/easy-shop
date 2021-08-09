// Login/Registration Page
import React, {FormEventHandler, useReducer} from 'react'
import { APICall } from '../util/api';
import styled from '@emotion/styled';
import Button from './button';

const reducer = (state: any,action: any) => {
  switch(action.type){
    case 'field':
      return {
        ...state,
        [action.field]: action.value
      }
    case 'tabLogin':
      return {
        ...state,
        showRegister: false
      }
    case 'tabRegister':
      return {
        ...state,
        showRegister: true
      }
    default:
      break;
  }
}

const initialState = {
  email: '',
  password: '',
  verifyPasssword: '',
  showRegister: false,
  error: ''
}


const Container = styled.div`
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  border: 2px solid #111;
`

const Tabs = styled.div`
  display: flex;
`

const Tab = styled.div`
  width: 50%;
  padding: 30px 15px;
  text-align: center;
  font-weight: 700;
  font-size: 30px;
`

const Title = styled.h2`
  color: #fff;
  background: #111;
  width: 100%;
  text-align: center;
  padding: 5px 0;
  margin: 10px 0;
`

const Form = styled.form`
  padding: 10px;
`

const Label = styled.label`
  display: block;
  font-size: 24px;
`

const Input = styled.input`
  width: 99%;
  font-size: 24px;
`

const Center = styled.div`
  text-align: center;
`

const Error = styled.p`
  text-align: center;
  color: red;
  font-weight: 700;
`

const LoginRegister = () => {
  const [state, dispatch] = useReducer(reducer,initialState);

  // 5 second timer on error messages
  const errorMsg = (message: string) => {
    dispatch({type: "field", field: "error", value: message});
    setTimeout(()=>{
      dispatch({type: "field", field: "error", value: ''});
    },5000)
  }

  //
  const register = (e: any) => {
    e.preventDefault();
    if(state.password!==state.verifyPassword){
      return errorMsg("Password and Verify password don't match!");
    }
    const query = `
      mutation{
        CreateUser(email: "${state.email}", password: "${state.password}"){
          success
          error
        }
      }
    `
    APICall(query)
    .then(res=>res.json())
    .then(({data})=>{
      console.log(data)
      if(data.CreateUser.success){
        dispatch({type: "tabLogin"})
        errorMsg('User successfully created!');
      }else{
        errorMsg(data.CreateUser.error);
      }
    })
  };

  const login = (e: any) => {
    e.preventDefault();
    if(state.password.length===0 || state.email.length===0){
      return errorMsg("Please enter a valid email and password.")
    }
    const query = `
      mutation{
        Login(email: "${state.email}", password: "${state.password}"){
          success
          payload
          error
        }
      }
    `
    APICall(query)
    .then(res=>res.json())
    .then(({data})=>{
      if(data.Login.success){
        localStorage.setItem('session',data.Login.payload);
        window.location.href="/dashboard"
      }else{
        errorMsg(data.Login.error);
      }
    })
  }


  if(state.showRegister){
    return (
      <Container>
        <Tabs>
          <Tab style={{background: '#111', cursor: 'pointer', color: '#fff'}} onClick={()=>dispatch({type: "tabLogin"})}>Login</Tab>
          <Tab>Register</Tab>
        </Tabs>
        <Title>Register</Title>
        <Error>{state.error}</Error>
        <Form onSubmit={register}>
          <Label>Email</Label>
          <Input type="email" onChange={e=>dispatch({type: 'field',field: 'email', value: e.target.value})} value={state.email} />
          <Label>Password</Label>
          <Input type="password" onChange={e=>dispatch({type: 'field',field: 'password', value: e.target.value})} value={state.password} />
          <Label>Verify Password</Label>
          <Input type="password" onChange={e=>dispatch({type: 'field',field: 'verifyPassword', value: e.target.value})} value={state.verifyPassword} />
          <Center>
            <Button type="submit">Register</Button>
          </Center>
        </Form>
      </Container>
    )
  }
  return (
    <Container>
      <Tabs>
        <Tab>Login</Tab>
        <Tab style={{background: '#111', cursor: 'pointer', color: '#fff'}} onClick={()=>dispatch({type: "tabRegister"})}>Register</Tab>
      </Tabs>
      <Title>Login</Title>
      <Error>{state.error}</Error>
      <Form onSubmit={login}>
        <Label>Email</Label>
        <Input type="email" onChange={e=>dispatch({type: 'field',field: 'email', value: e.target.value})} value={state.email} />
        <Label>Password</Label>
        <Input type="password" onChange={e=>dispatch({type: 'field',field: 'password', value: e.target.value})} value={state.password} />
        <Center>
          <Button type="submit">Login</Button>
        </Center>
      </Form>
    </Container>
  )
}

export default LoginRegister;
