import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';


import { Menu, Dropdown, Icon, Layout, Button, Badge } from 'antd';
import Login from './login/login';

const LoginMenu = ({ data, history }) => {
  return (
    <Menu style={{ width: 300, padding: '10px' }}>
      <Login loginState={data} history={history} />
    </Menu>
  )
};
const { Header } = Layout;

const navbar = {
  backgroundColor: '#f5f5f5',
  height: '80px'
}

const signInStyle = {
  // float: 'right',
  color: '#E1E1E1',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none'
}

class Navbar extends Component {

  render() {
    const { email } = this.props.authState ? this.props.authState.user : '';
    const { isLoggedIn } = this.props.authState;
    const { history } = this.props;

    return (
      <Layout >
        <Header className="header" style={{ background: '#3e3c42', display: 'grid', gridTemplateColumns: '50% 50%' }}>
          <div className="logo" />
          <div style={{ textAlign: 'right' }}>
            {(isLoggedIn) ?
              (
                <span>
                <Button icon="mail" style={{ marginRight: '20px' }}>
                  <Link to="messages">Messages</Link>
                  <Badge count={5} style={{ backgroundColor: '#61d395', marginLeft: '5px' }} />
                </Button>
                <Button icon="dropbox" style={{ marginRight: '20px' }}>
                  Dropbox
                </Button>
                </span>
            )
              : (null)
            }
            <Dropdown overlay={<LoginMenu data={isLoggedIn} history={history} />} trigger={['click']} >
              <a className="ant-dropdown-link" href="#" style={signInStyle}>
                {isLoggedIn ? (email) : ('Sign in')}
                <Icon type="caret-down" />
              </a>
            </Dropdown>
          </div>
        </Header>
      </Layout>
    );
  }
}

export default
  connect(
    state => {
      return {
        authState: state.auth,
      }
    },
    {}
  )(Navbar);



