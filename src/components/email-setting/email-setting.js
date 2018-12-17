import React, { Component } from 'react';
import { Form, Input, Button,Switch } from 'antd';
import './email-setting.css';
import { connect } from 'react-redux';
import emailSettingActions from '../../store/actions/emailSettingActions';

const FormItem = Form.Item;
const { TextArea } = Input;

const { getEmailSetting,addEmailSetting,updateEmailSetting } = emailSettingActions;

const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 },
  };

class EmailSetting extends Component {
    constructor(props){
        super(props);
        this.props.getEmailSetting();
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.addEmailSetting(values)
            }
        });
    }

    componentDidMount(){
    }



    render() {
        const { getFieldDecorator } = this.props.form;
        const { isLoading,isError } = this.props.emailSettingState;
        console.log(this.props.emailSettingState)
        const { support_email,
            support_email_msg,
            support_email_res_mg,
            with_support_msg,
            with_review_request } = this.props.emailSettingState.emailSetting || '';
        return (
            <div id="email-setting-form">
             { isError ? (
                    <span className="ant-form-text" style={{marginBottom:'10px',color:'red'}}>Error:something went error</span>        
                    ) : (null)
                }
            <Form onSubmit={this.handleSubmit} className="add-form">
                <span className="ant-form-text" style={{marginBottom:'10px'}}><b>Email Setting</b></span>
                <FormItem {...formTailLayout} label="Support Email">
                    {getFieldDecorator('support_email', {
                        initialValue:support_email,
                        rules: [
                            { type: 'email', message: 'The input is not valid E-mail!' },
                            { required: true, message: 'Please input support email!' }
                        ],
                    })(
                        <Input placeholder="Support Email"/>
                    )}
                </FormItem>
                <FormItem {...formTailLayout} label="Support Email Message">
                    {getFieldDecorator('support_email_msg', {
                        initialValue:support_email_msg,
                        rules: [{ required: false, message: 'Please input primary domain name!' }],
                    })(
                        <TextArea rows={4} placeholder="Type here" />
                    )}
                </FormItem>
                <FormItem {...formTailLayout} label="Review Email Response Message">
                    {getFieldDecorator('support_email_res_mg', {
                        initialValue:support_email_res_mg,
                        rules: [{ required: false, message: 'Please input!' }],
                    })(
                        <TextArea rows={4} placeholder="Type here" />
                    )}
                </FormItem>
                <FormItem {...formTailLayout} label="Send Email Notice with Support Message">
                    {getFieldDecorator('with_support_msg', {
                        initialValue:with_support_msg == 1 ? true : false, 
                        valuePropName: 'checked' })(
                    <Switch />
                    )}
                </FormItem>
                <FormItem {...formTailLayout} label="Send Email Notice with Review Request">
                    {getFieldDecorator('with_review_request', {
                        initialValue:with_review_request == 1 ? true : false, 
                        valuePropName: 'checked' })(
                    <Switch />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" loading={isLoading} className="add-form-button">
                        Save
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

export default connect(
    state => {
       return {
            emailSettingState:state.emailSetting
        }
    },
    {getEmailSetting,addEmailSetting,updateEmailSetting}
  )(Form.create()(EmailSetting));