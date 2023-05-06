import React from 'react';
import {Route,Redirect, useNavigate} from 'react-router-dom';


import { getToken } from './common';

// handle the public routes
function PublicRoute({ component: Component }) {
    useEffect(()=>{
        console.log(getToken())
    }, [])

    const navigate = useNavigate();
  return (
    <>
        {(props) => !getToken() ? <Component {...props} /> : <Redirect to={{ pathname: '/dashboard/app' }} />}
    </>
  )
}

export default PublicRoute;