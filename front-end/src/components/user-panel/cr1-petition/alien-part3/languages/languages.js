import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Row, Col, Button, Radio, Select } from 'antd';
import './languages.css';

const FormItem = Form.Item;
const InputText = Input.TextArea;
const RadioGroup = Radio.Group;


class Languages extends Component {
    state = {
        is_alien_worked_for_organization:false,
        is_alien_arrested_for_crimes:false,
        is_alien_belong_clan_or_tribe:false
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    onChangeName = (name, e) => {
        console.log('checked on maiden1', e.target.value);
        this.setState({
            [name]: e.target.value,
        });
    }


    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        return (
            <div id="alien-part3-languages">
                <h3>Alien Part 3.7 Languages</h3>

                <p>Languages</p>
                <p>All questions are about the Alien (foreign citizen).</p>
                <Form onSubmit={this.handleSubmit.bind(this)} className="alien-part3-languages-form">
                <p>Provide a List of Languages You Speak</p>
                    <LanguagesFields
                        getFieldDecorator={getFieldDecorator}
                        formItemLayout={formItemLayout}/>
                                                 
                    <Button type="primary" htmlType="submit">SaveandContinue</Button>
                </Form>
            </div >


        );
    }
}

export default Form.create()(Languages);


const LanguagesFields = ({ getFieldDecorator, formItemLayout }) => {
    return (
        <div>
            <FormItem
                {...formItemLayout}
                colon={false}
                label="Language #1">
                <Row gutter={16}>
                    <Col span={16}>
                        {getFieldDecorator(`alien_language_1`, {
                            rules: [{ required: false, message: 'Please input Language!', whitespace: true }],
                        })(
                            <Input style={{ maxWidth: '300px' }} />
                        )}
                    </Col>
                </Row>
            </FormItem>
            <FormItem
                {...formItemLayout}
                colon={false}
                label="Language #2">
                <Row gutter={16}>
                    <Col span={16}>
                        {getFieldDecorator(`alien_language_2`, {
                            rules: [{ required: false, message: 'Please input Language!', whitespace: true }],
                        })(
                            <Input style={{ maxWidth: '300px' }} />
                        )}
                    </Col>
                </Row>
            </FormItem>
            <FormItem
                {...formItemLayout}
                colon={false}
                label="Language #3">
                <Row gutter={16}>
                    <Col span={16}>
                        {getFieldDecorator(`alien_language_3`, {
                            rules: [{ required: false, message: 'Please input Language!', whitespace: true }],
                        })(
                            <Input style={{ maxWidth: '300px' }} />
                        )}
                    </Col>
                </Row>
            </FormItem>
            <FormItem
                {...formItemLayout}
                colon={false}
                label="Language #4">
                <Row gutter={16}>
                    <Col span={16}>
                        {getFieldDecorator(`alien_language_4`, {
                            rules: [{ required: false, message: 'Please input Language!', whitespace: true }],
                        })(
                            <Input style={{ maxWidth: '300px' }} />
                        )}
                    </Col>
                </Row>
            </FormItem>
            <FormItem
                {...formItemLayout}
                colon={false}
                label="Language #5">
                <Row gutter={16}>
                    <Col span={16}>
                        {getFieldDecorator(`alien_language_5`, {
                            rules: [{ required: false, message: 'Please input Language!', whitespace: true }],
                        })(
                            <Input style={{ maxWidth: '300px' }} />
                        )}
                    </Col>
                </Row>
            </FormItem>
        </div>
    )
}
