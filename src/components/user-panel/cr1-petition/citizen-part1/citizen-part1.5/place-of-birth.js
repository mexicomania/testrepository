import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Tooltip, Icon, Row, Col, Button, Select } from 'antd';
import './place-of-birth.css';

import { countriesName, states } from '../../../../../services/countries';
import InputMask from 'react-input-mask';

const FormItem = Form.Item;
const Option = Select.Option;

const countries = countriesName();
const US_states = states();

class PlaceOfBirth extends Component {
    state = {
        confirmDirty: false,
        sponsors_A: false,
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
            <div id="citizen-part-pob">
                <h3>Citizen Part 1.4 Place of Birth</h3>
                <Form onSubmit={this.handleSubmit.bind(this)} className="citizen-part-pob-form">
                    <span className="ant-form-text" style={{ marginBottom: '10px' }}><b>Sponsor's Birth Information
</b></span>
                    <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={(
                            <span>
                                Sponsor's Date of Birth&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('sponsor_dob', {
                            rules: [{ required: false, message: 'Please input sponsor date of birth!', whitespace: true }],
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
                                Sponsor's City of Birth&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('sponsor_city_of_birth', {
                            rules: [{ required: false, message: 'Please input sponsor city of birth!', whitespace: true }],
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
                                Sponsor's State of Birth&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('sponsor_state_of_birth', {
                            rules: [{ required: false, message: 'Please input sponsor state of birth!', whitespace: true }],
                        })(
                            <Row gutter={16}>
                                <Col span={16}>
                                    <Input style={{ maxWidth: '300px' }} />
                                </Col>
                                <Col span={8}>
                                    <FormItem>
                                        <Tooltip placement="right" title="If you were not born in the U.S., enter your birth country here. The USCIS form limits you to 10 characters. Abbreviate as necessary.">
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
                                Sponsor's Country of Birth&nbsp;
                        </span>
                        )}
                    >
                        <Row gutter={16}>
                            <Col span={16} >
                                {getFieldDecorator('sponsor_country_of_birth', {
                                    rules: [{ required: false, message: 'Please select sponsor country of birth!', whitespace: true }],
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


                    <span className="ant-form-text" style={{ marginBottom: '10px' }}><b>Sponsor's Father Information
</b></span>
                    <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={(
                            <span>
                                Father's Last Name&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('father_last_name', {
                            rules: [{ required: false, message: 'Please input sponsor father last name!', whitespace: true }],
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
                                Father's First Name&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('father_first_name', {
                            rules: [{ required: false, message: 'Please input sponsor father first name!', whitespace: true }],
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
                                Father's Middle Name&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('father_middle_name', {
                            rules: [{ required: false, message: 'Please input sponsor father middle name!', whitespace: true }],
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
                                Father's Date of Birth&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('father_dob', {
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
                                Father's City &amp; State of Birth&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('father_city_or_state_of_birth', {
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
                                Father's Country of Birth&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('father_country_of_birth', {
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
                                Father's City &amp; State of Current Residence&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('father_city_or_state_current_residence', {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row gutter={16}>
                                <Col span={16}>
                                    <Input style={{ maxWidth: '300px' }} />
                                </Col>
                                <Col span={8}>
                                    <FormItem>
                                        <Tooltip placement="right" title="Enter City and Country if the father does not live in the U.S. Enter Deceased if appropriate. Enter Unknown if you don't know where he lives.">
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
                                Father's Country of Current Residence&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('father_country_current_residence', {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row gutter={16}>
                                <Col span={16}>
                                    <Input style={{ maxWidth: '300px' }} />
                                </Col>
                                <Col span={8}>
                                    <FormItem>
                                        <Tooltip placement="right" title="Enter City and Country if the father does not live in the U.S. Enter Deceased if appropriate. Enter Unknown if you don't know where he lives.">
                                            <Icon type="question-circle-o" />
                                        </Tooltip>
                                    </FormItem>
                                </Col>
                            </Row>
                        )}
                    </FormItem>


                    <span className="ant-form-text" style={{ marginBottom: '10px' }}><b>Sponsor's Mother Information
</b></span>
                    <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={(
                            <span>
                                Mother's Last Name&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('mother_last_name', {
                            rules: [{ required: false, message: 'Please input sponsor father last name!', whitespace: true }],
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
                                Mother's First Name&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('mother_first_name', {
                            rules: [{ required: false, message: 'Please input sponsor father first name!', whitespace: true }],
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
                                Mother's Middle Name&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('mother_middle_name', {
                            rules: [{ required: false, message: 'Please input sponsor father middle name!', whitespace: true }],
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
                                Mother's Date of Birth&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('mother_dob', {
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
                                Mother's City &amp; State of Birth&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('mother_city_or_state_of_birth', {
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
                                Mother's Country of Birth&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('mother_country_of_birth', {
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
                                Mother's City &amp; State of Current Residence&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('mother_city_or_state_current_residence', {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row gutter={16}>
                                <Col span={16}>
                                    <Input style={{ maxWidth: '300px' }} />
                                </Col>
                                <Col span={8}>
                                    <FormItem>
                                        <Tooltip placement="right" title="Enter City and Country if the mother does not live in the U.S. Enter Deceased if appropriate. Enter Unknown if you don't know where he lives.">
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
                                Mother's Country of Current Residence&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('mother_country_current_residence', {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row gutter={16}>
                                <Col span={16}>
                                    <Input style={{ maxWidth: '300px' }} />
                                </Col>
                                <Col span={8}>
                                    <FormItem>
                                        <Tooltip placement="right" title="Enter City and Country if the mother does not live in the U.S. Enter Deceased if appropriate. Enter Unknown if you don't know where he lives.">
                                            <Icon type="question-circle-o" />
                                        </Tooltip>
                                    </FormItem>
                                </Col>
                            </Row>
                        )}
                    </FormItem>


                    <Button type="primary" htmlType="submit">SaveandContinue</Button>
                </Form>
            </div>
        );
    }
}

const CitizenFive = Form.create()(PlaceOfBirth);

export default CitizenFive;
