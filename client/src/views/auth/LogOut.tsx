import React, {useEffect} from 'react';
import {Redirect} from 'react-router-dom';

const LogOut = (props: any) => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      localStorage.removeItem('token');
      props.setUser({});
      props.setToken("");
    }
  })
  return <Redirect to="/" />
}

export default LogOut;