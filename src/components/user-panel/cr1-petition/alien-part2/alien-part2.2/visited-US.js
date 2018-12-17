import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Tooltip, Icon, Row, Col, Button, Select, Radio, Checkbox } from 'antd';
import './visited-US.css';

import InputMask from 'react-input-mask';
import { countriesName } from '../../../../../services/countries';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const countries = countriesName();

class VisitedUS extends Component {
    state = {
        confirmDirty: false,
        alien_married_before: false,
        alien_visited_USA: false,
        alien_currently_in_USA: false,
        alien_I94_number: false,
        alien_last_enter_USA_date_expire: false,
        alien_passport_number: false,
        alien_travel_document_number: false,
        alien_passport_or_doc_date_expire: false
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

    onChangeCheckBox = (name, e) => {
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
            <div id="alien-part2-visited-us">
                <h3>Alien Part 2.2 Visited</h3>
                <Form onSubmit={this.handleSubmit.bind(this)} className="alien-part2-visited-us-form">
                    <span className="ant-form-text" style={{ marginBottom: '10px' }}>
                        <b>Visited U.S.</b>
                    </span>

                    <FormItem
                        colon={false}
                        label="Has the alien beneficiary ever been in the USA?"
                    >
                        {getFieldDecorator('alien_visited_USA', {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{ textAlign: 'center' }}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'alien_visited_USA')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>

                    {(this.state.alien_visited_USA) ?
                        (
                            <div>
                                <FormItem
                                    colon={false}
                                    label="Is the alien beneficiary currently in the USA?"
                                >
                                    {getFieldDecorator('alien_currently_in_USA', {
                                        rules: [{ required: false, message: '', whitespace: true }],
                                    })(
                                        <Row>
                                            <Col span={16} style={{ textAlign: 'center' }}>
                                                <RadioGroup onChange={this.onChangeName.bind(this, 'alien_currently_in_USA')}>
                                                    <Radio value={false}>No</Radio>
                                                    <Radio value={true}>Yes</Radio>
                                                </RadioGroup>
                                            </Col>
                                        </Row>
                                    )}
                                </FormItem>
                                {(this.state.alien_currently_in_USA) ?
                                    (
                                        <TravelInfoFields
                                            getFieldDecorator={getFieldDecorator}
                                            formItemLayout={formItemLayout}
                                            data={this.state}
                                            checkBoxEvent={this.onChangeCheckBox.bind(this)}
                                        />

                                    )
                                    : (null)}
                            </div>
                        )
                        : (null)}

                    <Button type="primary" htmlType="submit">SaveandContinue</Button>
                </Form>
            </div>
        );
    }
}



export default Form.create()(VisitedUS);




const TravelInfoFields = ({ getFieldDecorator, formItemLayout,data,checkBoxEvent }) => {
    return (
        <div className="center-field-label">

            <FormItem
                colon={false}
                label={(
                    <span>
                        In what status did he or she last enter the USA? Examples: Visitor, Student, Exchange Visitor, Crewman, Stowaway, Employment Visa, Illegally, etc.&nbsp;
                        </span>
                )}
            >
                {getFieldDecorator(`enter_state`, {
                    rules: [{ required: false, message: '', whitespace: true }],
                })(
                    <Row gutter={16} style={{textAlign:'center'}}>
                        <Col span={24}>
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
                        I-94 Number&nbsp;
                    </span>
                )}
            >
                <Row gutter={16}>
                    <Col span={16} >
                        {getFieldDecorator('alien_I94_number', {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <div>

                                {(data.alien_I94_number === false) ?
                                    (
                                        <Input disabled={false} defaultValue={''} style={{ maxWidth: '300px' }} />
                                    ) : (
                                        <Input disabled={true} defaultValue="None" style={{ maxWidth: '300px' }} />

                                    )}
                            </div>
                        )}
                    </Col>

                    <Col span={8}>

                        <FormItem>
                            <Checkbox onChange={checkBoxEvent.bind(this, 'alien_I94_number')}>Does not apply </Checkbox>
                            <Tooltip title="You can find this number at the top left on your Form I-94, Arrival Departure Record. This small form will normally be stapled to a page in your Passport when you enter the United States.Click here to see what the I-94 looks like.Enter None if you did not receive an I-94 when you entered the USA. This number is always exactly 11 digits. Do not include the space.">
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
                        Date the alien last entered the United States&nbsp;
                        </span>
                )}
            >
                {getFieldDecorator(`alien_last_enter_USA_date`, {
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
                        Date your stay expires, as shown on the I-94&nbsp;
                    </span>
                )}
            >
                <Row gutter={16}>
                    <Col span={16} >
                        {getFieldDecorator('alien_last_enter_USA_date_expire', {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <div>

                                {(data.alien_last_enter_USA_date_expire === false) ?
                                    (
                                        <InputMask className="input-mask" mask="99/99/9999" placeholder="mm/dd/yyy" />
                                    ) : (
                                        <Input disabled={true} defaultValue="None" style={{ maxWidth: '300px' }} />

                                    )}
                            </div>
                        )}
                    </Col>

                    <Col span={8}>

                        <FormItem>
                            <Checkbox onChange={checkBoxEvent.bind(this, 'alien_last_enter_USA_date_expire')}>Does not apply </Checkbox>
                            <Tooltip title="Enter None if you do not have an I-94.">
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
                        Passport Number&nbsp;
                    </span>
                )}
            >
                <Row gutter={16}>
                    <Col span={16} >
                        {getFieldDecorator('alien_passport_number', {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <div>
                                {(data.alien_passport_number === false) ?
                                    (
                                        <Input disabled={false} defaultValue={''} style={{ maxWidth: '300px' }} />
                                    ) : (
                                        <Input disabled={true} defaultValue="None" style={{ maxWidth: '300px' }} />

                                    )}
                            </div>
                        )}
                    </Col>
                    <Col span={8}>
                        <FormItem>
                            <Checkbox onChange={checkBoxEvent.bind(this, 'alien_passport_number')}>Does not apply </Checkbox>
                        </FormItem>
                    </Col>
                </Row>
            </FormItem>
            <FormItem
                {...formItemLayout}
                colon={false}
                label={(
                    <span>
                        Travel Document Number&nbsp;
                    </span>
                )}
            >
                <Row gutter={16}>
                    <Col span={16} >
                        {getFieldDecorator('alien_travel_document_number', {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <div>
                                {(data.alien_travel_document_number === false) ?
                                    (
                                        <Input disabled={false} defaultValue={''} style={{ maxWidth: '300px' }} />
                                    ) : (
                                        <Input disabled={true} defaultValue="None" style={{ maxWidth: '300px' }} />

                                    )}
                            </div>
                        )}
                    </Col>
                    <Col span={8}>
                        <FormItem>
                            <Checkbox onChange={checkBoxEvent.bind(this, 'alien_travel_document_number')}>Does not apply </Checkbox>
                        </FormItem>
                    </Col>
                </Row>
            </FormItem>
            <FormItem
                {...formItemLayout}
                colon={false}
                label={(
                    <span>
                        Date Passport or Travel Document Expires&nbsp;
                    </span>
                )}
            >
                <Row gutter={16}>
                    <Col span={16} >
                        {getFieldDecorator('alien_passport_or_doc_date_expire', {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <div>

                                {(data.alien_passport_or_doc_date_expire === false) ?
                                    (
                                        <InputMask className="input-mask" mask="99/99/9999" placeholder="mm/dd/yyy" />
                                    ) : (
                                        <Input disabled={true} defaultValue="None" style={{ maxWidth: '300px' }} />

                                    )}
                            </div>
                        )}
                    </Col>

                    <Col span={8}>

                        <FormItem>
                            <Checkbox onChange={checkBoxEvent.bind(this, 'alien_passport_or_doc_date_expire')}>Does not apply </Checkbox>
                        </FormItem>
                    </Col>
                </Row>
            </FormItem>
            <FormItem
                {...formItemLayout}
                colon={false}
                label={(
                    <span>
                        Country of Issue for Passport or Travel Document&nbsp;
                    </span>
                )}
            >
                {getFieldDecorator('alien_issue_passport_or_doc_country', {
                    rules: [{ required: false, message: 'Please select your country!', whitespace: true }],
                })(

                    <Select
                        style={{ maxWidth: '300px' }}
                        placeholder="Select Country"
                        showSearch={true}
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
        </div>
    )
}
