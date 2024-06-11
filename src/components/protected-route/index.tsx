import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const [cookies] = useCookies(['token']);

  if (!cookies.token) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedRoute;
