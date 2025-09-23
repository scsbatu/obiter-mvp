import { Navigate, useLocation } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import { getUserToken } from './utils/cacheStorage';

const ProtectRoute = ({ children, redirectTo, protectRoutes }: any) => {  
  if (isEmpty(getUserToken()) && protectRoutes) {
    return <Navigate to={redirectTo} />;
  }
  return children;
};

export default ProtectRoute;
