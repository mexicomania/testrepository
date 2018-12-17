import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route,Redirect,Switch } from 'react-router-dom';
import Welcome from './components/welcome/welcome';
import ProtectedRoute from './private-route';
import Sidebar from './components/sidebar';
import AdminSidebar from './components/admin-sidebar/admin-sidebar';
import Navbar from './components/navbar';
import authActions from './store/actions/authActions';
import createBrowserHistory from 'history/createBrowserHistory';
import { readToken } from './utilities/utilities';

const { getUser } = authActions;

const history = createBrowserHistory();

class Routes extends Component {
  componentDidMount() {
    if(readToken()){
      this.props.getUser();
    }
  }

  render() {
    const { isLoggedIn,user:{roles} } = this.props.authState;
    const userType = roles ? roles[0].name : '' ;
    if(isLoggedIn){
      history.push('/dashboard')
    }

    return (
      <Router history={history} basename='/'>
        <div>
          <Navbar history={history} />
          <Route exact path="/" component={Welcome} />
          <ProtectedRoute  path="/dashboard" component={userType == 'user' ?  Sidebar : AdminSidebar} authed={ isLoggedIn } location={history} />
          </div>
      </Router>
    );
  }
}

export default connect(
    state =>{
        return {
            authState:state.auth
         }
     },
     { getUser }
)(Routes);