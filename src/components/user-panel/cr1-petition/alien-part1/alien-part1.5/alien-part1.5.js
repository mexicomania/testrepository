import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Tooltip, Icon, Row, Col, Button, Select, Radio } from 'antd';
import './alien-part1.5.css';

import InputMask from 'react-input-mask';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const options = [
    {value:"",name:"(Select One)"},
    {value:"Annulment",name:"Annulment"},
    {value:"Death",name:"Death"},
    {value:"Dissolution",name:"Dissolution"},
    {value:"Divorce",name:"Divorce"}
]
class MaritalStatus extends Component {
    state = {
        confirmDirty: false,
        alien_married_before: false,
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
        console.log('checked on name', name);
        this.setState({
            [name]: e.target.value,
        });
    }

    removeSpouse = (k) => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        if (keys.length === 1) {
            return;
        }
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    addSpouse = () => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(keys.length);
        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    componentDidMount() {
        this.addSpouse();
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

        return (
            <div id="alien-part5-marital-status">
                <h3>Alien Part 1.4 Marital Status</h3>
                <Form onSubmit={this.handleSubmit.bind(this)} className="alien-part5-marital-status-form">
                    <span className="ant-form-text" style={{ marginBottom: '10px' }}>
                        <b>Alien's Marital Status</b>
                    </span>

                    <FormItem
                        colon={false}
                        label="Was the alien ever married before the current marriage?"
                    >
                        {getFieldDecorator('alien_married_before', {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{ textAlign: 'center' }}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'alien_married_before')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>

                    {(this.state.alien_married_before) ?
                        (
                            <div>
                                <span className="ant-form-text" style={{ marginBottom: '10px' }}>
                                    <b>Enter all Prior Spouses, no matter how many or how far back. You must provide a divorce, annulment or death certificate for all prior spouses with no exceptions. Space is limited to match USCIS forms. Abbreviate as necessary.</b>
                                </span>
                                {keys.map((val, index) =>
                                    <SpouseFields
                                        key={index}
                                        k={index}
                                        getFieldDecorator={getFieldDecorator}
                                        formItemLayout={formItemLayout}
                                        addEvent={this.addSpouse}
                                        removeEvent={this.removeSpouse}
                                    />
                                )}
                            </div>
                        )
                        : (null)
                    }

                    <Button type="primary" htmlType="submit">SaveandContinue</Button>
                </Form>
            </div>
        );
    }
}

const AlienSix = Form.create()(MaritalStatus);

export default AlienSix;




const SpouseFields = ({ k, getFieldDecorator, formItemLayout, addEvent, removeEvent }) => {
    return (
        <div className="center-field-label">
            <span className="ant-form-text subheading-text">
                <b>Prior Spouse #{k + 1}</b>
            </span>
            <FormItem
                {...formItemLayout}
                colon={false}
                label={(
                    <span>
                        Last Name&nbsp;
                        </span>
                )}
            >
                {getFieldDecorator(`spouses[last_name${k + 1}]`, {
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
                        First Name&nbsp;
                        </span>
                )}
            >
                {getFieldDecorator(`spouses[first_name${k + 1}]`, {
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
                        Middle Name&nbsp;
                        </span>
                )}
            >
                {getFieldDecorator(`spouses[middle_name${k + 1}]`, {
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
                        Date of Marriage&nbsp;
                        </span>
                )}
            >
                {getFieldDecorator(`spouses[date_of_marriage${k + 1}]`, {
                    rules: [{ required: false, message: '', whitespace: true }],
                })(
                    <Row gutter={16}>
                        <Col span={16}>
                            <InputMask className="input-mask" mask="99/99/9999" placeholder="mm/dd/yyy" />
                        </Col>
                        <Col span={8}>
                            <FormItem>
                                <Tooltip placement="right" title="Okay to estimate">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </FormItem>
                        </Col>
                    </Row>
                )}
            </FormItem>
            <span className="ant-form-text subheading-text">
                <b>Place of Marriage to Prior Spouse</b>
            </span>
            <FormItem
                {...formItemLayout}
                colon={false}
                label={(
                    <span>
                        City or Town&nbsp;
                    </span>
                )}
            >
                {getFieldDecorator(`spouses[marriage_city_or_state${k + 1}]`, {
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
                        State or Province&nbsp;
                    </span>
                )}
            >
                {getFieldDecorator(`spouses[marriage_state_or_province${k + 1}]`, {
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
                        Country&nbsp;
                    </span>
                )}
            >
                {getFieldDecorator(`spouses[marriage_country${k + 1}]`, {
                    rules: [{ required: false, message: '', whitespace: true }],
                })(
                    <Row gutter={16}>
                        <Col span={16}>
                            <Input style={{ maxWidth: '300px' }} />
                        </Col>
                    </Row>
                )}
            </FormItem>
            <span className="ant-form-text subheading-text">
                <b>Birth of Prior Spouse</b>
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
                {getFieldDecorator(`spouses[spouse_dob${k + 1}]`, {
                    rules: [{ required: false, message: '', whitespace: true }],
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
                        City or Town&nbsp;
                    </span>
                )}
            >
                {getFieldDecorator(`spouses[spouse_birth_city_or_state${k + 1}]`, {
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
                        State or Province&nbsp;
                    </span>
                )}
            >
                {getFieldDecorator(`spouses[spouse_birth_state_or_province${k + 1}]`, {
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
                        Country&nbsp;
                    </span>
                )}
            >
                {getFieldDecorator(`spouses[spouse_birth_country${k + 1}]`, {
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
                        Country of Citizenship&nbsp;
                    </span>
                )}
            >
                {getFieldDecorator(`spouses[spouse_birth_country_citizenship${k + 1}]`, {
                    rules: [{ required: false, message: '', whitespace: true }],
                })(
                    <Row gutter={16}>
                        <Col span={16}>
                            <Input style={{ maxWidth: '300px' }} />
                        </Col>
                    </Row>
                )}
            </FormItem>
            <span className="ant-form-text subheading-text">
                <b>Marriage Ended Information</b>
            </span> 
            <FormItem
                {...formItemLayout}
                colon={false}
                label={(
                    <span>
                        Date of Marriage End&nbsp;
                        </span>
                )}
            >
                {getFieldDecorator(`spouses[date_of_marriage_ended${k + 1}]`, {
                    rules: [{ required: false, message: '', whitespace: true }],
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
                        How Marriage Ended&nbsp;
                        <Tooltip title="Select Does not Apply if not USA">
                            <Icon type="question-circle-o" />
                        </Tooltip>
                    </span>
                )}
            >
                {getFieldDecorator(`spouses[how_marriage_ended${k+1}]`, {
                    rules: [{ required: false, message: 'Please select your State!', whitespace: true }],
                })(
                    <Select
                        style={{ maxWidth: '300px' }}
                        placeholder="Select one"
                        showSearch={true}
                    >
                        {
                            options.map((val, index) => {
                                return (
                                    <Option key={index} value={val.value}>{val.name}</Option>
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
                        City or Town&nbsp;
                        </span>
                )}
            >
                {getFieldDecorator(`spouses[city_or_town_of_marriage_ended${k + 1}]`, {
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
                        State or Province&nbsp;
                    </span>
                )}
            >
                {getFieldDecorator(`spouses[state_or_province_of_marriage_ended${k + 1}]`, {
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
                        Country&nbsp;
                    </span>
                )}
            >
                {getFieldDecorator(`spouses[country_of_marriage_ended${k + 1}]`, {
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
                label="Add another prior spouse?"
            >
                {getFieldDecorator('married_before', {
                    rules: [{ required: false, message: '', whitespace: true }],
                })(
                    <Row>
                        <Col span={16}>
                            <RadioGroup onChange={(e) => e.target.value ? addEvent() : removeEvent(k)}>
                                <Radio value={false}>No</Radio>
                                <Radio value={true}>Yes</Radio>
                            </RadioGroup>
                        </Col>
                    </Row>
                )}
            </FormItem>
        </div>
    )
}
