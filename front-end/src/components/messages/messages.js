import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import UploadDropbox from './upload';
import './messages.css';

import { Badge, Form, Row, Col, Checkbox, Button, Radio, Layout } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

const FormItem = Form.Item;
const RadioGroup = Radio.Group;



class MessagesListComponent extends Component {
    state = {
    };

    render() {
        const { list } = this.props;
        const createMarkup = (html) => {
            return {__html: html};
          }
        return (
            <div>
                <Layout>
                    <Content>
                        <div style={{ background: '#fff' }}>
                            {
                                list.map((val, ind) => 
                                    <div className='nested-div' key={ind}>
                                        <Row>
                                            <div>
                                                <Row>
                                                    <Col> <h3 style={{ float: "right" }}>User</h3></Col>
                                                    <Col> <p >2years ago</p></Col>
                                                </Row>
                                                <p dangerouslySetInnerHTML={createMarkup(val)}></p>
                                                <div style={{ float: "right" }}>
                                                    <Button type="normal" icon="rollback"  >Reply</Button>
                                                    <Button type="normal" icon="folder-open"  >Mark as Read</Button>
                                                    <Button type="normal" icon="star"  >Important</Button>
                                                </div>
                                            </div>
                                        </Row>
                                    </div>
                                )}
                        </div>
                    </Content>
                </Layout>
            </div>
        )
    }
}

export default MessagesListComponent;

