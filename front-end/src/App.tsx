import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Dashboard from './pages/dashboard';
import { AuthProvider } from './context/authContext';

import Index from './pages/index';
import Login from './pages/login';

const App:React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/"><Index/></Route>
          <Route path="/login"><Login/></Route>
          <Route path="/dashboard"><Dashboard/></Route>
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
