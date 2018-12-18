import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Tooltip, Icon, Row, Col, Button, Select, Checkbox, Radio } from 'antd';
import './parents.css';

import { countriesName, states } from '../../../../../services/countries';
import InputMask from 'react-input-mask';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const countries = countriesName();
const US_states = states();

class Parents extends Component {
    state = {
        confirmDirty: false,
        sponsors_A: false,
        mail: '',
        alien_father_middle_name: false,
        alien_mother_middle_name: false,
        alien_father_other_name: false,
        alien_mother_other_name: false,
        is_alien_father_deceased: undefined,
        is_alien_mother_deceased: undefined,
        alien_father_birth_country: false,
        alien_mother_birth_country: false,
        father_apartmentNumber: false,
        mother_apartmentNumber: false,
        father_postal_code: false,
        mother_postal_code: false,
        father_province: false,
        mother_province: false,


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
            <div id="alien-part2-parents">
                <h3>Alien Part 2.1 Parents</h3>
                <p>
                    Do not write your answers in all capital letters and never use any type of non-English characters. You must provide the following information about your biological or adoptive parents.
                </p>
                <Form onSubmit={this.handleSubmit.bind(this)} className="alien-part2-parents-form">
                    <span className="ant-form-text" style={{ marginBottom: '10px', width: '100%', textAlign: 'center' }}>
                        <b>Alien's Father Information</b>
                    </span>

                    <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={(
                            <span>
                                Father's Last Name&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('alien_father_last_name', {
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
                        {getFieldDecorator('alien_father_first_name', {
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
                        <Row gutter={16}>
                            <Col span={16}>
                                {getFieldDecorator('alien_father_middle_name', {
                                    rules: [{ required: false, message: 'Please input sponsor father middle name!', whitespace: true }],
                                })(
                                    <div>
                                        {(!this.state.alien_father_middle_name) ?
                                            (
                                                <Input disabled={false} defaultValue={''} style={{ maxWidth: '300px' }} />
                                            ) : (
                                                <Input disabled={true} defaultValue={'N/A'} style={{ maxWidth: '300px' }} />
                                            )}
                                    </div>
                                )}
                            </Col>
                            <Col span={8}>
                                <FormItem>
                                    <Checkbox onChange={this.onChangeCheckBox.bind(this, 'alien_father_middle_name')}>Does not apply </Checkbox>
                                </FormItem>
                            </Col>
                        </Row>
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={(<span>Has your Father used any other names?</span>)}
                    >
                        {getFieldDecorator(`alien_father_other_name`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'alien_father_other_name')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.alien_father_other_name) ?
                        (
                            <div>
                                <FormItem
                                    {...formItemLayout}
                                    colon={false}
                                    label={(
                                        <span>
                                            Father's Last Name&nbsp;
                        </span>
                                    )}
                                >
                                    {getFieldDecorator('alien_father_other_last_name', {
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
                                    {getFieldDecorator('alien_father_other_first_name', {
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
                                    <Row gutter={16}>
                                        <Col span={16}>
                                            {getFieldDecorator('alien_father_other_middle_name', {
                                                rules: [{ required: false, message: 'Please input sponsor father middle name!', whitespace: true }],
                                            })(
                                                <Input style={{ maxWidth: '300px' }} />
                                            )}
                                        </Col>
                                    </Row>
                                </FormItem>
                            </div>
                        ) : (null)}


                    <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={(
                            <span>
                                Father's Date of Birth&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('alien_father_dob', {
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
                                Father's Birth City&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('alien_father_birth_city', {
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
                                Father's Birth Country&nbsp;
                        </span>
                        )}
                    >
                        <Row gutter={16}>
                            <Col span={16}>
                                {getFieldDecorator('alien_father_birth_country', {
                                    rules: [{ required: false, message: '', whitespace: true }],
                                })(
                                    <div>
                                        {(!this.state.alien_father_birth_country) ?
                                            (
                                                <Input disabled={false} defaultValue={''} style={{ maxWidth: '300px' }} />

                                            ) : (
                                                <Input disabled={true} defaultValue={'Unkown'} style={{ maxWidth: '300px' }} />
                                            )}

                                    </div>
                                )}
                            </Col>
                            <Col span={8}>
                                <FormItem>
                                    <Checkbox onChange={this.onChangeCheckBox.bind(this, 'alien_father_birth_country')}>Does not apply </Checkbox>
                                </FormItem>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={(<span>Is he deceased?</span>)}
                    >
                        {getFieldDecorator(`is_alien_father_deceased`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_father_deceased')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.is_alien_father_deceased == false) ?
                        (
                            <div>
                                <FormItem
                                    {...formItemLayout}
                                    colon={false}
                                    label={(
                                        <span>
                                            Number and street&nbsp;
                                </span>
                                    )}
                                >
                                    {getFieldDecorator('alien_father_number_and_street', {
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
                                            {getFieldDecorator('alien_father_apartment_number', {
                                                rules: [{ required: false, message: '', whitespace: true }],
                                            })(
                                                <div>

                                                    {(this.state.father_apartmentNumber === false) ?
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
                                                <Checkbox onChange={this.onChangeCheckBox.bind(this, 'father_apartmentNumber')}>Does not apply </Checkbox>
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
                                            Town or City&nbsp;
                                    </span>
                                    )}
                                >
                                    {getFieldDecorator('alien_father_town_or_city', {
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
                                    {getFieldDecorator('alien_father_country', {
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
                                <FormItem
                                    {...formItemLayout}
                                    colon={false}
                                    label={(
                                        <span>
                                            U.S. State&nbsp;
                                        <Tooltip title="Select Does not Apply if not USA">
                                                <Icon type="question-circle-o" />
                                            </Tooltip>
                                        </span>
                                    )}
                                >
                                    {getFieldDecorator('alien_father_state', {
                                        rules: [{ required: false, message: 'Please select your State!', whitespace: true }],
                                    })(
                                        <Select
                                            style={{ maxWidth: '300px' }}
                                            placeholder="Select State"
                                            showSearch={true}
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
                                    colon={false}
                                    label={(
                                        <span>
                                            Province&nbsp;
                                </span>
                                    )}
                                >
                                    <Row gutter={16}>

                                        <Col span={16} >
                                            {getFieldDecorator('alien_father_province', {
                                                rules: [{ required: false, message: '', whitespace: true }],
                                            })(
                                                <div>
                                                    {(this.state.father_province === false) ?
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
                                                <Checkbox onChange={this.onChangeCheckBox.bind(this, 'father_province')}>Does not apply </Checkbox>
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
                                            {getFieldDecorator('alien_father_postal_code', {
                                                rules: [{ required: false, message: '', whitespace: true }],
                                            })(
                                                <div>
                                                    {(this.state.father_postal_code == false) ?
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
                                                <Checkbox onChange={this.onChangeCheckBox.bind(this, 'father_postal_code')}>Does not apply </Checkbox>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                </FormItem>
                            </div>
                        ) : (this.state.is_alien_father_deceased == true) ? (
                            <FormItem
                                {...formItemLayout}
                                colon={false}
                                label={(
                                    <span>
                                        Father's Date of Death&nbsp;
                        </span>
                                )}
                            >
                                {getFieldDecorator('alien_father_date_Of_death', {
                                    rules: [{ required: false, message: '', whitespace: true }],
                                })(
                                    <Row gutter={16}>
                                        <Col span={16}>
                                            <InputMask className="input-mask" mask="99/99/9999" placeholder="mm/dd/yyy" />
                                        </Col>
                                        <Col span={8}>
                                            <Tooltip title={`If you don't know the exact date of death you must estimate.`}>
                                                <Icon type="question-circle-o" />
                                            </Tooltip>
                                        </Col>
                                    </Row>
                                )}
                            </FormItem>
                        ) : (null)}

                    <span className="ant-form-text" style={{ marginBottom: '10px', width: '100%', textAlign: 'center' }}>
                        <b>Sponsor's Mother Information</b>
                    </span>
                    <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={(
                            <span>
                                Mother's Last Name&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('alien_mother_last_name', {
                            rules: [{ required: false, message: 'Please input sponsor mother last name!', whitespace: true }],
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
                        {getFieldDecorator('alien_mother_first_name', {
                            rules: [{ required: false, message: 'Please input sponsor mother first name!', whitespace: true }],
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
                        <Row gutter={16}>
                            <Col span={16}>
                                {getFieldDecorator('alien_mother_middle_name', {
                                    rules: [{ required: false, message: 'Please input sponsor mother middle name!', whitespace: true }],
                                })(
                                    <div>
                                        {(!this.state.alien_mother_middle_name) ?
                                            (
                                                <Input disabled={false} defaultValue={''} style={{ maxWidth: '300px' }} />
                                            ) : (
                                                <Input disabled={true} defaultValue={'N/A'} style={{ maxWidth: '300px' }} />
                                            )}
                                    </div>
                                )}
                            </Col>
                            <Col span={8}>
                                <FormItem>
                                    <Checkbox onChange={this.onChangeCheckBox.bind(this, 'alien_mother_middle_name')}>Does not apply </Checkbox>
                                </FormItem>
                            </Col>
                        </Row>
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={(<span>Has your Mother used any other names?</span>)}
                    >
                        {getFieldDecorator(`alien_mother_other_name`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'alien_mother_other_name')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.alien_mother_other_name) ?
                        (
                            <div>
                                <FormItem
                                    {...formItemLayout}
                                    colon={false}
                                    label={(
                                        <span>
                                            Mother's Last Name&nbsp;
                        </span>
                                    )}
                                >
                                    {getFieldDecorator('alien_mother_other_last_name', {
                                        rules: [{ required: false, message: 'Please input sponsor mother last name!', whitespace: true }],
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
                                    {getFieldDecorator('alien_mother_other_first_name', {
                                        rules: [{ required: false, message: 'Please input sponsor mother first name!', whitespace: true }],
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
                                    <Row gutter={16}>
                                        <Col span={16}>
                                            {getFieldDecorator('alien_mother_other_middle_name', {
                                                rules: [{ required: false, message: 'Please input sponsor mother middle name!', whitespace: true }],
                                            })(
                                                <Input style={{ maxWidth: '300px' }} />
                                            )}
                                        </Col>
                                    </Row>
                                </FormItem>
                            </div>
                        ) : (null)}

                    <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={(
                            <span>
                                Mother's Date of Birth&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('alien_mother_dob', {
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
                                Mother's Birth City&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('alien_mother_birth_city', {
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
                                Mother's Birth Country&nbsp;
                        </span>
                        )}
                    >
                        <Row gutter={16}>
                            <Col span={16}>
                                {getFieldDecorator('alien_mother_birth_country', {
                                    rules: [{ required: false, message: '', whitespace: true }],
                                })(
                                    <div>
                                        {(!this.state.alien_mother_birth_country) ?
                                            (
                                                <Input disabled={false} defaultValue={''} style={{ maxWidth: '300px' }} />

                                            ) : (
                                                <Input disabled={true} defaultValue={'Unkown'} style={{ maxWidth: '300px' }} />
                                            )}

                                    </div>
                                )}
                            </Col>
                            <Col span={8}>
                                <FormItem>
                                    <Checkbox onChange={this.onChangeCheckBox.bind(this, 'alien_mother_birth_country')}>Does not apply </Checkbox>
                                </FormItem>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={(<span>Is she deceased?</span>)}
                    >
                        {getFieldDecorator(`is_alien_mother_deceased`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_mother_deceased')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.is_alien_mother_deceased == false) ?
                        (
                            <div>
                                <FormItem
                                    {...formItemLayout}
                                    colon={false}
                                    label={(
                                        <span>
                                            Number and street&nbsp;
                                </span>
                                    )}
                                >
                                    {getFieldDecorator('alien_mother_number_and_street', {
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
                                            {getFieldDecorator('alien_mother_apartment_number', {
                                                rules: [{ required: false, message: '', whitespace: true }],
                                            })(
                                                <div>

                                                    {(this.state.mother_apartmentNumber === false) ?
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
                                                <Checkbox onChange={this.onChangeCheckBox.bind(this, 'mother_apartmentNumber')}>Does not apply </Checkbox>
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
                                            Town or City&nbsp;
                                    </span>
                                    )}
                                >
                                    {getFieldDecorator('alien_mother_town_or_city', {
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
                                    {getFieldDecorator('alien_mother_country', {
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
                                <FormItem
                                    {...formItemLayout}
                                    colon={false}
                                    label={(
                                        <span>
                                            U.S. State&nbsp;
                                        <Tooltip title="Select Does not Apply if not USA">
                                                <Icon type="question-circle-o" />
                                            </Tooltip>
                                        </span>
                                    )}
                                >
                                    {getFieldDecorator('alien_mother_state', {
                                        rules: [{ required: false, message: 'Please select your State!', whitespace: true }],
                                    })(

                                        <Select
                                            style={{ maxWidth: '300px' }}
                                            placeholder="Select State"
                                            showSearch={true}
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
                                    colon={false}
                                    label={(
                                        <span>
                                            Province&nbsp;
                                </span>
                                    )}
                                >
                                    <Row gutter={16}>

                                        <Col span={16} >
                                            {getFieldDecorator('alien_mother_province', {
                                                rules: [{ required: false, message: '', whitespace: true }],
                                            })(
                                                <div>
                                                    {(this.state.mother_province === false) ?
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
                                                <Checkbox onChange={this.onChangeCheckBox.bind(this, 'mother_province')}>Does not apply </Checkbox>
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
                                            {getFieldDecorator('alien_mother_postal_code', {
                                                rules: [{ required: false, message: '', whitespace: true }],
                                            })(
                                                <div>
                                                    {(this.state.mother_postal_code == false) ?
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
                                                <Checkbox onChange={this.onChangeCheckBox.bind(this, 'mother_postal_code')}>Does not apply </Checkbox>
                                            </FormItem>
                                        </Col>
                                    </Row>
                                </FormItem>
                            </div>
                        ) : (this.state.is_alien_mother_deceased == true) ? (
                            <FormItem
                                {...formItemLayout}
                                colon={false}
                                label={(
                                    <span>
                                        Mother's Date of Death&nbsp;
                        </span>
                                )}
                            >
                                {getFieldDecorator('alien_mother_date_Of_death', {
                                    rules: [{ required: false, message: '', whitespace: true }],
                                })(
                                    <Row gutter={16}>
                                        <Col span={16}>
                                            <InputMask className="input-mask" mask="99/99/9999" placeholder="mm/dd/yyy" />
                                        </Col>
                                        <Col span={8}>
                                            <Tooltip title={`If you don't know the exact date of death you must estimate.`}>
                                                <Icon type="question-circle-o" />
                                            </Tooltip>
                                        </Col>
                                    </Row>
                                )}
                            </FormItem>
                        ) : (null)}



                    <Button type="primary" htmlType="submit">SaveandContinue</Button>
                </Form>
            </div>
        );
    }
}

export default Form.create()(Parents);;
