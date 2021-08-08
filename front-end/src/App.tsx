import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Dashboard from './pages/dashboard';

import Index from './pages/index';
import Login from './pages/login';

const App:React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/"><Index/></Route>
        <Route path="/login"><Login/></Route>
        <Route path="/dashboard"><Dashboard/></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
