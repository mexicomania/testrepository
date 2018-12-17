import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Form, Icon, Input, Button } from 'antd';
import './login.css';
import authActions from '../../store/actions/authActions';

const { signin, logout } = authActions;
const FormItem = Form.Item;


class Login extends Component {
  state = {
    resetPassword: false
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.signin(values)
        this.props.onClick();
        this.props.history.push('/dashboard')

      }
    });
  }

  logOut() {
    this.props.logout();
    this.props.onClick();
    this.props.history.push('/')
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {  loginState } = this.props;
    const { isError, error, isLoading, isLoggedIn } = this.props.authState;
    console.log(this.props.authState)
    return (
      <div id="login-form">
        {isError ? (
          <span className="ant-form-text" style={{ marginBottom: '10px', color: 'red' }}>Error:Autherization Failed</span>
        ) : (null)
        }

        {isLoggedIn || loginState ? (
          this.state.resetPassword ?
            (<Form id="components-form-demo-normal-login" onSubmit={this.handleSubmit} className="login-form">
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('new_password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="New Password" />
                )}
              </FormItem>
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  loading={isLoading}
                >
                  Change Password
            </Button>
                <Button
                  type="primary"
                  onClick={() => this.setState({ resetPassword: false })}
                  className="login-form-button"
                >
                  Cancel
            </Button>
              </FormItem>
            </Form>)
            :
            (<div>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button btns"
                onClick={() => this.setState({ resetPassword: true })}
                style={{ marginBottom: '5px' }}
              >
                Change Password
      </Button><br />
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button btns"
                loading={isLoading}
                onClick={this.logOut.bind(this)}
              >
                Logout
      </Button>
            </div>)

        ) : (
            <Form id="components-form-demo-normal-login" onSubmit={this.handleSubmit} className="login-form">
              <FormItem>
                {getFieldDecorator('email', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                )}
              </FormItem>
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  loading={isLoading}
                >
                  Sign in
                </Button>
                <a className="login-form-forgot" href="#">Forgot password</a>
              </FormItem>
            </Form>
          )
        }
      </div>
    );
  }
}

export default
  connect(
    state => {
      return {
        authState: state.auth
      }
    },
    { signin, logout }
  )(Form.create()(Login))
