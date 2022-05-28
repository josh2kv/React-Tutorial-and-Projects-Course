import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
// will remove later
import { useUserContext } from '../context/user_context';

// ...rest : 나머지 건네받는 props 전부
const PrivateRoute = ({ children, ...rest }) => {
  const { myUser } = useUserContext();
  return (
    <Route
      {...rest}
      render={() => {
        return myUser ? children : <Redirect to="/" />;
      }}
    />
  );
};
export default PrivateRoute;
