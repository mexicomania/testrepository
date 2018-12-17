import React, { Component } from 'react';
import { Button, Switch, Badge, Row, Col,Tabs,Modal,Select } from 'antd';
import './profile.css'
import CaseOverview from './case-overview/case-overview';

const TabPane = Tabs.TabPane;
const Option = Select.Option;


class Profile extends Component {
    state = {
        ModalText: 'Content of the modal',
        ModalTitle: '',
        visible: false,
        confirmLoading: false,
    }

    onStatusChange(checked) {
        console.log(`switch to ${checked}`);
    }
    tabsCallBack(key) {
        console.log(key);
      }
    

    // Change Petition Type Modal
    showModal = (type) => {
        console.log(type)
    this.setState({
        visible: true,
        ModalTitle:type
    });
    }

    handleOk = () => {
        this.setState({
          ModalText: 'The modal will be closed after two seconds',
          confirmLoading: true,
        });
        setTimeout(() => {
          this.setState({
            visible: false,
            confirmLoading: false,
          });
        }, 2000);
      }
    
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
          visible: false,
        });
      }

    handleChange(value) {
        console.log(`selected ${value}`);
    }  
    // Change Petition Type Modal End

    render() {
        const { visible, confirmLoading, ModalText, ModalTitle } = this.state;
        return (
            <div id="profile-main">
                <span className="ant-form-text" style={{ marginBottom: '10px' }}><b>User Profile</b></span>
                <div>
                    <Row>
                        <Col span={4}>
                            Login Status: <Badge count={1} style={{ backgroundColor: 'yellow', color: '#999' }} />
                        </Col>
                        <Col span={4}>
                            Actuve User: <Switch onChange={this.onStatusChange.bind(this)} />
                        </Col>
                    </Row>
                </div>
                <div style={{ marginTop: '15px' }} className="btns-div">
                    <Button type="primary" className="btns" style={{borderRadius:'16px'}}>
                        Acct ID:abc@gmail.com
                    </Button>
                    <Button className="btns" onClick={this.showModal.bind(this,'Petition Type')}>
                        Petition Type:K1
                    </Button>
                    <Button type="primary" className="btns">
                        Impersonate User
                    </Button>
                    <Button className="btns">
                        Send Reset Password Email
                    </Button>
                    <Button className="btns">
                        Set New Password
                    </Button>
                </div>
                <div style={{ marginTop: '25px' }}>
                <Tabs onChange={this.tabsCallBack} type="card" className="tab-bar">
                    <TabPane tab="Case Overview" key="1">
                        <CaseOverview/>
                    </TabPane>
                    <TabPane tab="Correspondence" key="2">Content of Tab Pane 2</TabPane>
                    <TabPane tab="Case Cloud Files" key="3">Content of Tab Pane 3</TabPane>
                </Tabs>
                </div>
                <div>
                    <Modal title={ModalTitle}
                        visible={visible}
                        onOk={this.handleOk}
                        confirmLoading={confirmLoading}
                        onCancel={this.handleCancel}
                    >
                        {/* <p>{ModalText}</p> */}
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="Select Type"
                            onChange={this.handleChange}
                        >
                            <Option value="K1">K1</Option>
                            <Option value="CR1">CR1</Option>
                            <Option value="AOS">AOS</Option>
                            <Option value="ROC">ROC</Option>
                        </Select>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default Profile;


