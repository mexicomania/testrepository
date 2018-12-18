import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Tooltip, Icon, Row, Col, Checkbox, Button, Radio, Select } from 'antd';
import './alien-part1.4.css';

import { countriesName, states } from '../../../../../services/countries';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const countries = countriesName();
const US_states = states();

class AlienPart4 extends Component {
    state = {
        confirmDirty: false,
        sponsors_A: false,
        alien_mail: true,
        alien_social_security_number: false,
        alien_US_tax_id: false,
        alien_mailing_care_of_name: false,
        alien__mailing_apartment_number: false,
        alien_mailing_province: false,
        alien_mailing_postal_code: false
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }


    onChangeCheckBox = (name, e) => {
        console.log('checked on', name, e.target.checked);
        this.setState({ [name]: e.target.checked })
    }

    onChangeName = (name, e) => {
        console.log('checked on maiden1', e.target.value);
        this.setState({
            [name]: e.target.value,
        });
    }

    handleSelectChange = (value) => {
        console.log(`selected ${value}`);
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
            <div id="alien-part4-contact">
                <h3>Alien Part 1.4 Contact</h3>

                <p>Alien's Contact Information</p>
                <Form onSubmit={this.handleSubmit.bind(this)} className="alien-part4-contact-form">
                    <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={(
                            <span>
                                Alien's Email Address&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('alien_email_address', {
                            rules: [{ required: false, message: 'Please input your email address!', whitespace: true }],
                        })(
                            <Row gutter={16}>
                                <Col span={16}>
                                    <Input style={{ maxWidth: '300px' }} />
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={(
                            <span>
                                Daytime Phone Number&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('alien_phone_number', {
                            rules: [{ required: false, message: 'Please input your phone number!', whitespace: true }],
                        })(
                            <Row gutter={16}>
                                <Col span={16}>
                                    <Input style={{ maxWidth: '300px' }} />
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={(
                            <span>
                                Mobile Number&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('alien_mobile_number', {
                            rules: [{ required: false, message: 'Please input your mobile number!', whitespace: true }],
                        })(
                            <Row gutter={16}>
                                <Col span={16}>
                                    <Input style={{ maxWidth: '300px' }} />
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={(
                            <span>
                                Alien registration Number or A#&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('alien_registration_number', {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row gutter={16}>
                                <Col span={16}>
                                    <Input style={{ maxWidth: '300px' }} />
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={(
                            <span>
                                United States Tax ID&nbsp;
                        </span>
                        )}
                    >
                        <Row gutter={16}>
                            <Col span={16}>
                                {getFieldDecorator('alien_US_tax_id', {
                                    rules: [{ required: false, message: 'Please input your email address!', whitespace: true }],
                                })(
                                    <div>
                                        {(!this.state.alien_US_tax_id) ?
                                            (
                                                <Input disabled={false} defaultValue={''} style={{ maxWidth: '300px' }} />
                                            ) : (
                                                <Input disabled={true} defaultValue="N/A" style={{ maxWidth: '300px' }} />
                                            )}
                                    </div>
                                )}
                            </Col>

                            <Col span={8}>
                                <FormItem>
                                    <Checkbox onChange={this.onChangeCheckBox.bind(this, 'alien_US_tax_id')}>Does not apply </Checkbox>
                                    <Tooltip placement="right" title="Do not add dashes in number">
                                        <Icon type="question-circle-o" />
                                    </Tooltip>
                                </FormItem>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={(
                            <span>
                                U.S. Social Security Number&nbsp;
                        </span>
                        )}
                    >
                        <Row gutter={16}>
                            <Col span={16}>
                                {getFieldDecorator('alien_social_security_number', {
                                    rules: [{ required: false, message: 'Please input your email address!', whitespace: true }],
                                })(
                                    <div>
                                        {(!this.state.alien_social_security_number) ?
                                            (
                                                <Input disabled={false} defaultValue={''} style={{ maxWidth: '300px' }} />
                                            ) : (
                                                <Input disabled={true} defaultValue="N/A" style={{ maxWidth: '300px' }} />
                                            )}
                                    </div>
                                )}
                            </Col>

                            <Col span={8}>
                                <FormItem>
                                    <Checkbox onChange={this.onChangeCheckBox.bind(this, 'alien_social_security_number')}>Does not apply </Checkbox>
                                    <Tooltip placement="right" title="Do not add dashes in number">
                                        <Icon type="question-circle-o" />
                                    </Tooltip>
                                </FormItem>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={(
                            <span>
                                USCIS Online Account Number&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('alien_USCIS_account_number', {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row gutter={16}>
                                <Col span={16} >
                                    <Input style={{ maxWidth: '300px' }} />
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    <FormItem
                        colon={false}
                        label={(<span>Is your current mailing address the same as your physical address?</span>)}
                    >
                        {getFieldDecorator(`same_mailing_address`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'alien_mail')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>

                    {(this.state.alien_mail) ?
                        (null) :
                        (
                            <div>
                                <FormItem
                                    {...formItemLayout}
                                    colon={false}
                                    label={(
                                        <span>
                                            In Care Of Name&nbsp;
                                        </span>
                                    )}
                                >
                                    <Row gutter={16}>
                                        <Col span={16}>
                                            {getFieldDecorator('alien_mailing_care_of_name', {
                                                rules: [{ required: false, message: 'Please input your name!', whitespace: true }],
                                            })(
                                                <div>
                                                    {(!this.state.alien_mailing_care_of_name) ?
                                                        (
                                                            <Input disabled={false} defaultValue={''} style={{ maxWidth: '300px' }} />
                                                        ) : (
                                                            <Input disabled={true} defaultValue="N/A" style={{ maxWidth: '300px' }} />
                                                        )}
                                                </div>
                                            )}
                                        </Col>

                                        <Col span={8}>
                                            <FormItem>
                                                <Checkbox onChange={this.onChangeCheckBox.bind(this, 'alien_mailing_care_of_name')}>Does not apply </Checkbox>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    colon={false}
                                    label={(
                                        <span>
                                            Number and street&nbsp;
                                        </span>
                                    )}
                                >
                                    {getFieldDecorator('alien_mailing_number_and_street', {
                                        rules: [{ required: false, message: '', whitespace: true }],
                                    })(
                                        <Row gutter={16}>
                                            <Col span={16} >
                                                <Input style={{ maxWidth: '300px' }} />
                                            </Col>
                                        </Row>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    colon={false}
                                    label={(
                                        <span>
                                            Apartment number&nbsp;
                                        </span>
                                    )}
                                >
                                    <Row gutter={16}>
                                        <Col span={16}>
                                            {getFieldDecorator('alien__mailing_apartment_number', {
                                                rules: [{ required: false, message: 'Please input your name!', whitespace: true }],
                                            })(
                                                <div>
                                                    {(!this.state.alien__mailing_apartment_number) ?
                                                        (
                                                            <Input disabled={false} defaultValue={''} style={{ maxWidth: '300px' }} />
                                                        ) : (
                                                            <Input disabled={true} defaultValue="N/A" style={{ maxWidth: '300px' }} />
                                                        )}
                                                </div>
                                            )}
                                        </Col>

                                        <Col span={8}>
                                            <FormItem>
                                                <Checkbox onChange={this.onChangeCheckBox.bind(this, 'alien__mailing_apartment_number')}>Does not apply </Checkbox>
                                                <Tooltip title={'Do not add Apt or #'}>
                                                    <Icon type="question-circle-o" />
                                                </Tooltip>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    colon={false}
                                    label={(
                                        <span>
                                            Municipality or Town or City&nbsp;
                                    </span>
                                    )}
                                >
                                    {getFieldDecorator('alien_mailing_town_or_city', {
                                        rules: [{ required: true, message: 'Please input your town or city!', whitespace: true }],
                                    })(
                                        <Row gutter={16}>
                                            <Col span={16}>
                                                <Input style={{ maxWidth: '300px' }} />
                                            </Col>
                                        </Row>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    colon={false}
                                    label={(
                                        <span>
                                            Country&nbsp;
                                        </span>
                                    )}
                                >
                                    {getFieldDecorator('alien_mailing_country', {
                                        rules: [{ required: false, message: 'Please select your country!', whitespace: true }],
                                    })(
                                        <Row gutter={16}>
                                            <Col span={16} >
                                                <Select
                                                    style={{ maxWidth: '300px' }}
                                                    placeholder="Select Country"
                                                    showSearch={true}
                                                    onChange={this.handleSelectChange}
                                                >
                                                    {
                                                        countries.map((val, index) => {
                                                            return (
                                                                <Option key={index} value={val.name}>{val.name}</Option>
                                                            )
                                                        })
                                                    }
                                                </Select>
                                            </Col>
                                        </Row>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    colon={false}
                                    label={(
                                        <span>
                                            U.S. State&nbsp;
                                        </span>
                                    )}
                                >
                                    {getFieldDecorator('alien_mailing_state', {
                                        rules: [{ required: false, message: 'Please select your State!', whitespace: true }],
                                    })(
                                        <Row gutter={16}>
                                            <Col span={16} >
                                                <Select
                                                    style={{ maxWidth: '300px' }}
                                                    placeholder="Select State"
                                                    showSearch={true}
                                                    onChange={this.handleSelectChange}
                                                >
                                                    {
                                                        US_states.map((val, index) => {
                                                            return (
                                                                <Option key={index} value={val.name}>{val.name}</Option>
                                                            )
                                                        })
                                                    }
                                                </Select>
                                            </Col>
                                            <Col span={8}>
                                                <FormItem
                                                // {...tailFormItemLayout}
                                                >
                                                    <Tooltip title="Select Does not Apply if not USA">
                                                        <Icon type="question-circle-o" />
                                                    </Tooltip>
                                                </FormItem>
                                            </Col>
                                        </Row>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    colon={false}
                                    label={(
                                        <span>
                                            Province&nbsp;
                                        </span>
                                    )}
                                >
                                    <Row gutter={16}>

                                        <Col span={16} >
                                            {getFieldDecorator('alien_mailing_province', {
                                                rules: [{ required: false, message: '', whitespace: true }],
                                            })(
                                                <div>
                                                    {(!this.state.alien_mailing_province) ?
                                                        (
                                                            <Input disabled={false} defaultValue={''} style={{ maxWidth: '300px' }} />
                                                        ) : (
                                                            <Input disabled={true} defaultValue="N/A" style={{ maxWidth: '300px' }} />
                                                        )}
                                                </div>
                                            )}
                                        </Col>

                                        <Col span={8}>

                                            <FormItem
                                            //  {...tailFormItemLayout}
                                            >
                                                <Checkbox onChange={this.onChangeCheckBox.bind(this, 'alien_mailing_province')}>Does not apply </Checkbox>
                                                <Tooltip title="Fill This">
                                                    <Icon type="question-circle-o" />
                                                </Tooltip>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    colon={false}
                                    label={(
                                        <span>
                                            Postal Code&nbsp;
                                        </span>
                                    )}
                                >
                                    <Row gutter={16}>
                                        <Col span={16} >
                                            {getFieldDecorator('alien_mailing_postal_code', {
                                                rules: [{ required: false, message: '', whitespace: true }],
                                            })(
                                                <div>
                                                    {(this.state.alien_mailing_postal_code === false) ?
                                                        (
                                                            <Input disabled={false} defaultValue={''} style={{ maxWidth: '300px' }} />
                                                        ) : (
                                                            <Input disabled={true} defaultValue="N/A" style={{ maxWidth: '300px' }} />
                                                        )}
                                                </div>
                                            )}
                                        </Col>

                                        <Col span={8}>

                                            <FormItem
                                            //  {...tailFormItemLayout}
                                            >
                                                <Checkbox onChange={this.onChangeCheckBox.bind(this, 'alien_mailing_postal_code')}>Does not apply </Checkbox>
                                                <Tooltip title="Fill This">
                                                    <Icon type="question-circle-o" />
                                                </Tooltip>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                </FormItem>
                            </div>
                        )
                    }

                    <Button type="primary" htmlType="submit">SaveandContinue</Button>
                </Form>
            </div>


        );
    }
}

const AlienFour = Form.create()(AlienPart4);

export default AlienFour;
