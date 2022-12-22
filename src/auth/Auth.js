import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Auth = ({ children })=> {
    const { user } = useSelector(state=>state);
    const { isUser } = user;

    if( !isUser ) {
        return <Navigate to="/" replace />;
    }

    return children;
  }

export default Auth;