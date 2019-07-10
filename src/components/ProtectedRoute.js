import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import Header from '../components/Header';

const ProtectedRoute = (props) => {

  if (!props.user.token) {
    return (<Redirect to='/login'/>);
  }

  return (
    <div>
      <Header />
      <Route {...props}/>
    </div>
  )

}

export default ProtectedRoute;