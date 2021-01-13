import React from 'react';
import { Route, Switch } from 'react-router';
import Home from './components/Home';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import { userContext } from './Context/user.context';

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path='/' component={Home}/>
        <userContext.Provider value={}>
          <Route exact path='/signup' component={Signup}/>
          <Route exact path='/dashboard' component={Dashboard} />
        </userContext.Provider>
      </Switch>
    </>
  )
}

export default App;
