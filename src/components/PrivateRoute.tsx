import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // AuthContext를 사용한다고 가정

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { isLoggedIn } = useAuth(); // 로그인 상태 확인

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
