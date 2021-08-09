import React from 'react';
import { render, screen } from '@testing-library/react';
import UnauthorizedScreen from '../unauth-screen';

test('renders a link to the login page', () => {
  render(<UnauthorizedScreen />);
  const linkElement = screen.getByText('Log in');
  expect(linkElement).toBeInTheDocument();
});
