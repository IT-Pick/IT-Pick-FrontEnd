import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // AuthContext를 사용한다고 가정

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { isLoggedIn } = useAuth(); // 로그인 상태 확인

  return (
    <Route
      {...rest}
      element={
        isLoggedIn ? (
          Component
        ) : (
          <Navigate to="/login" replace />
        )
      }
    />
  );
};

export default PrivateRoute;
