import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import Messages from './messages'
import List from './list'

import { Badge, Icon, Row, Col, Button, Upload, message, IconAutoComplete, Radio, Layout} from 'antd';
const { Header, Content, Footer, Sider } = Layout;
// const FormItem = Form.Item;
// const RadioGroup = Radio.Group;
// const AutoCompleteOption = AutoComplete.Option;
class UploadDropbox extends Component {
    state = {
        loadMessages: false,
    };
    // onChangeRadioHandler =(e)=>{
    //     this.setState({[e.target.name]:e.target.value})
    // }
    _loadMessages = () => {
        this.setState({ loadMessages: true })
    }
    render() {
        const props = {
            name: 'file',
            action: '//jsonplaceholder.typicode.com/posts/',
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };
        return (
            <div>
                {
                    (this.state.loadMessages === true) ?
                        (
                            <div>
                                {/* <Messages /> */}
                            </div>
                        )
                        :
                        (
                            <div>
                                {/* Top Header Starts */}
                                <Row>
                                    <Header className='head-container' >
                                        <Row  >
                                            <Col span={14}> <h1 >Dashboard Home</h1>  </Col>
                                            <Col span={8}>
                                                <Button type="normal" icon="mail" onClick={this._loadMessages.bind(this)} >Messages <Badge count={1} /></Button>
                                                <Button type="normal" icon="dropbox" >Dropbox</Button>
                                            </Col>
                                        </Row>
                                    </Header>
                                </Row>
                                {/* Top Header Ends */}
                                <Layout>
                                    <Sider style={{ overflow: 'auto', height: '100vh', position: 'left', left: 0, }}>
                                        <div className="logo" />
                                    </Sider>
                                    {/* Card Starts */}
                                    <Layout style={{ marginLeft: 10 }}>

                                        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                                            <div style={{ padding: 24, background: '#fff', }}>
                                                <Row>
                                                    <h1>Upload Dropbox</h1>
                                                    <h3>Note that the purpose of your Drop Box is to facilitate the secure transfer of documents between you and us. It is not designed for document storage and documents may be deleted at anytime once we have determined they are no longer needed. Be sure you retain a personal copy of any documents placed in the Drop Box. Maximum File Size is 10MB (10,240KB).</h3>
                                                    <div className='nested-div'>
                                                        <Upload {...props}>
                                                            <Button>
                                                                <Icon type="upload" /> Click to Upload
                                                            </Button>
                                                        </Upload>

                                                        {/* table */}
                                                        <hr/>
                                                        <List/>
                                                    </div>
                                                </Row>
                                            </div>
                                        </Content>
                                    </Layout>
                                    {/* Card Starts */}
                                </Layout>
                            </div>)
                }
            </div>//main div
        )//return
    }//render
}
function mapStateToProp(state) {
    return ({
        // allStudents: state.root.allStudents
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        // fetchAllStudents: () => { dispatch(fetchAllStudentsAction()) },
        // signout: (key) => { dispatch(signoutAction(key)) }
    })
}
export default connect(mapStateToProp, mapDispatchToProp)(UploadDropbox);

