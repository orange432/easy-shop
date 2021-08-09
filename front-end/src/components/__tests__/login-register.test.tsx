import React from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react';
import LoginRegister from "../login-register";

afterEach(cleanup);

test('Login Register tabs switch fields',()=>{
  const loginRegister = render(<LoginRegister/>);
  fireEvent.click(loginRegister.getByText('Register'))
  expect(loginRegister.getByText('Email')).toBeTruthy();
  expect(loginRegister.getByText('Password')).toBeTruthy();
  expect(loginRegister.getByText('Verify Password')).toBeTruthy();
  fireEvent.click(loginRegister.getByText('Login'))
  expect(loginRegister.getAllByText('Login')).toBeTruthy();
  expect(loginRegister.getByText('Email')).toBeTruthy();
  expect(loginRegister.getByText('Password')).toBeTruthy();
})