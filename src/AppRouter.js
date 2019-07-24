import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/pages/Login';
import ContactPage from './components/pages/ContactPage';
import Register from './components/pages/Register';
import UserContext from './components/contexts/UserContext';
import SearchContext from './components/contexts/SearchContext';
import './AppRouter.css';

const AppRouter = () => {

  const initalValue = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : { name: '', token: ''};
  const [user, setUser] = useState(initalValue);
  const [search, setSearch] = useState('');
  useEffect(() => {
    sessionStorage.setItem('user', JSON.stringify(user));
  }, [user]);
  return (
    <UserContext.Provider value={{user: user, setUser: setUser}}>
      <SearchContext.Provider value={{ search: search, setSearch: setSearch }}>
      <BrowserRouter>
        <Switch>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <ProtectedRoute user={user} exact path='/' component={ContactPage} />
        </Switch>
      </BrowserRouter>
      </SearchContext.Provider>
    </UserContext.Provider>
  );
}

export default AppRouter;
