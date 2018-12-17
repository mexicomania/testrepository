import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Tooltip, Icon, Row, Col, Checkbox, Button, Radio, Select } from 'antd';
import InputMask from 'react-input-mask';
import './previous-filings.css';
import { countriesName, states } from '../../../../../services/countries';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const countries = countriesName();
const US_states = states();


const resultOptions = [
    { value: "Approved, divorced and still in USA.", name: 'Approved, divorced and still in USA' },
    { value: "Approved, divorced left USA.", name: 'Approved, divorced left USA' },
    { value: "Approved, divorced location unknown.", name: 'Approved, divorced location unknown' },
    { value: "Approved but now deceased.", name: 'Approved but now deceased' },
    { value: "Approved, never came to USA.", name: 'Approved, never came to USA' },
    { value: "Approved, waiting for a Visa.", name: 'Approved, waiting for a Visa' },
    { value: "Approved, still in USA.", name: 'Approved, still in USA' },
    { value: "Approved, no longer in USA.", name: 'Approved, no longer in USA' },
    { value: "Denied, still in USA.", name: 'Denied, still in USA' },
    { value: "Denied, no longer in USA.", name: 'Denied, no longer in USA' },
    { value: "Denied, never came to USA.", name: 'Denied, never came to USA' },
    { value: "Denied, location unknown.", name: 'Denied, location unknown' },
    { value: "Denied and now deceased.", name: 'Denied and now deceased' },
    { value: "Withdrawn before approval.", name: 'Withdrawn before approval' },
    { value: "Withdrawn after approval.", name: 'Withdrawn after approval' },
    { value: "Withdrawn due to death", name: 'Withdrawn due to death' },
    { value: 'Status Unknown.Location Unknown.', name: 'Status Unknown.Location Unknown' }
]

const relationOptions = [
    { value: "", name: "(Select One)" },
    { value: "brother", name: "Brother" },
    { value: "daughter", name: "Daughter" },
    { value: "father", name: "Father" },
    { value: "mother", name: "Mother" },
    { value: "sister", name: "Sister" },
    { value: "son", name: "Son" },
    { value: "spouse", name: "Spouse" },
    { value: "step-daughter", name: "Step-Daughter" },
    { value: "step-son", name: "Step-Son" }
]

