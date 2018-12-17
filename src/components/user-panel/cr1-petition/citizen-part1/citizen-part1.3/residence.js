import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Tooltip, Icon, Row, Col, Checkbox, Button, Radio, Select } from 'antd';
import './residence.css';

import { countriesName, states } from '../../../../../services/countries';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const countries = countriesName();
const US_states = states();

class Residence extends Component {
    state = {
        confirmDirty: false,
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    onChangeName = (e) => {
        console.log('checked on name', e.target.value);
        this.setState({
            gender: e.target.value,
        });
    }
    onChangeMaidenName = (e) => {
        console.log('checked on maiden1', e.target.value);
        this.setState({
            maidenName: e.target.value,
        });
    }

    handleSelectChange = (value) => {
        console.log(`selected ${value}`);
    }

    // onChangeEvents for sub form 1
    remove = (k) => {
        console.log("kkkkkk", k)
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    add = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(keys.length);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    componentDidMount() {
        this.add();
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

        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => {
            return (
                <div key={k}>
                    <p style={{ textAlign: 'center', fontSize: '15px', fontWeight: 'bold' }}>Residence {k + 1}</p>
                    <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={(
                            <span>
                                Country&nbsp;
                        </span>
                        )}
                        style={{alignItems: 'center',display: 'flex'}}
                    >
                        {getFieldDecorator(`names[country${k + 1}]`, {
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
                        {...formItemLayout}
                        colon={false}
                        label={(
                            <span>
                                U.S. State&nbsp;
                        </span>
                        )}
                        style={{alignItems: 'center',display: 'flex'}}
                    >
                        {getFieldDecorator(`names[state${k + 1}]`, {
                            rules: [{ required: false, message: 'Please select your State!', whitespace: true }],
                        })(
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
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        style={{display:'flex',alignItems:'center'}}
                        colon={false}
                        label={(<span>Add another residence? </span>)}
                    >
                        {getFieldDecorator(`names[other${k + 1}]`, {
                            validateTrigger: ['onChange', 'onBlur'],
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16}>
                                    <RadioGroup onChange={(val) => val.target.value == 'Yes' ? this.add() : this.remove(k + 1)}>
                                        <Radio value={'No'}>No</Radio>
                                        <Radio value={"Yes"}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>

                </div>
            );
        });

        return (
            <div id="citizen-part-residence">
                <h3>Citizen Part 1.3 Residence</h3>

                <p>Provide all U.S. states and foreign countries in which you have resided since your 18th birthday. (Please list most recent first.) Do not include Military Deployments</p>
                <Form onSubmit={this.handleSubmit.bind(this)} className="citizen-part-residence-form">

                    {formItems}

                    <Button type="primary" htmlType="submit">SaveandContinue</Button>
                </Form>
            </div>


        );
    }
}

const CitizenThree = Form.create()(Residence);

export default CitizenThree;
