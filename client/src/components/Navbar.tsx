import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';
import equal from 'fast-deep-equal';
import _ from 'lodash';

class Navbar extends Component<any> {
  state = {
    user: {}
  }

  componentDidMount() {
    if (this.props.token && !_.isEmpty(this.props.user)) {
      this.setState({user: this.props.user});
    }
  }

  componentDidUpdate(prevProps: any) {
    if(!equal(this.props.user, prevProps.user)) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
    {
      this.setState({user: this.props.user})
    }
  } 

  renderMenu = () => {
      switch (_.isEmpty(this.state.user)) {
        case true:
          return (
            <Menu.Menu position="right">
              <Menu.Item active={this.props.location.pathname === '/log-in'}>
                <Link to="/log-in">Log In</Link>
              </Menu.Item>
              <Menu.Item active={this.props.location.pathname === '/sign-up'}>
                <Link to="/sign-up">Sign Up</Link>
              </Menu.Item>
            </Menu.Menu>
          );
        default:
          return (
            <Menu.Menu position="right">
              <Menu.Item active={this.props.location.pathname === '/log-in'}>
                <p>Hi {this.props.user.first}</p>
              </Menu.Item>
              <Menu.Item active={this.props.location.pathname === '/sign-up'}>
                <Link to="/log-out" onClick={() => this.props.setToken("")}>Log Out</Link>
              </Menu.Item>
            </Menu.Menu>
          );
      }
  };

  render() {
    return (
      <Segment inverted style={{ borderRadius: '0px' }}>
        <Menu inverted secondary>
          <Menu.Item active={this.props.location.pathname === '/'}>
            <Link to="/">Home</Link>
          </Menu.Item>
          {this.renderMenu()}
        </Menu>
      </Segment>
    );
  }
};

export default withRouter(props => <Navbar {...props} />);
