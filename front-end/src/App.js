import React, { Component } from 'react';
import { Layout } from 'antd';
import './App.css';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import AdminSidebar from './components/admin-sidebar/admin-sidebar';
import DynamicModal from './components/dynamic-modal/dynamic-modal';
import { Provider } from 'react-redux';
import store from './store/index';
import Routes from './route';

import MessagesComponent from './components/messages/messages';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
          {/* <Navbar /> */}
          {/* <Sidebar /> */}
          {/* <AdminSidebar /> */}
          {/* <MessagesComponent/> */}
          <Routes/>
          {/* <DynamicModal/> */}

      </Provider>

    );
  }
}

export default App;

