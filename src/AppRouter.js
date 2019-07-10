import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/pages/Login';
import ContactPage from './components/pages/ContactPage';
import Register from './components/pages/Register';
import UserContext from './components/contexts/UserContext';
import './AppRouter.css';

const AppRouter = () => {

  const initalValue = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : { name: '', token: ''};
  const [user, setUser] = useState(initalValue);
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);
  return (
    <UserContext.Provider value={{user: user, setUser: setUser}}>
      <BrowserRouter>
        <Switch>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <ProtectedRoute user={user} exact path='/' component={ContactPage} />
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default AppRouter;
