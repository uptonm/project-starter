import React, {useState} from 'react';
import {Segment, Header, Icon, Form, Button} from 'semantic-ui-react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

type user = {
  _id?: string,
  email?: string;
  password?: string;
};

const LogIn = (props:any) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [navigate, setNavigate] = useState(false);

  const handleEmail = (e: { target: HTMLInputElement }) => {
    setEmail(e.target.value);
  };

  const handlePass = (e: { target: HTMLInputElement }) => {
    setPass(e.target.value);
  };

  const login = async ({ email, password }: user) => {
    const { data } = await axios.post('http://localhost:8000/api/login', {
      email,
      password
    });
    if (data.token) {
      localStorage.setItem('token', data.token);
      setNavigate(true);
      props.setToken(data.token);
      props.fetchUser();
    }
  };

  const shouldRedirect = () => {
    if (navigate) {
      return (
        <Redirect to="/" />
      )
    }
  }


  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="user outline" />
        Log In
      </Header>
      {shouldRedirect()}
      <Form>
        <Form.Field>
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmail}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input type="password" placeholder="Password" value={pass} onChange={handlePass} />
        </Form.Field>
        <Button primary onClick={() => login({email: email, password: pass})}>Log In</Button>
        <Link to="/sign-up">Don't have an account? Sign Up!</Link>
      </Form>
    </Segment>
  );
};

export default LogIn;