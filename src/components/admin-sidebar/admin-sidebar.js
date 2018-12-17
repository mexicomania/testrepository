import React, { Component } from 'react';
import { Icon, Layout, Menu, Badge } from 'antd';
import './admin-sidebar.css';
import AddUserForm from '../add-user/add-user';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import FindAccount from '../find-account/find-account';
import Message from '../message/message';
import AddAdminForm from '../add-admin/add-admin';
import Notice from '../notice/notice';
import PublicData from '../public-data/public-data';
import EmailSetting from '../email-setting/email-setting';
import MailingInstruction from '../email-instruction/mailing-instruction';
import TermsConditions from '../terms-conditions/terms-conitions';
import Profile from '../profile/profile';

const MenuItemGroup = Menu.ItemGroup;
const { Content, Sider } = Layout;

const sider = {
    position: 'absolute !important',
    zIndex: '5',
    background: '#283646',
}

class AdminSidebar extends Component {
    state = {
        isCollapsed: true
    }
    onCollapseEvent(collapse, type) {
        console.log(collapse, type)
        if (type == 'responsive' && collapse == true) {
            this.setState({ isCollapsed: collapse })
            sider.position = 'absolute !important';
        } else if (type == 'responsive' && collapse == false) {
            sider.position = 'relative !important';
            this.setState({ isCollapsed: true })

        }

        if (type == 'clickTrigger') {
            this.setState({ isCollapsed: collapse })
            sider.position = 'absolute !important';
        }
    }
    render() {
        return (
            // <Router >
                <Layout>
                    <Sider
                        width={200}
                        style={sider}
                        breakpoint="md"
                        collapsedWidth="0"
                        onBreakpoint={
                            (broken) => {
                                console.log(broken);
                                if (!broken) {
                                    this.setState({ isCollapsed: true })
                                }
                            }}
                        onCollapse={this.onCollapseEvent.bind(this)}
                    // onCollapse={(collapsed, type) => { console.log(collapsed, type); this.setState({isCollapsed : collapsed}) }}
                    >
                        <Menu mode="inline" defaultSelectedKeys={['1']} style={{ background: '#283646', color: '#CAD5E1', height:'100%' }}>
                            <Menu.Item key="1">
                                <Link to="/dashboard" style={{ color: '#CAD5E1' }}>
                                    <Icon type="home" />
                                    <span className="nav-text">Home</span>
                                </Link>
                            </Menu.Item>
                            <MenuItemGroup key="g1" title="Client Management" className="menu-item-group">
                                <Menu.Item key="2">
                                    <Link to="/dashboard/add-user" style={{ color: '#CAD5E1' }}>
                                        <Icon type="user-add" />
                                        <span className="nav-text">Add Sponor Account</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="3">
                                    <Link to="/dashboard/find-account" style={{ color: '#CAD5E1' }}>
                                        <Icon type="contacts" />
                                        <span className="nav-text">Find Account</span>
                                    </Link>>
                                </Menu.Item>
                                {/* <Menu.Item key="4">
                                    <Icon type="bar-chart" />
                                    <span className="nav-text">Active Grid: Progress</span>
                                </Menu.Item> */}
                            </MenuItemGroup>
                            <MenuItemGroup key="g2" title="Case Management" className="menu-item-group">
                                <Menu.Item key="5">
                                    <Link to="/dashboard/message" style={{ color: '#CAD5E1' }}>
                                        <Icon type="mail" />
                                        <span className="nav-text">Messages &nbsp;
                                <Badge count={10} showZero={true} style={{ backgroundColor: '#C97111', border: '1px solid #FB911C' }} />
                                        </span>
                                    </Link>
                                </Menu.Item>
                                {/* <Menu.Item key="6">
                                    <Icon type="database" />
                                    <span className="nav-text">Admin Tasks &nbsp;
                                <Badge count={0} showZero={true} style={{ backgroundColor: '#C97111', border: '1px solid #FB911C' }} />
                                    </span>
                                </Menu.Item> */}
                                {/* <Menu.Item key="7">
                                    <Icon type="info-circle-o" />
                                    <span className="nav-text">System Notifications</span>
                                </Menu.Item> */}
                                <Menu.Item key="8">
                                    <Link to="/dashboard/announcement" style={{ color: '#CAD5E1' }}>
                                        <Icon type="notification" />
                                        <span className="nav-text">Announcements</span>
                                    </Link>
                                </Menu.Item>
                            </MenuItemGroup>

                            <MenuItemGroup key="g3" title="Administrative" className="menu-item-group">
                                <Menu.Item key="9">
                                    <Link to="/dashboard/add-admin" style={{ color: '#CAD5E1' }}>
                                        <Icon type="user-add" />
                                        <span className="nav-text">Add Admin Account</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="10">
                                    <Link to="/dashboard/public-data" style={{ color: '#CAD5E1' }}>
                                        <Icon type="idcard" />
                                        <span className="nav-text">Public Data</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="11">
                                    <Link to="/dashboard/email-setting" style={{ color: '#CAD5E1' }}>
                                        <Icon type="mail" />
                                        <span className="nav-text">Email Settings</span>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="12">
                                    <Link to="/dashboard/mailing-instruction" style={{ color: '#CAD5E1' }}>
                                        <Icon type="edit" />
                                        <span className="nav-text">Mailing Instructions</span>
                                    </Link>
                                </Menu.Item>
                                {/* <Menu.Item key="13">
                                    <Icon type="flag" />
                                    <span className="nav-text">Embassy Instructions</span>
                                </Menu.Item> */}
                                <Menu.Item key="14">
                                    <Link to="/dashboard/terms-conditions" style={{ color: '#CAD5E1' }}>
                                        <Icon type="edit" />
                                        <span className="nav-text">Terms &amp; Conditions</span>
                                    </Link>
                                </Menu.Item>
                            </MenuItemGroup>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '24px 24px 24px' }}>
                        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                            <Route path="/dashboard/" exact component={Message} />
                            <Route path="/dashboard/add-user" component={AddUserForm} />
                            <Route path="/dashboard/find-account" component={FindAccount} />
                            <Route path="/dashboard/message" component={Message} />
                            <Route path="/dashboard/add-admin" component={AddAdminForm} />
                            <Route path="/dashboard/announcement" component={Notice} />
                            <Route path="/dashboard/public-data" component={PublicData} />
                            <Route path="/dashboard/email-setting" component={EmailSetting} />
                            <Route path="/dashboard/mailing-instruction" component={MailingInstruction} />
                            <Route path="/dashboard/terms-conditions" component={TermsConditions} />
                            <Route path="/dashboard/profile/:id" component={Profile} />
                        </Content>
                        {!this.state.isCollapsed ? (
                            <div className="content"></div>
                        ) : (
                                ''
                            )}
                    </Layout>
                </Layout>
            // </Router>
        );
    }
}

export default AdminSidebar;