import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Tooltip, Icon, Row, Col, Checkbox, Button, Radio, Select } from 'antd';
import './address.css';

import { countriesName, states } from '../../../../../services/countries';
import InputMask from 'react-input-mask';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const countries = countriesName();
const US_states = states();

class Address extends Component {
    state = {
        confirmDirty: false,
        diffYear: 0,
        selectedDate: '',
        careName: false,
        apartmentNumber: false,
        province: false,
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
                        <Row gutter={16}>
                            <Col span={16} >
                                {getFieldDecorator('state', {
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
                            </Col>
                            <Col span={8}>
                                <FormItem>
                                    <Tooltip title="Select Does not Apply if not USA">
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
                                Country&nbsp;
                        </span>
                        )}
                    >
                        <Row gutter={16}>
                            <Col span={16} >
                                {getFieldDecorator('country', {
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
                            </Col>
                        </Row>
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

                    <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={(
                            <span>
                                I have lived at this address since&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('lived_address_years', {
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
            <div id="citizen-part-address">
                <h3>Citizen Part 1.2 Address</h3>

                <p>Your (Sponsor's) Current Physical Address</p>
                <p>Enter your physical address here. If your mailing address is different you will enter that on another page. Changing your address later, using a P.O. box or a non-USA address is complicated and may cause your petition to be delayed.</p>
                <Form onSubmit={this.handleSubmit.bind(this)} className="citizen-part-adress-form">


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
                                {getFieldDecorator('in_care_of_name', {
                                    rules: [{ required: false, message: '', whitespace: true }],
                                })(
                                    <div>

                                        {(this.state.careName === false) ?
                                            (
                                                <Input disabled={false} defaultValue={""} style={{ maxWidth: '300px' }} />
                                            ) : (
                                                <Input disabled={true} defaultValue={"N/A"} style={{ maxWidth: '300px' }} />
                                            )}
                                    </div>
                                )}
                            </Col>

                            <Col span={8}>
                                <FormItem>
                                    <Checkbox onChange={this.onChangeCheckBox.bind(this, 'careName')}>Does not apply </Checkbox>
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
                                Apartment Number&nbsp;
                                </span>
                        )}
                    >
                        <Row gutter={16}>

                            <Col span={16} >
                                {getFieldDecorator('apartment_number', {
                                    rules: [{ required: false, message: '', whitespace: true }],
                                })(
                                    <div>

                                        {(this.state.apartmentNumber === false) ?
                                            (
                                                <Input disabled={false} defaultValue={""} style={{ maxWidth: '300px' }} />
                                            ) : (
                                                <Input disabled={true} defaultValue={"N/A"} style={{ maxWidth: '300px' }} />

                                            )}
                                    </div>
                                )}
                            </Col>

                            <Col span={8}>
                                <FormItem>
                                    <Checkbox onChange={this.onChangeCheckBox.bind(this, 'apartmentNumber')}>Does not apply </Checkbox>
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
                                Country&nbsp;
                        </span>
                        )}
                    >
                        <Row gutter={16}>
                            <Col span={16} >
                                {getFieldDecorator('country', {
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
                            </Col>
                        </Row>
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
                        <Row gutter={16}>
                            <Col span={16} >
                                {getFieldDecorator('state', {
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
                            </Col>
                            <Col span={8}>
                                <FormItem>
                                    <Tooltip title="Select Does not Apply if not USA">
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

                    <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={(
                            <span>
                                I have lived at this address since&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('lived_address_years', {
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

                    {(this.state.diffYear == 0)
                        ?
                        (
                            null
                        )
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

const CitizenTwo = Form.create()(Address);

export default CitizenTwo;
