import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/Users/User';
import NotFound from './pages/Page404';
import Tenant from "./pages/Tenant";
import Apartment from "./pages/Apartments/Apartments";
import {getRole, getToken} from "./utils/common";
import React from "react";
import House from "./pages/Houses/House";
import Listings from "./pages/listings";
import Bills from "./pages/Bills/Bills";
import Home from "./pages/Home";

// ----------------------------------------------------------------------

export default function Router() {
  console.log(getRole())

  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: getToken()?<DashboardApp />: <Navigate to='home'/>},
        { path: 'user', element: getRole()==="Super Admin"?<User />: <Navigate to='home'/>},
        { path: 'Houses', element: getRole()==="Super Admin"?<House />: <Navigate to='home'/>},
        { path: 'tenants', element: getRole()==="Super Admin"?<Tenant />: <Navigate to='home'/> },
        { path: 'apartments', element: getRole()==="Super Admin"?<Apartment />:<Navigate to='home'/> },
        { path: 'Bill', element: getRole()==="Super Admin"?<Bills />:<Navigate to='Bill'/> },
        { path: 'ViewHouses', element: <Products /> },
        { path: 'blog', element: <Blog /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: getToken()?<Navigate to="/dashboard/app" />: <Navigate to='home'/>},
        { path: 'login', element: <Login /> },
        { path: 'listings/:Name/:Id', element: <Listings /> },
        { path: 'register', element: <Register />},
        { path: 'home', element: <Home />},
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/login" replace /> }
  ]);
}
