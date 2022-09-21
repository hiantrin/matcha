import React from 'react';

import {Navigate, Outlet} from 'react-router-dom'

const  PrivateRoutes=({auth}) =>{
  return auth === 'failed' ? <Navigate to="/auth" /> : <Outlet/>
}

export default PrivateRoutes;