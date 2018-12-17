import React, { Component } from 'react';
import { Form, Input, Button,Switch } from 'antd';
import './mailing-instruction.css';

const FormItem = Form.Item;
const { TextArea } = Input;


const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 },
  };

class MailingInstruction extends Component {
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div id="mailing-instruction-form">
            <Form onSubmit={this.handleSubmit} className="add-form">
                <span className="ant-form-text" style={{marginBottom:'10px'}}><b>Mailing Instruction</b></span>
                <FormItem {...formTailLayout} label="K1 Instructions">
                    {getFieldDecorator('k1_instructions', {
                        rules: [{ required: false, message: 'Please input !' }],
                    })(
                        <TextArea rows={4} placeholder="Type here" />
                    )}
                </FormItem>
                <FormItem {...formTailLayout} label="AOS Instructions">
                    {getFieldDecorator('aos_instruction', {
                        rules: [{ required: false, message: 'Please input!' }],
                    })(
                        <TextArea rows={4} placeholder="Type here" />
                    )}
                </FormItem>
                <FormItem {...formTailLayout} label="CR1 Instructions">
                    {getFieldDecorator('cr1_instruction', {
                        rules: [{ required: false, message: 'Please input!' }],
                    })(
                        <TextArea rows={4} placeholder="Type here" />
                    )}
                </FormItem>
                <FormItem {...formTailLayout} label="ROC Instructions">
                    {getFieldDecorator('roc_instruction', {
                        rules: [{ required: false, message: 'Please input!' }],
                    })(
                        <TextArea rows={4} placeholder="Type here" />
                    )}
                </FormItem>

                <FormItem>
                    <Button type="primary" htmlType="submit" className="add-form-button">
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

export default Form.create()(MailingInstruction);