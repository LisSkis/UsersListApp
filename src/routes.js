import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from './App/App';
import UserForm from './App/containers/UserForm';

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/add" component={UserForm} />
      <Route path="/edit/:id" component={UserForm} />
      <Route path="/" component={App} />
    </Switch>
  </Router>
)

export default Routes;
