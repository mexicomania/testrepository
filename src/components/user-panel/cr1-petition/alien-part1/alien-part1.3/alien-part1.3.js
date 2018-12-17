import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Tooltip, Icon, Row, Col, Checkbox, Button, Radio, Select } from 'antd';
import './alien-part1.3.css';

import { countriesName, states } from '../../../../../services/countries';
import InputMask from 'react-input-mask';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const countries = countriesName();
const US_states = states();

class AlienPart3 extends Component {
    state = {
        confirmDirty: false,
        diffYear: 0,
        selectedDate: '',
        careName: false,
        apartmentNumber: false,
        province: false,
        postal_code: false
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
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
    onChangeCheckBox = (name, e) => {
        console.log('chekedmark!', e.target.checked)
        console.log('chekedmark name!', name)
        this.setState({ [name]: e.target.checked })
    }

    onChangeYear = (e) => {
        e.persist();
        let value = e.target.value;
        const currentYear = new Date().getFullYear();
        let selectedYear = new Date(value.toString()).getFullYear();
        let selectedDate = new Date(value.toString());
        if (selectedDate != "Invalid Date") {
            let yearDiff = currentYear - selectedYear;
            if (yearDiff != 0 && yearDiff <= 5) {
                this.setState({ selectedDate: value, diffYear: yearDiff })
                this.add();
                console.log("You must provide your address for the past five years. Enter your address prior to", value);
            }
        }
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
        const { autoCompleteResult } = this.state;

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
                    <p>You must provide your address for the past five years. Enter your address prior to {this.state.selectedDate}</p>
                    <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={(
                            <span>
                                Number and street&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator(`names[alien_number_and_street${k + 1}]`, {
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
                        {getFieldDecorator(`names[alien_town_or_city${k + 1}]`, {
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
                        {getFieldDecorator(`names[alien_state${k + 1}]`, {
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
                        {getFieldDecorator(`names[alien_country${k + 1}]`, {
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
                        {getFieldDecorator(`names[alien_province${k + 1}]`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row gutter={16}>

                                <Col span={16} >
                                    {(this.state.province === false) ?
                                        (
                                            <Input disabled={false} defaultValue={''} style={{ maxWidth: '300px' }} />
                                        ) : (
                                            <Input disabled={true} defaultValue="N/A" style={{ maxWidth: '300px' }} />
                                        )}
                                </Col>

                                <Col span={8}>

                                    <FormItem
                                    //  {...tailFormItemLayout}
                                    >
                                        <Checkbox onChange={this.onChangeCheckBox.bind(this, 'province')}>Does not apply </Checkbox>
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
                                Postal Code&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator(`names[alien_postal_code${k + 1}]`, {
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
                                I have lived at this address since&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator(`names[alien_lived_address_years${k + 1}]`, {
                            onFieldsChange: this.onChangeYear,
                            onChange: this.onChangeYear,
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row gutter={16}>

                                <Col span={16} >
                                    {/* <Input placeholder="mm/dd/yy" style={{ maxWidth: '300px' }} /> */}
                                    <InputMask className="input-mask" mask="99/99/9999" placeholder="mm/dd/yyy" />
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                </div>
            );
        });

        return (
            <div id="alien-part3-address">
                <h3>Alien Part 1.3 Address</h3>

                <p>Alien's Address of 5 years</p>
                <p>Enter Alien's physical addresses since age sixteen, April 5, 2008
                    <Tooltip title={`You must enter the alien's physical address going back to age 16, and going back at least 5 years.  The current address must be exactly correct.  For older addresses the city and country are important but you can estimate the street address if you don't remember exactly what it was.  Enter the current physical address first.  The alien will need a police clearance for any stay outside his/her citizenship country for more than 6 months since age 16.`}>
                        <Icon type="question-circle-o" />
                    </Tooltip>
                </p>
                <p>Do not use Post Office box. Physical addresses only. We will ask you about a separate mailing address later.</p>
                <p style={{ color: 'red' }}>Do not enter non-English characters. Everything must be written in English letters only!</p>
                <Form onSubmit={this.handleSubmit.bind(this)} className="alien-part3-address-form">
                    <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={(
                            <span>
                                In Care of Name&nbsp;
                                </span>
                        )}
                    >
                        <Row gutter={16}>
                            <Col span={16} >
                                {getFieldDecorator('alien_in_care_of_name', {
                                    rules: [{ required: false, message: '', whitespace: true }],
                                })(
                                    <div>
                                        {(this.state.careName === false) ?
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
                                    <Checkbox onChange={this.onChangeCheckBox.bind(this, 'careName')}>Does not apply </Checkbox>
                                    <Tooltip title="DO NOT PUT YOUR NAME HERE! If you can't receive mail in your name, put the name of the person who can receive mail at this address. Most people will put N/A here.">
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
                                Number and street&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('alien_number_and_street', {
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
                                Apartment Number&nbsp;
                                </span>
                        )}
                    >
                        <Row gutter={16}>

                            <Col span={16} >
                                {getFieldDecorator('alien_apartment_number', {
                                    rules: [{ required: false, message: '', whitespace: true }],
                                })(
                                    <div>

                                        {(this.state.apartmentNumber === false) ?
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
                                    <Checkbox onChange={this.onChangeCheckBox.bind(this, 'apartmentNumber')}>Does not apply </Checkbox>
                                    <Tooltip title="Do not add Apt or #.">
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
                        {getFieldDecorator('alien_town_or_city', {
                            rules: [{ required: false, message: 'Please input your town or city!', whitespace: true }],
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
                        {getFieldDecorator('alien_country', {
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
                        {getFieldDecorator('alien_state', {
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
                                {getFieldDecorator('alien_province', {
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
                                {getFieldDecorator('alien_postal_code', {
                                    rules: [{ required: false, message: '', whitespace: true }],
                                })(
                                    <div>
                                        {(this.state.postal_code == false) ?
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
                                    <Checkbox onChange={this.onChangeCheckBox.bind(this, 'postal_code')}>Does not apply </Checkbox>
                                </FormItem>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={(
                            <span>
                                Alien has lived at this address since&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('alien_lived_address_years', {
                            onFieldsChange: this.onChangeYear,
                            onChange: this.onChangeYear,
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row gutter={16}>

                                <Col span={16} >
                                    {/* <Input placeholder="mm/dd/yy" style={{ maxWidth: '300px' }} /> */}
                                    <InputMask className="input-mask" mask="99/99/9999" placeholder="mm/dd/yyy" />
                                </Col>
                            </Row>
                        )}
                    </FormItem>

                    {(this.state.diffYear == 0) ?
                        (null)
                        :
                        (
                            <div>
                                {formItems}
                            </div>
                        )
                    }
                    <Button type="primary" htmlType="submit">SaveandContinue</Button>
                </Form>
            </div>


        );
    }
}

const AlienThree = Form.create()(AlienPart3);

export default AlienThree;
