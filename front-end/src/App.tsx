import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import { CartProvider } from './context/cartContext';

import Index from './pages/index';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import ItemEditor from './pages/item-editor';
import Item from './pages/item';

const App:React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/"><Index/></Route>
            <Route path="/login"><Login/></Route>
            <Route path="/dashboard"><Dashboard/></Route>
            <Route path="/editor"><ItemEditor/></Route>
            <Route path="/items/:id"><Item/></Route>
          </Switch>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
