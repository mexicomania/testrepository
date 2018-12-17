import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Tooltip, Icon, Row, Col, Checkbox, Button, Radio, Select, } from 'antd';
import './alien-part1.2.css';

import { countriesName } from '../../../../../services/countries';
import InputMask from 'react-input-mask';

const { TextArea } = Input;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const countries = countriesName();

class AlienPart2 extends Component {
    state = {
        confirmDirty: false,
        alien_other_nationality:false,
        alien_other_passport:false,
        alien_other_permanent_resident:false,
        alien_lost_passport:false
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    onChangeName = (name,e) => {
        console.log('checked on name', e.target.value);
        this.setState({
            [name]: e.target.value,
        });
    }
    onChangeCheckBox = (name, e) => {
        console.log('chekedmark!', e.target.checked)
        console.log('chekedmark name!', name)
        this.setState({ [name]: e.target.checked })
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
            <div id="alien-part1-citizenship">
                <h3>Alien Part 1.2 Citizenship</h3>

                <p>Alien's Citizenship and Birth Information</p>
                <Form onSubmit={this.handleSubmit.bind(this)} className="alien-part1-citizenship-form">
                <span className="ant-form-text" style={{marginBottom:'10px',width:'100%',textAlign:'center'}}>
                    <b>Birth Information</b>
                </span>
                    <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={(
                            <span>
                                Date of Birth&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('alien_date_of_birth', {
                            rules: [{ required: true, message: 'Please input dob!', whitespace: true }],
                        })(
                            <Row gutter={16}>
                                <Col span={16}>
                                <InputMask className="input-mask" mask="99/99/9999" placeholder="mm/dd/yyy" />
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={(
                            <span>
                                Municipality or City of Birth&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('alien_city_of_birth', {
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
                                Province of Birth&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('alien_province_of_birth', {
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
                                Country of Birth&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('alien_country_of_birth', {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row gutter={16}>
                                <Col span={16} >
                                    <Input style={{ maxWidth: '300px' }} />
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                <span className="ant-form-text" style={{marginBottom:'10px',width:'100%',textAlign:'center'}}>
                    <b>Citizenship Information</b>
                </span>
                    <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={(
                            <span>
                                Country of Citizenship&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('alien_country_of_citizenship', {
                            rules: [{ required: true, message: 'Please input your country!', whitespace: true }],
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
                                National Identification Number&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('alien_NIN', {
                            rules: [{ required: true, message: 'Please input NIN!', whitespace: true }],
                        })(
                            <Row gutter={16}>
                                <Col span={16}>
                                <InputMask className="input-mask" mask="999-999-999-999" placeholder="000-000-000-000" />
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    <FormItem 
                        colon={false}
                        label={(
                            <span>
                                Do you hold or have you held any nationality other than the one indicated above on Country of Citizenship?&nbsp;
                            </span>)}
                    >
                        {getFieldDecorator('alien_other_nationality', {
                            rules: [{ required: false, message: 'Please choose any one!', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this,'alien_other_nationality')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>    
                    {(this.state.alien_other_nationality)?
                    (
                        <div>
                        <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={(
                            <span>
                                Other Country/Region of Origin&nbsp;
                        </span>
                        )}
                        style={{alignItems: 'center',display: 'flex'}}
                    >
                        {getFieldDecorator(`alien_other_country`, {
                            rules: [{ required: false, message: 'Please select your country!', whitespace: true }],
                        })(
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
                        )}
                    </FormItem>
                        <FormItem 
                            colon={false}
                            label={(
                                <span>
                                   Do you hold a passport for the other country/region of origin (nationality) above?&nbsp;
                                </span>)}
                        >
                            {getFieldDecorator('alien_other_passport', {
                                rules: [{ required: false, message: 'Please choose any one!', whitespace: true }],
                            })(
                                <Row>
                                    <Col span={16} style={{textAlign:'center'}}>
                                        <RadioGroup onChange={this.onChangeName.bind(this,'alien_other_passport')}>
                                            <Radio value={false}>No</Radio>
                                            <Radio value={true}>Yes</Radio>
                                        </RadioGroup>
                                    </Col>
                                </Row>
                            )}
                        </FormItem>
                        {(this.state.alien_other_passport)?
                        (
                            <FormItem
                            {...formItemLayout}
                            colon={false}
                            label={(
                                <span>
                                    Other Passport Number&nbsp;
                            </span>
                            )}
                        >
                            {getFieldDecorator('alien_other_passport_number', {
                                rules: [{ required: false, message: 'Please input passport number!', whitespace: true }],
                            })(
                                <Row gutter={16}>
                                    <Col span={16}>
                                        <Input style={{ maxWidth: '300px' }} />
                                    </Col>
                                </Row>
                            )}
                        </FormItem>
                        ):(null)}
                    </div>
                    ):(null)}
                     <FormItem 
                            colon={false}
                            label={(
                                <span>
                                   Are you a permanent resident of a country / region other than your country / region of origin (nationality) indicated above?&nbsp;
                                </span>)}
                        >
                            {getFieldDecorator('alien_other_permanent_resident', {
                                rules: [{ required: false, message: 'Please choose any one!', whitespace: true }],
                            })(
                                <Row>
                                    <Col span={16} style={{textAlign:'center'}}>
                                        <RadioGroup onChange={this.onChangeName.bind(this,'alien_other_permanent_resident')}>
                                            <Radio value={false}>No</Radio>
                                            <Radio value={true}>Yes</Radio>
                                        </RadioGroup>
                                    </Col>
                                </Row>
                            )}
                        </FormItem>
                    {(this.state.alien_other_permanent_resident)?
                    (
                        <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={(
                            <span>
                                Other Permanent Resident&nbsp;
                        </span>
                        )}
                        style={{alignItems: 'center',display: 'flex'}}
                    >
                        {getFieldDecorator(`alien_other_permanent_resident_country`, {
                            rules: [{ required: false, message: 'Please select your country!', whitespace: true }],
                        })(
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
                        )}
                    </FormItem>   
                    ):(null)}
                    <FormItem
                        className="fixed_radio_label"
                        {...formItemLayout}
                        colon={false}
                        label={(
                        <span>
                            Have ever had a passport lost or stolen?&nbsp;
                        </span>)}
                    >
                        {getFieldDecorator(`alien_lost_passport`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={24}>
                                    <RadioGroup onChange={this.onChangeName.bind(this,'alien_lost_passport')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.alien_lost_passport)? 
                    (
                        <div>
                        <FormItem
                            {...formItemLayout}
                            colon={false}
                            label={(
                                <span>
                                    Lost Passport Number&nbsp;
                            </span>
                            )}
                        >
                            {getFieldDecorator('alien_lost_passport_number', {
                                rules: [{ required: false, message: 'Please input passport number!', whitespace: true }],
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
                                    Country that Issued the Lost Passport&nbsp;
                            </span>
                            )}
                            style={{alignItems: 'center',display: 'flex'}}
                        >
                            {getFieldDecorator(`alien_country_issued_lost_passport`, {
                                rules: [{ required: false, message: 'Please select your country!', whitespace: true }],
                            })(
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
                            )}
                        </FormItem>
                        <FormItem
                            className="fixed_radio_label"
                            {...formItemLayout}
                            colon={false}
                            label={(
                                <span>
                                    Explain the circumstances of loosing your passport.&nbsp;
                                </span>
                            )}
                        >
                            {getFieldDecorator('alien_lost_passport_description', {
                                rules: [{ required: false, message: 'Please input passport number!', whitespace: true }],
                            })(
                                <Row gutter={16}>
                                    <Col span={16}>
                                        <TextArea rows={3} style={{ maxWidth: '300px' }} />
                                    </Col>
                                </Row>
                            )}
                        </FormItem>
                        </div>
                    ):(null)}
                    <Button type="primary" htmlType="submit">SaveandContinue</Button>
                </Form>
            </div>


        );
    }
}

const AlienTwo = Form.create()(AlienPart2);

export default AlienTwo;
