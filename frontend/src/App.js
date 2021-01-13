import React, { useMemo, useState } from 'react';
import { Route, Switch } from 'react-router';
import Home from './components/Home';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import { userContext } from './Context/user.context';

const App = () => {
  const[user, setUser] = useState({
    id: "",
    name: "",
    username: ""
  })
  const details = useMemo(() => ({user, setUser}), [user, setUser]);

  return (
    <>
      <Switch>
        <Route exact path='/signup' component={Signup}/>
        <userContext.Provider value={details}>
          <Route exact path='/' component={Home}/>
          <Route exact path='/dashboard' component={Dashboard} />
        </userContext.Provider>
      </Switch>
    </>
  )
}

export default App;
