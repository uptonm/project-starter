import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import * as _ from 'lodash';
import axios from 'axios';

import Navbar from '../components/Navbar'
import SignUp from './Auth/SignUp';
import LogIn from './Auth/LogIn';
import LogOut from './Auth/LogOut';
import FinishProfile from './User/FinishProfile';
import Home from './Home';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {user} from '../shared/types';

export default () => {
  const [token, setToken] = useState('');
  const [user, setUser] = useState<user>({});

  useEffect(() => {
    if (token.length === 0) {
      fetchToken();
    }
    if (_.isEmpty(user)) {
      fetchUser();
    }
  })

  const fetchToken = () => {
    const data = localStorage.getItem('token');
    if (data) {
      setToken(data)
    }
  }

  const fetchUser = async () => {
    if (token && token.length > 0) {
      const {data} = await axios.get("http://localhost:8000/api/user", {headers: {"Authorization":`Bearer ${token}`}});
      setUser(data);
    }
  }

  return (
    <Router>
      <div>
        <Route path="/" component={(props: any) => <Navbar user={user} token={token} setToken={setToken} {...props}/>} />
        <Route exact path="/" component={Home} />
        <Route path="/sign-up" component={() => <SignUp setToken={setToken} fetchUser={fetchUser} />} />
        <Route path="/log-in" component={() => <LogIn setToken={setToken} fetchUser={fetchUser} />} />
        <Route path="/log-out" component={() => <LogOut setToken={setToken} setUser={setUser} />} />
        <Route path="/finish-profile" component={() => <FinishProfile user={user} token={token}/>} />
      </div>
    </Router>
  );
}
