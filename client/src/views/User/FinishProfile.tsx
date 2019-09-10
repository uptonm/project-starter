import React, {useState} from 'react';
import {
  Form,
  Input,
  Select,
  TextArea,
  Button,
  Segment
} from 'semantic-ui-react';
import axios from 'axios';

import { user } from '../../shared/types';

const FinishProfile: React.FC<{ token: string, user: user }> = props => {
  const genderOptions = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' }
  ];
  const [user, setUser] = useState({first: props.user.first || '', last: props.user.last || '', gender: props.user.gender || '', bio: props.user.bio || ''})
  const handleChange = ( e: any, {name, value}: any) => {
    setUser({...user, [name]: value});
  }
  const handleSubmit = async () => {
    if (props.token && props.token.length > 0) {
      const {data} = await axios.put("http://localhost:8000/api/user", {...user}, {headers: {"Authorization": `Bearer ${props.token}`}})
      console.log(data);
    }
  }
  return (
    <Segment padded="very" style={{marginTop: '0'}}>
      <Form onSubmit={handleSubmit}>
        <Form.Group widths="equal">
          <Form.Field
            required
            control={Input}
            name="first"
            label="First name"
            placeholder="First name"
            value={user.first}
            onChange={handleChange}
          />
          <Form.Field
            required
            control={Input}
            name="last"
            label="Last name"
            placeholder="Last name"
            value={user.last}
            onChange={handleChange}
          />
          <Form.Dropdown
            control={Select}
            options={genderOptions}
            label='Gender'
            name="gender"
            placeholder="Gender"
            value={user.gender}
            selection
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Field
          control={TextArea}
          name="bio"
          label="bio"
          placeholder="Bio"
          value={user.bio}
          onChange={handleChange}
        />
        <Form.Field
          control={Button}
          content="Confirm"
        />
      </Form>
    </Segment>
  );
};

export default FinishProfile;
