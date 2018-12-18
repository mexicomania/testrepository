import React, { Component } from 'react';
import { Icon, Form, Input, Button, } from 'antd';
import './add-user.css';
import { connect } from 'react-redux'; 
import userActions from '../../store/actions/userActions';

const FormItem = Form.Item;
const { registerUser } = userActions;

class AddUserForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                values['role'] = 'user';
                this.props.registerUser(values)
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { isLoading,isError } = this.props.userState;
        return (
            <div id="add-user-form">
            { isError ? (
                <span className="ant-form-text" style={{marginBottom:'10px',color:'red'}}>Error:something went error</span>        
                ) : (null)
            }
            <Form  onSubmit={this.handleSubmit} className="add-form">
                <span className="ant-form-text" style={{marginBottom:'10px'}}><b>Add User Form</b></span>
                <FormItem>
                    {getFieldDecorator('first_name', {
                        rules: [{ required: true, message: 'Please input your first name!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="First Name" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('last_name', {
                        rules: [{ required: true, message: 'Please input your last name!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Last Name" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('email', {
                        rules: [
                            { type: 'email', message: 'The input is not valid E-mail!' },
                            { required: true, message: 'Please input your email!' }
                        ],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" loading={isLoading} className="add-form-button">
                        Add
                </Button>
                    <Button className="add-form-button default-btn">
                        Cancel
                </Button>
                </FormItem>
            </Form>
            </div>
        );
    }
}

export default 
connect(
    state =>{
      console.log(state)
       return {
            userState:state.user
        }
    },
    {registerUser}
  )(Form.create()(AddUserForm));