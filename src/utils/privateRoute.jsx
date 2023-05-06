import React, {useEffect} from 'react';
import {Route, Redirect, useNavigate} from 'react-router-dom';
import { getToken } from './common';

// handle the private routes
function PrivateRoute({ component: Component }) {
  useEffect(()=>{
    console.log(getToken())
  });

  const navigate = useNavigate();

  return (
    <>
      {(props) => getToken() ? <Component {...props} /> : navigate('/login', { replace: true })}
    </>
  )
}

export default PrivateRoute;