class PreviousFilings extends Component {
    state = {
        confirmDirty: false,
        filed_for_beneficiary: false,
        petition_for_relative: false
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    onChangeName(name, e) {
        console.log('checked on name', e.target.value);
        console.log('checked on name', name);
        this.setState({
            [name]: e.target.value,
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
                    <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={(
                            <span>
                                Family Name (Last Name)&nbsp;
        </span>
                        )}
                    >
                        {getFieldDecorator(`names[family_last_name${k + 1}]`, {
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
                                Famimly Name (First Name)&nbsp;
        </span>
                        )}
                    >
                        {getFieldDecorator(`names[family_first_name${k + 1}]`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row gutter={16}>
                                <Col span={16} >
                                    <Input style={{ maxWidth: '300px' }} />
                                </Col>
                                <Col span={8}>
                                    <FormItem>
                                        <Checkbox onChange={(e) => { console.log(e) }}>Does not apply </Checkbox>
                                        <Tooltip title={'Select Does Not Apply if None'}>
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
                                Middle Name&nbsp;
        </span>
                        )}
                    >
                        {getFieldDecorator(`names[family_middle_name${k + 1}]`, {
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
                                Relationship&nbsp;
                        </span>
                        )}
                        style={{ alignItems: 'center', display: 'flex' }}
                    >
                        {getFieldDecorator(`names[relationship${k + 1}]`, {
                            rules: [{ required: false, message: 'Please select relation!', whitespace: true }],
                        })(
                            <Select
                                style={{ maxWidth: '300px' }}
                                placeholder="Select Relation"
                                showSearch={true}
                                onChange={this.handleSelectChange}
                            >
                                {
                                    relationOptions.map((val, index) => {
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
                        label={(<span>Add another relationship? </span>)}
                        style={{ alignItems: 'center', display: 'flex' }}
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
            <div id="citizen-part2-previous-filing">
                <h3>Citizen Part 1.3 Previous Filings</h3>
                <p>Previous Filings</p>

                <Form onSubmit={this.handleSubmit.bind(this)} className="citizen-part2-previous-filing-form">
                    <FormItem
                        colon={false}
                        label={(<span>Has anyone else ever filed a petition for the beneficiary?</span>)}
                    >
                        {getFieldDecorator(`anyone_filed_for_beneficiary`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup>
                                        <Radio value={'No'}>No</Radio>
                                        <Radio value={"Yes"}>Yes</Radio>
                                        <Radio value={"Unkown"}>Unkown</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    <FormItem
                        className="radio-center"
                        colon={false}
                        label={(<span>Have you ever filed for this person before or any other alien before, including an Adjustment of Status, Fiancée Visa, Spousal Visa or any other immigration benefit for a husband or wife or partner?</span>)}
                    >
                        {getFieldDecorator(`you_filed_for_beneficiary`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'filed_for_beneficiary')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>

                    {(this.state.filed_for_beneficiary) ?
                        (
                            <Abc
                                getFieldDecorator={getFieldDecorator}
                                formItemLayout={formItemLayout} />
                        ) : (null)}

                    <FormItem
                        className="radio-center"
                        colon={false}
                        label={(<span>Are you submitting separate petitions for a different relative (including children) right now, at the same time, or do you already have separate petitions filed but not yet approved for a different relative?</span>)}
                    >
                        {getFieldDecorator(`petition_for_relative`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'petition_for_relative')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.petition_for_relative) ?
                        (
                            <div>
                                {formItems}
                            </div>
                        ) : (null)}

                    <Button type="primary" htmlType="submit">SaveandContinue</Button>
                </Form>
            </div>


        );
    }
}

const CitizenThree = Form.create()(PreviousFilings);

export default CitizenThree;



const Abc = ({ getFieldDecorator, formItemLayout }) =>
    (
        <div className='center-form-fields'>
            <p>Information about previous filing:
                <Tooltip title={`Indicating that you do not know at least the full name does not look good for you because it may appear that you didn't take the visa request seriously. Also, it is okay to estimate the date. Failure to provide as much information as possible could delay your case while they research the previous filing. Give them all you can so they can locate the previous file quickly. Not providing complete information here will not cause a rejection but could slow your case down. However, you must disclose previous filing even if you can't remember the details.`}>
                    <Icon type="question-circle-o" />
                </Tooltip>
            </p>
            <FormItem
                {...formItemLayout}
                colon={false}
                label={(
                    <span>
                        Alien's First Name&nbsp;
        </span>
                )}
            >
                {getFieldDecorator('alien_first_name', {
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
                        Alien's Middle Name&nbsp;
        </span>
                )}
            >
                {getFieldDecorator('alien_middle_name', {
                    rules: [{ required: false, message: '', whitespace: true }],
                })(
                    <Row gutter={16}>
                        <Col span={16} >
                            <Input style={{ maxWidth: '300px' }} />
                        </Col>
                        <Col span={8}>
                            <FormItem>
                                <Checkbox onChange={(e) => { console.log(e) }}>Does not apply </Checkbox>
                                <Tooltip title={'Select Does Not Apply if None'}>
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
                        Alien's Last Name&nbsp;
        </span>
                )}
            >
                {getFieldDecorator('alien_last_name', {
                    rules: [{ required: false, message: '', whitespace: true }],
                })(
                    <Row gutter={16}>
                        <Col span={16} >
                            <Input style={{ maxWidth: '300px' }} />
                        </Col>
                        <Col span={8}>
                            <FormItem>
                                <Tooltip title={'If there is a suffix after the name such as Jr. or III, put that here after the last name.'}>
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
                        Alien Registration Number or A#&nbsp;
        </span>
                )}
            >
                {getFieldDecorator('registration_number', {
                    rules: [{ required: false, message: '', whitespace: true }],
                })(
                    <Row gutter={16}>
                        <Col span={16} >
                            <Input style={{ maxWidth: '300px' }} />
                        </Col>
                        <Col span={8}>
                            <FormItem>
                                <Tooltip title={'Do not include the \'\A\'\ or #.'}>
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
                        City of Filing&nbsp;
                    </span>
                )}
            >
                {getFieldDecorator('city_of_filing', {
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
                        U.S. State&nbsp;
                        <Tooltip title={`Select Does not Apply if not USA`}>
                            <Icon type="question-circle-o" />
                        </Tooltip>
                    </span>
                )}
            >
                {getFieldDecorator('US_state', {
                    rules: [{ required: false, message: 'Please select your state!', whitespace: true }],
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
                        Date of Filing&nbsp;
                    </span>
                )}
            >
                {getFieldDecorator('date_of_filing', {
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
                label={(
                    <span>
                        Results of Application&nbsp;
                    </span>
                )}
            >
                {getFieldDecorator('result_of_application', {
                    rules: [{ required: false, message: 'Please select any', whitespace: true }],
                })(
                    <Select
                        style={{ maxWidth: '300px' }}
                        placeholder="Select option"
                        showSearch={true}
                    >
                        {
                            resultOptions.map((val, index) => {
                                return (
                                    <Option key={index} value={val.value}>{val.name}</Option>
                                )
                            })
                        }
                    </Select>
                )}
            </FormItem>
        </div>
    )

