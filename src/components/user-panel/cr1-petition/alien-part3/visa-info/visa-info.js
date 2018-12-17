import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Tooltip, Icon, Row, Col, Button, Select, Checkbox, Radio, Divider } from 'antd';
import './visa-info.css';

import { countriesName, states } from '../../../../../services/countries';
import InputMask from 'react-input-mask';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const countries = countriesName();
const US_states = states();

class VisaInfo extends Component {
    state = {
        confirmDirty: false
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
        this.setState({ [name]: e.target.value })
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
            <div id="alien-part3-visa-info">
                <h3>Alien Part 3.1 Recent Immigration History &amp; Passport Info</h3>

                <div className="general-box">
                    <p>
                        All questions are about the Alien (foreign citizen).<br />
                        Do not write your answers in all capital letters and never use any type of non-English characters.
                </p>
                </div>
                <Form onSubmit={this.handleSubmit.bind(this)} className="alien-part3-visa-info-form">
                    <div className="general-box" style={{backgroundColor:'#e2e1e0'}}>
                        <span className="ant-form-text" >
                            <b>Passport Related Information</b>
                        </span>
                        <Divider />
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
                                        rules: [{ required: true, message: '', whitespace: true }],
                                    })(
                                        <div>
                                            <Tooltip title='Enter N/A if doesnot apply'>
                                            <Input style={{ maxWidth: '300px' }} />
                                            </Tooltip>
                                        </div>
                                    )}
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
                                        rules: [{ required: true, message: '', whitespace: true }],
                                    })(
                                        <div>
                                             <Tooltip title='Enter N/A if doesnot apply'>
                                                <Input style={{ maxWidth: '300px' }} />
                                             </Tooltip>
                                        </div>
                                    )}
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
                                        rules: [{ required: true, message: '', whitespace: true }],
                                    })(
                                        <div>
                                            <InputMask className="input-mask" mask="99/99/9999" placeholder="mm/dd/yyy" />
                                        </div>
                                    )}
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
                                rules: [{ required: true, message: 'Please select your country!', whitespace: true }],
                            })(
                                <Tooltip title='Enter N/A if doesnot apply'>
                                    <Input  style={{ maxWidth: '300px' }}/>
                                </Tooltip>
                            )}
                        </FormItem>
                    </div>
                    <div className="general-box" style={{marginTop:'15px',backgroundColor:'#e2e1e0'}}>
                        <span className="ant-form-text">
                            <b>Arrived in the United States</b>
                        </span>
                        <Divider />
                        <FormItem
                        
                            colon={false}
                            label={<span className="sub-box">Select how you entered the United States. If not, select N/A.</span>}
                        >
                            {getFieldDecorator('alien_entered_in_USA', {
                                rules: [{ required: true, message: '', whitespace: true }],
                            })(
                                <Row>
                                    <Col span={24}>
                                        <RadioGroup>
                                            <Radio value={'N/A'}>N/A</Radio>
                                            <Radio value={'Was inspected at a port of entry and admitted as'}>Was inspected at a port of entry and admitted as</Radio>
                                            <Radio value={'Was inspected at a port of entry and paroled as'}>Was inspected at a port of entry and paroled as</Radio>
                                            <Radio value={'Came into the United States without admission or parole.'}>Came into the United States without admission or parole.</Radio>
                                            <Radio value={'Other'}>Other</Radio>
                                        </RadioGroup>
                                    </Col>
                                </Row>
                            )}
                        </FormItem>
                        <p className="sub-box">Explain how you arrived (for example, fiancee visa, visitor, student, exchange alien, crewman, stowaway, temporary worker). If not, fill in N/A.</p>
                        <FormItem
                            {...formItemLayout}
                            colon={false}
                            label={(
                                <span>
                                    Explain how you arrived&nbsp;
                                </span>
                            )}
                        >
                            <Row gutter={16}>
                                <Col span={16} >
                                    {getFieldDecorator('alien_how_arrived', {
                                        rules: [{ required: true, message: '', whitespace: true }],
                                    })(
                                        <div>
                                            <Tooltip title='Enter N/A if this does not apply. For example, exchange visitor; visitor, exchange alien; crewman; waived through; stowaway; temporary worker; student; without inspection; humanitarian parole.'>
                                            <Input style={{ maxWidth: '300px' }} />
                                            </Tooltip>
                                        </div>
                                    )}
                                </Col>
                            </Row>
                        </FormItem>
                        <p className="sub-box">Place of Last Arrival into the United States (if any). If not, fill in N/A.</p>
                        <FormItem
                            {...formItemLayout}
                            colon={false}
                            label={(
                                <span>
                                    City or Town&nbsp;
                                </span>
                            )}
                        >
                            <Row gutter={16}>
                                <Col span={16} >
                                    {getFieldDecorator('alien_last_arrived_city', {
                                        rules: [{ required: true, message: '', whitespace: true }],
                                    })(
                                        <div>
                                            <Tooltip title='Enter N/A if this does not apply. City or Town of Last Arrival into the United States'>
                                            <Input style={{ maxWidth: '300px' }} />
                                            </Tooltip>
                                        </div>
                                    )}
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            colon={false}
                            label={(
                                <span>
                                    State&nbsp;
                                </span>
                            )}
                        >
                            <Row gutter={16}>
                                <Col span={16} >
                                    {getFieldDecorator('alien_last_arrived_state', {
                                        rules: [{ required: true, message: '', whitespace: true }],
                                    })(
                                        <div>
                                            <Tooltip title='Enter N/A if this does not apply. State of Last Arrival into the United States. If you entered through Guam, just enter Guam.'>
                                            <Input style={{ maxWidth: '300px' }} />
                                            </Tooltip>
                                        </div>
                                    )}
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            colon={false}
                            label={(
                                <span>
                                    Date of Last Arrival.&nbsp;
                                </span>
                            )}
                        >
                            <Row gutter={16}>
                                <Col span={16} >
                                    {getFieldDecorator('alien_last_arrival_date', {
                                        rules: [{ required: true, message: '', whitespace: true }],
                                    })(
                                        <div>
                                            <Tooltip title=''>
                                            <InputMask className="input-mask" mask="99/99/9999" placeholder="mm/dd/yyy" />
                                            </Tooltip>
                                        </div>
                                    )}
                                </Col>
                            </Row>
                        </FormItem>
                    </div> 
                    <div className="general-box" style={{marginTop:'15px',backgroundColor:'#e2e1e0'}}>
                        <span className="ant-form-text">
                            <b>Form I-94</b>
                        </span>
                        <Divider/>
                        <p className="sub-box">
                        If you were issued a Form I-94 Arrival-Departure Record Number. If not fill in N/A.
                        </p>
                        <FormItem
                            {...formItemLayout}
                            colon={false}
                            label={(
                                <span>
                                    Form I-94 Arrival-Departure Record Number&nbsp;
                                </span>
                            )}
                        >
                            <Row gutter={16}>
                                <Col span={16} >
                                    {getFieldDecorator('alien_arrival_departure_record_number', {
                                        rules: [{ required: true, message: '', whitespace: true }],
                                    })(
                                        <div>
                                            <Tooltip title='Enter N/A if none. This number is 11 digits long. You can find this number at the top left on your Form I-94, Arrival Departure Record. This small form will normally be stapled to a page in your Passport when you enter the United States. Enter None if you did not enter the USA with a printed visa, such as with the Visa Waiver Program (WT/WB Visa).'>
                                            <Input style={{ maxWidth: '300px' }} />
                                            </Tooltip>
                                        </div>
                                    )}
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            colon={false}
                            label={(
                                <span>
                                    Expiration Date of Authorized Stay&nbsp;
                                </span>
                            )}
                        >
                            <Row gutter={16}>
                                <Col span={16} >
                                    {getFieldDecorator('alien_arrival_departure_record_number', {
                                        rules: [{ required: true, message: '', whitespace: true }],
                                    })(
                                        <div>
                                            <Tooltip title=''>
                                            <InputMask className="input-mask" mask="99/99/9999" placeholder="mm/dd/yyy" />
                                            </Tooltip>
                                        </div>
                                    )}
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            colon={false}
                            label={(
                                <span>
                                    Status on Form I-94&nbsp;
                                </span>
                            )}
                        >
                            <Row gutter={16}>
                                <Col span={16} >
                                    {getFieldDecorator('alien_I-94_status', {
                                        rules: [{ required: true, message: '', whitespace: true }],
                                    })(
                                        <div>
                                            <Tooltip title='Enter N/A if none. For example, class of admission, or paroled, if paroled'>
                                            <Input style={{ maxWidth: '300px' }} />
                                            </Tooltip>
                                        </div>
                                    )}
                                </Col>
                            </Row>
                        </FormItem>
                    </div>  
                    <div className="general-box" style={{marginTop:'15px',backgroundColor:'#e2e1e0'}}>
                        <span className="ant-form-text">
                            <b>Embassy Information</b>
                        </span>
                        <Divider/>
                        <p className="sub-box">
                        Your beneficiary will apply for a visa abroad at the U.S. Embassy or U.S. Consulate at
                        </p>
                        <FormItem
                            {...formItemLayout}
                            colon={false}
                            label={(
                                <span>
                                    Embassy City&nbsp;
                                </span>
                            )}
                        >
                            <Row gutter={16}>
                                <Col span={16} >
                                    {getFieldDecorator('alien_embassy_city', {
                                        rules: [{ required: true, message: '', whitespace: true }],
                                    })(
                                        <div>
                                            <Tooltip title='Enter N/A if none. This is the U.S. embassy where you had the interview for your visa. Enter None if you were not issued a visa.'>
                                            <Input style={{ maxWidth: '300px' }} />
                                            </Tooltip>
                                        </div>
                                    )}
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            colon={false}
                            label={(
                                <span>
                                    Embassy Country&nbsp;
                                </span>
                            )}
                        >
                            <Row gutter={16}>
                                <Col span={16} >
                                    {getFieldDecorator('alien_embassy_country', {
                                        rules: [{ required: true, message: '', whitespace: true }],
                                    })(
                                        <div>
                                            <Tooltip title='Enter N/A if none. Select None if you were not issued a visa.'>
                                            <Input style={{ maxWidth: '300px' }} />
                                            </Tooltip>
                                        </div>
                                    )}
                                </Col>
                            </Row>
                        </FormItem>
                    
                    </div>             
                    <Button type="primary" htmlType="submit">SaveandContinue</Button>
                </Form>
            </div>
        );
    }
}

export default Form.create()(VisaInfo);;
