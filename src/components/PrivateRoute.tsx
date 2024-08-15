import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { isLoggedIn } = useAuth(); // 로그인 상태 확인

  return (
    <Route
      {...rest}
      element={isLoggedIn ? Component : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
