import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Tooltip, Icon, Row, Col, Checkbox, Button, Radio, Select } from 'antd';
import './military-convictions.css';

import { countriesName, states } from '../../../../../services/countries';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const countries = countriesName();
const US_states = states();

class MilitaryConvictions extends Component {
    state = {
        confirmDirty: false,
        member_US_army: false,
        stationed_overseas: false,
        apartment_number: false,
        province: false
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

    onChangeName = (name, e) => {
        console.log('checked on maiden1', e.target.value);
        this.setState({
            [name]: e.target.value,
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
            <div id="citizen-part2-military">
                <h3>Citizen Part 2.4 Military &amp; Convictions</h3>

                <p>Military &amp; Convictions</p>
                <p>Military Personnel Overseas:</p>
                <Form onSubmit={this.handleSubmit.bind(this)} className="citizen-part2-military-form">

                    <FormItem
                        style={{textAlign:'center'}}
                        colon={false}
                        label={(<span>Are you currently a member of the United States Armed Forces on active duty?</span>)}
                    >
                        {getFieldDecorator(`member_US_army`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={24}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'member_US_army')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>

                    {(this.state.member_US_army) ?
                        (
                            <div style={{textAlign:'center'}}>
                                <FormItem
                                    colon={false}
                                    label={(<span>Are you stationed overseas?</span>)}
                                >
                                    {getFieldDecorator(`stationed_overseas`, {
                                        rules: [{ required: false, message: '', whitespace: true }],
                                    })(
                                        <Row>
                                            <Col span={24} >
                                                <RadioGroup onChange={this.onChangeName.bind(this, 'stationed_overseas')}>
                                                    <Radio value={false}>No</Radio>
                                                    <Radio value={true}>Yes</Radio>
                                                </RadioGroup>
                                            </Col>
                                        </Row>
                                    )}
                                </FormItem>
                                {(this.state.stationed_overseas) ?
                                    (
                                        <div className="field-items">
                                            <FormItem
                                                {...formItemLayout}
                                                colon={false}
                                                label={(
                                                    <span>
                                                        Box Number or Number and Street&nbsp;
                        </span>
                                                )}
                                            >
                                                {getFieldDecorator('box_number', {
                                                    rules: [{ required: false, message: 'Please input box number!', whitespace: true }],
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
                                                label="Apartment Number">
                                                <Row gutter={16}>
                                                    <Col span={16}>
                                                        {getFieldDecorator('apartment_number', {
                                                            rules: [{ required: false, message: 'Please input apartment number!', whitespace: true }],
                                                        })(
                                                            <div>
                                                                {(!this.state.apartment_number) ?
                                                                    (
                                                                        <Input defaultValue={''} style={{ maxWidth: '300px' }} />
                                                                    ) :
                                                                    (
                                                                        <Input disabled={true} defaultValue={'N/A'} style={{ maxWidth: '300px' }} />
                                                                    )}
                                                            </div>
                                                        )}
                                                    </Col>
                                                    <Col span={8}>
                                                        <FormItem>
                                                        <Checkbox onChange={this.onChangeCheckBox.bind(this, 'apartment_number')}>Does not apply </Checkbox>
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
                                                {getFieldDecorator('town_city', {
                                                    rules: [{ required: false, message: 'Please input city or town!', whitespace: true }],
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
                                                label="Province"
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
                                    ) : (null)}
                            </div>
                        ) : (null)}










                    <Button type="primary" htmlType="submit">SaveandContinue</Button>
                </Form>
            </div>


        );
    }
}

const CitizenFour = Form.create()(MilitaryConvictions);

export default CitizenFour;
