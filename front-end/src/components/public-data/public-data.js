import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Icon, Form, Input, Button, } from 'antd';
import './public-data.css';
import  PublicDataActions from '../../store/actions/publicDataActions';

const FormItem = Form.Item;
const { getData,addData,updateData,deleteData } = PublicDataActions;

class PublicData extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    componentDidMount(){
        this.props.getData();
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div id="add-public-data-form">
            <Form onSubmit={this.handleSubmit} className="add-form">
                <span className="ant-form-text" style={{marginBottom:'10px'}}><b>Public Data</b></span>
                <FormItem>
                    {getFieldDecorator('Company Name', {
                        rules: [{ required: true, message: 'Please input your company name!' }],
                    })(
                        <Input placeholder="Company Name" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('Primary Domain Name', {
                        rules: [{ required: true, message: 'Please input primary domain name!' }],
                    })(
                        <Input placeholder="Primary Domain Name" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('Sub Domain Name', {
                        rules: [{ required: true, message: 'Please input sub domain name!' }],
                    })(
                        <Input placeholder="Sub Domain Name" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('Support Phone', {
                        rules: [{ required: true, message: 'Please input support phone!' }],
                    })(
                        <Input placeholder="Support Phone" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('Street', {
                        rules: [{ required: true, message: 'Please input street!' }],
                    })(
                        <Input placeholder="Street" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('City', {
                        rules: [{ required: true, message: 'Please input city!' }],
                    })(
                        <Input placeholder="City" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('State', {
                        rules: [{ required: true, message: 'Please input state!' }],
                    })(
                        <Input placeholder="State" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('Postal Code', {
                        rules: [{ required: true, message: 'Please input postal code!' }],
                    })(
                        <Input placeholder="Postal Code" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('Country', {
                        rules: [{ required: true, message: 'Please input country!' }],
                    })(
                        <Input placeholder="Country" />
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

export default
connect(
    state =>{
      console.log(state.publicData)
       return {
            publicDataState:state.publicData
        }
    },
    {getData,addData,updateData,deleteData}
  )(Form.create()(PublicData));