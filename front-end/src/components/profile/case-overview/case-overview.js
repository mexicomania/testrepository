import React, { Component } from 'react';
import { Button, Switch, Badge, Row, Col,Card } from 'antd';
import EditorComponent from '../../editor/editor';
import './case-overview.css'


const headStyle = {
    backgroundColor:'#70808F',
    color:'#fff'
}
class CaseOverview extends Component {
    state = {

    }      

    onStatusChange(checked) {
        console.log(`switch to ${checked}`);
    }

    getEditorValue(message){
        console.log(message)
    }
    render() {
        return (
            <div id="case-overview">
                {/* <span className="ant-form-text" style={{ marginBottom: '10px' }}><b>User Profile</b></span> */}
                <Row gutter={16}>
                    <Col span={8}>
                    <Card
                        headStyle={headStyle}
                        className="equal-cards"
                        title="Petitioner Info"
                        extra={<span style={{color:'#fff'}}>Account ID: abc@gmail.com</span>}
                    >
                        <span>
                            <p className="name-pills">First</p>
                            <p className="name-pills">Middle</p>
                            <p className="name-pills">Last</p>
                        </span>
                        <div className="info">
                            <p><b>Petitioner Name:</b> ABC</p>
                            <p><b>Personal Email:</b> abc@gmail.com</p>
                            <p><b>Phone Number:</b> 123-456-7890</p>
                            <p><b>Join Date:</b> 10/10/2018</p>
                            <p><b>Last Login:</b> 10/10/2018</p>
                            <p><b>Gender:</b> Male</p>
                            <p><b>Age:</b> 32</p>
                            <p><b>State:</b> TX</p>
                        </div>
                    </Card>
                    </Col>
                    <Col span={8}>
                    <Card
                        headStyle={headStyle}
                        title="Beneficiary Info"
                        className="equal-cards"
                        // extra={<span>Account ID: abc@gmail.com</span>}
                    >
                        <span>
                            <p className="name-pills">First</p>
                            <p className="name-pills">Middle</p>
                            <p className="name-pills">Last</p>
                        </span>
                        <div className="info">
                            <p><b>Beneficiary Name:</b> ABC</p>
                            <p><b>Email:</b> abc@gmail.com</p>
                            <p><b>Phone Number:</b> 123-456-7890</p>
                            <p><b>Gender:</b> Male</p>
                            <p><b>Age:</b> 32</p>
                            <p><b>Alien Children:</b> 0</p>
                            <p><b>Alien Dependent Children:</b> 0</p>
                        </div>
                    </Card>
                    </Col>
                    <Col span={8}>
                    <Card
                        headStyle={headStyle}
                        title="K1 Fiancee Petition Details"
                        className="equal-cards"
                    >
                        <div className="info">
                            <p><b>USCIS Case Number:</b> N/A</p>
                            <p><b>NVC Case Number:</b> N/A</p>
                            <p><b>Embassy:</b> N/A</p>
                            <p><b>Meet City:</b> Cebu</p>
                            <p><b>Biographical Info Progress:</b> 31%</p>
                            <p><b>Financial Info Progress:</b> N/A</p>
                            <p><b>Questionnaire Review Count:</b> N/A</p>
                            <p><b>Petition Print Count:</b> N/A</p>
                            <p><b>Last Printed Petition On:</b> N/A</p>
                            <p><b>Payment Status:</b> Completed</p>
                            <p><b>Payment Amount:</b> $ 150.00</p>
                            <p><b>Payment Date:</b> 10/10/2018</p>
                        </div>
                    </Card>
                    </Col>
                    <Col span={8}>
                    <Card
                        headStyle={headStyle}
                        title="K1 Fiancee Petition Settings"
                        className="equal-cards"
                    >
                        <span>
                            <p style={{...headStyle,borderRadius:'16px',padding:'5px 12px',width:'fit-content'}}>First</p>
                            <p style={{...headStyle,borderRadius:'16px',padding:'5px 12px',width:'fit-content'}}>Middle</p>
                            <p style={{...headStyle,borderRadius:'16px',padding:'5px 12px',width:'fit-content'}}>Last</p>
                        </span>
                        <div className="info">
                            <p><b>K1 Fiancee Package Print: </b><Switch onChange={this.onStatusChange.bind(this)} /></p>
                            <p><b>Affidavit of Support Print: </b><Switch onChange={this.onStatusChange.bind(this)} /></p>
                            <p><b>DS-160 Worksheet Print: </b><Switch onChange={this.onStatusChange.bind(this)} /></p>
                            <p><b>K1 Fiancee Review Request: </b><Switch onChange={this.onStatusChange.bind(this)} /></p>
                            <p><b>Affidavit of Support Request: </b><Switch onChange={this.onStatusChange.bind(this)} /></p>
                        </div>
                    </Card>
                    </Col>
                    <Col span={8}>
                    <Card
                        headStyle={headStyle}
                        title="Case Note"
                        className="equal-cards"
                    >
                      <EditorComponent buttonText="Update Case Note" getValue={this.getEditorValue.bind(this)}/>
                    </Card>
                    </Col>
                    <Col span={8}>
                    <Card
                        headStyle={headStyle}
                        title="Last 5 Notifications"
                        className="equal-cards"
                    >
                       
                    </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CaseOverview;


