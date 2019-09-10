import React, {useState} from 'react';
import {Segment, Header, Icon, Form, Button} from 'semantic-ui-react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

type user = {
  _id?: string,
  email?: string;
  password?: string;
};

const SignUp = (props: any) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [navigate, setNavigate] = useState(false);

  const handleEmail = (e: { target: HTMLInputElement }) => {
    setEmail(e.target.value);
  };

  const handlePass = (e: { target: HTMLInputElement }) => {
    setPass(e.target.value);
  };

  const signup = async ({ email, password }: user) => {
    await axios.post('http://localhost:8000/api/signup', {
      email,
      password
    });
    const { data } = await axios.post('http://localhost:8000/api/login', {
      email,
      password
    });
    if (data.token) {
      localStorage.setItem('token', data.token);
      setNavigate(true);
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
        Sign Up
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
        <Button primary onClick={() => signup({email: email, password: pass})}>Sign Up</Button>
        <Link to="/log-in">Have an account? Sign in!</Link>
      </Form>
    </Segment>
  );
};

export default SignUp;