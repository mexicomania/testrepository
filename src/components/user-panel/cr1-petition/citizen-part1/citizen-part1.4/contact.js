import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Tooltip, Icon, Row, Col, Checkbox, Button, Radio, Select } from 'antd';
import './contact.css';

import { countriesName, states } from '../../../../../services/countries';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const countries = countriesName();
const US_states = states();

class Contact extends Component {
    state = {
        confirmDirty: false,
        sponsors_A: false,
        province:false,
        mail: ''
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
        this.setState({ [name]: e.target.checked })
    }

    onChangeMail = (e) => {
        console.log('checked on maiden1', e.target.value);
        this.setState({
            mail: e.target.value,
        });
    }

    handleSelectChange = (value) => {
        console.log(`selected ${value}`);
    }

    componentDidMount() {

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
            <div id="citizen-part-contact">
                <h3>Citizen Part 1.4 Contact</h3>

                <p>Sponsor's Contact Information</p>
                <Form onSubmit={this.handleSubmit.bind(this)} className="citizen-part-contact-form">
                    <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={(
                            <span>
                                Email address&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('email_address', {
                            rules: [{ required: false, message: 'Please input your email address!', whitespace: true }],
                        })(
                            <Row gutter={16}>
                                <Col span={16}>
                                    <Input style={{ maxWidth: '300px' }} />
                                </Col>

                                <Col span={8}>
                                    <FormItem
                                    // {...tailFormItemLayout}
                                    >
                                        <Tooltip placement="right" title="should be valid for next 3 years">
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
                                Daytime Phone Number&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('phone_number', {
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
                        {getFieldDecorator('mobile_number', {
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
                                USCIS Online Account Number&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('USCIS_account_number', {
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
                                Social Security Number&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('social_security_number', {
                            rules: [{ required: false, message: 'Please input your email address!', whitespace: true }],
                        })(
                            <Row gutter={16}>
                                <Col span={16}>
                                    <Input style={{ maxWidth: '300px' }} />
                                </Col>

                                <Col span={8}>
                                    <FormItem>
                                        <Tooltip placement="right" title="Do not add dashes in number">
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
                                Sponsor's A#&nbsp;
                        </span>
                        )}
                    >
                        <Row gutter={16}>
                            <Col span={16} >
                                {getFieldDecorator('sponsors_A', {
                                    rules: [{ required: false, message: '', whitespace: true }],
                                })(
                                    <div>

                                        {(this.state.sponsors_A === false) ?
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
                                    <Checkbox onChange={this.onChangeCheckBox.bind(this, 'sponsors_A')}>Does not apply </Checkbox>
                                    <Tooltip title="The Alien Registration Number or Alien Number(A Number or A#) is a unique seven-, eight- or nine-digit number assigned to a noncitizen by the Department of Homeland Security. This is not the same as the receipt number used for tracking your case. The A Number never includes letters but often has the letter A in front of it (the A is not part of the number). If you were not born in the USA, you probably had an A# at some point. If you were born in the USA or you are now a U.S. citizen you can enter None here.">
                                        <Icon type="question-circle-o" />
                                    </Tooltip>
                                </FormItem>
                            </Col>
                        </Row>
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={(<span>Is your current mailing address the same as your physical address?</span>)}
                    >
                        {getFieldDecorator(`same_mailing_address`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row style={{ marginLeft: '5px' }}>
                                <Col span={16}>
                                    <RadioGroup onChange={this.onChangeMail}>
                                        <Radio value={'No'}>No</Radio>
                                        <Radio value={"Yes"}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>

                    {(this.state.mail == 'No') ?
                        (
                            <div>
                                <p>Enter your mailing address only if it is different than your physical address. Using a Post Office box or a foreign address is risky and should be avoided unless it is your only option for mail delivery.</p>
                                <FormItem
                                    {...formItemLayout}
                                    colon={false}
                                    label={(
                                        <span>
                                            Number and street&nbsp;
                        </span>
                                    )}
                                >
                                    {getFieldDecorator('number_and_street', {
                                        rules: [{ required: false, message: '', whitespace: true }],
                                    })(
                                        <Row gutter={16}>
                                            <Col span={16} >
                                                <Input style={{ maxWidth: '300px' }} />
                                            </Col>

                                            <Col span={8} >
                                                <FormItem >
                                                    <Tooltip title="Fill This">
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
                                            Town or City&nbsp;
                        </span>
                                    )}
                                >
                                    {getFieldDecorator('town_or_city', {
                                        rules: [{ required: true, message: 'Please input your town or city!', whitespace: true }],
                                    })(
                                        <Row gutter={16}>
                                            <Col span={16}>
                                                <Input style={{ maxWidth: '300px' }} />
                                            </Col>

                                            <Col span={8}>
                                                <FormItem
                                                // {...tailFormItemLayout}
                                                >
                                                    <Tooltip placement="right" title="Fill This">
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
                                            U.S. State&nbsp;
                        </span>
                                    )}
                                >
                                    {getFieldDecorator('state', {
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
                                            Country&nbsp;
                        </span>
                                    )}
                                >
                                    {getFieldDecorator('country', {
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
                                            Province&nbsp;
                        </span>
                                    )}
                                >
                                    <Row gutter={16}>
                                        <Col span={16} >
                                            {getFieldDecorator('province', {
                                                rules: [{ required: false, message: '', whitespace: true }],
                                            })(
                                                <div>

                                                    {(this.state.province === false) ?
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
                                                <Checkbox onChange={this.onChangeCheckBox.bind(this, 'province')}>Does not apply </Checkbox>
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
                                    {getFieldDecorator('postal_code', {
                                        rules: [{ required: false, message: '', whitespace: true }],
                                    })(
                                        <Row gutter={16}>

                                            <Col span={16} >
                                                <Input style={{ maxWidth: '300px' }} />
                                            </Col>
                                        </Row>
                                    )}
                                </FormItem>
                            </div>
                        ) : (null)
                    }

                    <Button type="primary" htmlType="submit">SaveandContinue</Button>
                </Form>
            </div>


        );
    }
}

const CitizenFour = Form.create()(Contact);

export default CitizenFour;
