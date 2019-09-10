import React, {useEffect} from 'react';
import {Redirect} from 'react-router-dom';

const LogOut = () => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      localStorage.removeItem('token');
    }
  })
  return <Redirect to="/" />
}

export default LogOut;