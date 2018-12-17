import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Input, Form, Row, Col, Button, Layout } from 'antd';
import EditorComponent from '../editor/editor';
import MessagesListComponent from './messages';
import './messages.css';

const Search = Input.Search;


class MessageComponent extends Component {
    state = {
        message:'',
        newMessage:false,
        messagesArr:[]
    };


    createMessage(){
        this.setState({newMessage:!this.state.newMessage})
    }

    getEditorValue(message){
        let arr = this.state.messagesArr || [];
        arr.push(message)
        console.log(arr)
        this.setState({message:message,messagesArr:arr})        
    }

    render() {
        const { messagesArr } = this.state;
        return (
            <div>
                <div style={{ background: '#fff' }}>
                    <Row>
                        {(this.state.newMessage) ? 
                        (
                            <Col span={24}>
                                <EditorComponent buttonText="Send Message" getValue={this.getEditorValue.bind(this)}/> 
                            </Col>
                        ) : (
                            <Col span={24} style={{textAlign:'center'}}>
                                <Search size="large"
                                placeholder="input search text"
                                onSearch={value => console.log(value)}
                                style={{ width: 400 }}
                                />
                            </Col>
                        )}                                 
                    </Row>
                    <Row style={{textAlign:'right',marginBottom:'20px'}}>
                    <Button onClick={this.createMessage.bind(this)}>
                    {(this.state.newMessage)?'Close':'New Message'}</Button>
                    </Row>
                    <Row>
                        <MessagesListComponent list={messagesArr}/>
                    </Row>
                </div>
            </div>
        )
    }
}


export default connect(
    state => {
        return{
            messagesState:state.messages
        }
    },{}
)(MessageComponent);

