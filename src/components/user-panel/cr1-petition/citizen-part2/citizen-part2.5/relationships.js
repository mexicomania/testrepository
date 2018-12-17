import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Tooltip, Icon, Row, Col, Button, Select,Radio } from 'antd';
import './relationships.css';

import { countriesName, states } from '../../../../../services/countries';
import InputMask from 'react-input-mask';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const countries = countriesName();
const US_states = states();

class Relationships extends Component {
    state = {
        confirmDirty: false,
        live_together:false
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



    handleSelectChange = (value) => {
        console.log(`selected ${value}`);
    }
    onChangeName = (name,e) => {
        console.log(`selected`);
        this.setState({[name]:e.target.value})
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
            <div id="citizen-part2-relationship">
                <h3>Citizen Part 2.5 Relationship</h3>
               <Form onSubmit={this.handleSubmit.bind(this)} className="citizen-part2-relationship-form">
                <span className="ant-form-text" style={{marginBottom:'10px'}}>
                <b>Relationship</b>
                </span>
                    <div className="center-field-label"> 
                    <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={(
                            <span>
                                Wedding Date&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('wedding_date', {
                            rules: [{ required: false, message: 'Please input wedding date!', whitespace: true }],
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
                                Wedding City&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('wedding_city', {
                            rules: [{ required: false, message: 'Please input wedding city!', whitespace: true }],
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
                                Wedding State, Province or Region&nbsp;
                            </span>
                        )}
                    >
                        {getFieldDecorator('wedding_state', {
                            rules: [{ required: false, message: 'Please input wedding state!', whitespace: true }],
                        })(
                            <Row gutter={16}>
                                <Col span={16}>
                                    <Input style={{ maxWidth: '300px' }} />
                                </Col>
                                <Col span={8}>
                                    <FormItem>
                                        <Tooltip placement="right" title="Enter N/A for None">
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
                                Wedding Country&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('wedding_country', {
                            rules: [{ required: false, message: 'Please select wedding country!', whitespace: true }],
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
                    </div>
                    <FormItem
                        className="radio-center"
                        colon={false}
                        label={(<span>
                            Have you and your spouse ever lived together? Do not include vacations. It is not necessary that you have lived together to receive a Spousal Visa.<br/> 
                            Most people applying for Spousal Visa have not lived together and are still approved.</span>)}
                    >
                        {getFieldDecorator(`live_together`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={20} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'live_together')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.live_together) ? 
                    (
                        <div className="center-field-label">
                            
                            <FormItem
                                {...formItemLayout}
                                colon={false}
                                label={(
                                    <span>
                                        Street&nbsp;
                                </span>
                                )}
                            >
                                {getFieldDecorator('lived_street', {
                                    rules: [{ required: false, message: 'Please input street!', whitespace: true }],
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
                                        City&nbsp;
                                </span>
                                )}
                            >
                                {getFieldDecorator('lived_city', {
                                    rules: [{ required: false, message: 'Please input city!', whitespace: true }],
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
                                        State, Province or Region&nbsp;
                                </span>
                                )}
                            >
                                {getFieldDecorator('lived_state', {
                                    rules: [{ required: false, message: 'Please input lived state!', whitespace: true }],
                                })(
                                    <Row gutter={16}>
                                        <Col span={16}>
                                            <Input style={{ maxWidth: '300px' }} />
                                        </Col>
                                        <Col span={8}>
                                            <FormItem>
                                                <Tooltip placement="right" title="Enter N/A for None">
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
                                {getFieldDecorator('lived_country', {
                                    rules: [{ required: false, message: 'Please select lived country!', whitespace: true }],
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
                                        We lived here from&nbsp;
                                </span>
                                )}
                            >
                                {getFieldDecorator('lived_from_date', {
                                    rules: [{ required: false, message: 'Please input lived from date!', whitespace: true }],
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
                                         to&nbsp;
                                </span>
                                )}
                            >
                                {getFieldDecorator('lived_to_date', {
                                    rules: [{ required: false, message: 'Please input lived to date!', whitespace: true }],
                                })(
                                    <Row gutter={16}>
                                        <Col span={16}>
                                            <InputMask className="input-mask" mask="99/99/9999" placeholder="mm/dd/yyy" />
                                        </Col>
                                    </Row>
                                )}
                            </FormItem>
                        </div>
                    )
                    :(null)
                    }

                    <Button type="primary" htmlType="submit">SaveandContinue</Button>
                </Form>
            </div>
        );
    }
}

const CitizenFive = Form.create()(Relationships);

export default CitizenFive;
