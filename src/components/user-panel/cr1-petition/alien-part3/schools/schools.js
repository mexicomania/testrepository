import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Tooltip, Icon, Row, Col, Checkbox, Button, Radio, Select } from 'antd';
import './schools.css';
import InputMask from 'react-input-mask';


import { countriesName } from '../../../../../services/countries';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const countries = countriesName();

class Schools extends Component {
    state = {
        confirmDirty: false,
        is_alien_attended_school: false,
        alien_school_state_or_province: false,
        alien_school_postal_code: false
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

    remove = (k) => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        if (keys.length === 1) {
            return;
        }
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    add = () => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(keys.length);
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

        return (
            <div id="alien-part3-schools">
                <h3>Alien Part 3.2 Schools</h3>

                <p>Alien Schools</p>
                <p>All questions are about the Alien (foreign citizen).</p>
                <Form onSubmit={this.handleSubmit.bind(this)} className="alien-part3-schools-form">

                    <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={(<span>Have you attended school past the elementary level?</span>)}
                    >
                        {getFieldDecorator(`is_alien_attended_school`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16}>
                                    <RadioGroup style={{ paddingLeft: '10px' }} onChange={this.onChangeName.bind(this, 'is_alien_attended_school')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>

                    {(this.state.is_alien_attended_school) ?
                        (
                            <div className="field-items">
                                <p>
                                    List all educational institutions attended by the alien after Elementary school (do not include Elementary school) You will list middle schools, high schools, vocational schools and college. Start with the most recent school. Schools before High School don't need to be listed if you run out of room. If you don't have exact details list your best estimate.
                            </p>
                                {keys.map((val, index) =>
                                    <DynamicSchoolFields
                                        key={index}
                                        k={index}
                                        data={this.state}
                                        getFieldDecorator={getFieldDecorator}
                                        formItemLayout={formItemLayout}
                                        addEvent={this.add}
                                        removeEvent={this.remove}
                                        onChangeCheckBox={this.onChangeCheckBox.bind(this)}
                                    />
                                )}
                            </div>
                        ) : (null)}

                    <Button type="primary" htmlType="submit">SaveandContinue</Button>
                </Form>
            </div >


        );
    }
}

export default Form.create()(Schools);


const DynamicSchoolFields = ({ k, data, getFieldDecorator, formItemLayout, addEvent, removeEvent, onChangeCheckBox }) => {
    return (
        <div>
            <p>School #{k + 1}</p>
            <FormItem
                {...formItemLayout}
                colon={false}
                label={(
                    <span>
                        School Name&nbsp;
            </span>
                )}
            >
                {getFieldDecorator(`dynamic[alien_school${k + 1}]`, {
                    rules: [{ required: false, message: 'Please input school name!', whitespace: true }],
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
                label="Street">
                <Row gutter={16}>
                    <Col span={16}>
                        {getFieldDecorator(`dynamic[alien_school_street${k + 1}]`, {
                            rules: [{ required: false, message: 'Please input apartment number!', whitespace: true }],
                        })(
                            <Input style={{ maxWidth: '300px' }} />
                        )}
                    </Col>
                </Row>
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
                {getFieldDecorator(`dynamic[alien_school_city${k + 1}]`, {
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
                label="State or Province"
            >
                <Row gutter={16}>
                    <Col span={16} >
                        {getFieldDecorator(`dynamic[alien_school_state_or_province${k + 1}]`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <div>
                                {(data.alien_school_state_or_province === false) ?
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
                            <Checkbox onChange={onChangeCheckBox.bind(this, 'alien_school_state_or_province')}>Does not apply </Checkbox>
                        </FormItem>
                    </Col>
                </Row>
            </FormItem>
            <FormItem
                {...formItemLayout}
                colon={false}
                label="Postal Code"
            >
                <Row gutter={16}>
                    <Col span={16} >
                        {getFieldDecorator(`dynamic[alien_school_postal_code${k + 1}]`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <div>
                                {(data.alien_school_postal_code === false) ?
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
                            <Checkbox onChange={onChangeCheckBox.bind(this, 'alien_school_postal_code')}>Does not apply </Checkbox>
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
                        {getFieldDecorator(`dynamic[alien_school_country${k + 1}]`, {
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
                    </Col>
                </Row>
            </FormItem>
            <FormItem
                {...formItemLayout}
                colon={false}
                label={(<span>Course of Study&nbsp;</span>)}>
                {getFieldDecorator(`dynamic[alien_course_of_study${k + 1}]`, {
                    rules: [{ required: false, message: '', whitespace: true }],
                })(
                    <Row gutter={16}>
                        <Col span={16} >
                            <Input style={{ maxWidth: '300px' }} />
                        </Col>
                        <Col span={8} >
                            <Tooltip title={'For middle school, junior high or high school course of study enter Academic or Vocational. For all other educational levels indicate your major or concentration.'}>
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </Col>
                    </Row>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                colon={false}
                label={(<span>Degree or Diploma&nbsp;</span>)}>
                {getFieldDecorator(`dynamic[alien_degree_or_diploma${k + 1}]`, {
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
                label={(<span>Start Date&nbsp;</span>)}>
                {getFieldDecorator(`dynamic[alien_start_date${k + 1}]`, {
                    rules: [{ required: false, message: '', whitespace: true }],
                })(
                    <Row gutter={16}>
                        <Col span={16} >
                            <InputMask className="input-mask" mask="99/99/9999" placeholder="mm/dd/yyy" />
                        </Col>
                    </Row>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                colon={false}
                label={(<span>End Date&nbsp;</span>)}>
                {getFieldDecorator(`dynamic[alien_end_date${k + 1}]`, {
                    rules: [{ required: false, message: '', whitespace: true }],
                })(
                    <Row gutter={16}>
                        <Col span={16} >
                            <InputMask className="input-mask" mask="99/99/9999" placeholder="mm/dd/yyy" />
                        </Col>
                    </Row>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                colon={false}
                label={(<span>Add another school?</span>)}
            >
                {getFieldDecorator(`another_school`, {
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
