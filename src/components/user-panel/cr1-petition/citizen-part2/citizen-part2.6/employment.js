import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Tooltip, Icon, Row, Col, Button, Select, Radio } from 'antd';
import './employment.css';

import { countriesName, states } from '../../../../../services/countries';
import InputMask from 'react-input-mask';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const countries = countriesName();
const US_states = states();

const jobCategories = [
    { value: "", name: "(Select One)" },
    { value: "Agriculture", name: "Agriculture" },
    { value: "Artist/Performer", name: "Artist/Performer" },
    { value: "Business", name: "Business" },
    { value: "Communications", name: "Communications" },
    { value: "Computer Science", name: "Computer Science" },
    { value: "Culinary/Food Services", name: "Culinary/Food Services" },
    { value: "Education", name: "Education" },
    { value: "Engineering", name: "Engineering" },
    { value: "Government", name: "Government" },
    { value: "Homemaker", name: "Homemaker" },
    { value: "Legal Profession", name: "Legal Profession" },
    { value: "Medical/Health", name: "Medical/Health" },
    { value: "Military", name: "Military" },
    { value: "Natural Science", name: "Natural Science" },
    { value: "Not Employed", name: "Not Employed" },
    { value: "Physical Sciences", name: "Physical Sciences" },
    { value: "Religious Vocation", name: "Religious Vocation" },
    { value: "Research", name: "Research" },
    { value: "Retired", name: "Retired" },
    { value: "Social Science", name: "Social Science" },
    { value: "Student", name: "Student" },
    { value: "Other", name: "Other" }
]

class Employment extends Component {
    state = {
        confirmDirty: false,
        diffYear: 0,
        selectedDate: '',
        worked_outside_US: false
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
        console.log('checked on name', e.target.value);
        console.log('checked on name', name);
        this.setState({
            [name]: e.target.value,
        });
    }

    onChangeYear = (e) => {
        e.persist();
        let value = e.target.value;
        const currentYear = new Date().getFullYear();
        let selectedYear = new Date(value.toString()).getFullYear();
        let selectedDate = new Date(value.toString());
        if (selectedDate != "Invalid Date") {
            let yearDiff = currentYear - selectedYear;
            if (yearDiff > 0 && yearDiff <= 5) {
                this.setState({ selectedDate: value, diffYear: yearDiff })
                this.add();
                console.log("You must provide your address for the past five years. Enter your address prior to", value);
            }
        }
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
            <div id="citizen-part2-employment">
                <h3>Citizen Part 2.6 Employment</h3>
                <p>Employment</p>
                <p>Your Employment for the Past Five Years (U.S. Citizen Sponsor)</p>
                <Form onSubmit={this.handleSubmit.bind(this)} className="citizen-part2-employment-form">
                    <span className="ant-form-text" style={{ marginBottom: '10px' }}>
                        <b>Enter 'Unemployed' or 'Retired' if appropriate. More space will be provided as needed to go back 5 years. You will need a source of income or adequate assets to be approved. </b>
                        <Tooltip placement="right" title={`If you have brief periods of unemployment, just extend the end date of the previous job to cover the time. If you have longer periods of unemployment, list them with a start date just as you would a job. For periods of unemployment, list both the Name and Occupation as 'Unemployed'. Do the same for periods when you were a student. Note that for a K-1 Fiancee Visa, the embassy is not required to allow a Joint Sponsor, and if your income and assets alone are not adequate you may be denied. If you are currently unemployed or retired you should attach a letter to your petition explaining how you will meet the income requirements.`}>
                            <Icon type="question-circle-o" />
                        </Tooltip>
                    </span>
                    <div className="center-field-label">
                        <FormItem
                            {...formItemLayout}
                            colon={false}
                            label={(
                                <span>
                                    Name of Employer/Company&nbsp;
                                </span>
                            )}
                        >
                            {getFieldDecorator('company_name', {
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
                                    Occupation or Job Title&nbsp;
                        </span>
                            )}
                        >
                            {getFieldDecorator('job_title', {
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
                                    Number and street&nbsp;
                                </span>
                            )}
                        >
                            {getFieldDecorator('employment_number_street', {
                                rules: [{ required: false, message: '', whitespace: true }],
                            })(
                                <Row gutter={16}>
                                    <Col span={16} >
                                        <Input disabled={false} style={{ maxWidth: '300px' }} />
                                    </Col>
                                </Row>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            colon={false}
                            label={(
                                <span>
                                    Apt or Ste or Flr number&nbsp;
                        </span>
                            )}
                        >
                            {getFieldDecorator('company_apt_ste_flr_number', {
                                rules: [{ required: true, message: 'Please input!', whitespace: true }],
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
                                    Town or City&nbsp;
                                </span>
                            )}
                        >
                            {getFieldDecorator('company_city', {
                                rules: [{ required: true, message: 'Please input!', whitespace: true }],
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
                            {getFieldDecorator('company_country', {
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
                            {getFieldDecorator('company_state', {
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
                            {getFieldDecorator('company_province', {
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
                                    Postal Code&nbsp;
                        </span>
                            )}
                        >
                            {getFieldDecorator('company_postal_code', {
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
                                    Pick the category that best describes your job.&nbsp;
                        </span>
                            )}
                        >
                            {getFieldDecorator('job_category', {
                                rules: [{ required: false, message: 'Please select job Category!', whitespace: true }],
                            })(
                                <Row gutter={16}>
                                    <Col span={16} >
                                        <Select
                                            style={{ maxWidth: '300px' }}
                                            placeholder="Select Job Category"
                                            showSearch={true}
                                            onChange={this.handleSelectChange}
                                        >
                                            {
                                                jobCategories.map((val, index) => {
                                                    return (
                                                        <Option key={index} value={val.value}>{val.name}</Option>
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
                                    I began this job on&nbsp;
                        </span>
                            )}
                        >
                            {getFieldDecorator('began_job_date', {
                                onFieldsChange: this.onChangeYear,
                                onChange: this.onChangeYear,
                                rules: [{ required: false, message: 'Please input worked started date!', whitespace: true }],
                            })(
                                <Row gutter={16}>
                                    <Col span={16}>
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
                                {keys.map((val, ind) => 
                                    <EmploymentFields
                                        key={ind}
                                        k={ind}
                                        getFieldDecorator={getFieldDecorator}
                                        formItemLayout={formItemLayout}
                                        selectedDate={this.state.selectedDate}
                                        handleChange={this.onChangeYear}
                                        addEvent={this.add}
                                        removeEvent={this.remove} />
                                    )}
                            </div>
                            )
                        }
                    </div>

                    <FormItem
                        className="radio-center"
                        colon={false}
                        label={(
                            <span>
                                Have you (The U.S. Citizen sponsor) ever worked outside the United States?
                                <Tooltip placement="right" title="Do not include military deployment">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>)}
                    >
                        {getFieldDecorator(`worked_outside_US`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={20} style={{ textAlign: 'center' }}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'worked_outside_US')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>

                    {(this.state.worked_outside_US) ?
                        (
                            <div className="center-field-label">
                                <span className="ant-form-text" style={{ marginBottom: '10px' }}>
                                    <b>Your last employment outside of the United States.</b>
                                </span>
                                <FormItem
                                    {...formItemLayout}
                                    colon={false}
                                    label={(
                                        <span>
                                            Name of Employer/Company&nbsp;
                                        </span>
                                    )}
                                >
                                    {getFieldDecorator('outside_company_name', {
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
                                            Occupation or Job Title&nbsp;
                                </span>
                                    )}
                                >
                                    {getFieldDecorator('outside_job_title', {
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
                                            I worked for this employer, from&nbsp;
                                </span>
                                    )}
                                >
                                    {getFieldDecorator('outside_worked_from_date', {
                                        rules: [{ required: false, message: 'Please input worked from date!', whitespace: true }],
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
                                            I worked for this employer, until&nbsp;
                                </span>
                                    )}
                                >
                                    {getFieldDecorator('outside_worked_untill_date', {
                                        rules: [{ required: false, message: 'Please input worked untill date!', whitespace: true }],
                                    })(
                                        <Row gutter={16}>
                                            <Col span={16}>
                                                <InputMask className="input-mask" mask="99/99/9999" placeholder="mm/dd/yyy" />
                                            </Col>
                                        </Row>
                                    )}
                                </FormItem>
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

const CitizenSix = Form.create()(Employment);

export default CitizenSix;




const EmploymentFields = ({ k, getFieldDecorator, formItemLayout, selectedDate,handleChange,addEvent, removeEvent }) => {
    return (
        <div key={k} className="center-field-label">
            <p>You must list your employment for the past five years. Enter your employment prior to {selectedDate}</p>
            <FormItem
                {...formItemLayout}
                colon={false}
                label={(
                    <span>
                        Name, City &amp; State of Employer&nbsp;
                    </span>
                )}
            >
                {getFieldDecorator(`dynamic[company_name${k+1}]`, {
                    rules: [{ required: false, message: '', whitespace: true }],
                })(
                    <Row gutter={16}>
                        <Col span={16} >
                            <Input style={{ maxWidth: '300px' }} />
                        </Col>
                        <Col span={8}>
                            <FormItem>
                                <Tooltip placement="right" title="If the entire address will not fit, enter at least the Name, city and state (or city and country if not USA).">
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
                        Occupation or Job Title&nbsp;
                        </span>
                )}
            >
                {getFieldDecorator( `dynamic[job_title${k+1}]`, {
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
                        Number and street&nbsp;
                                </span>
                )}
            >
                {getFieldDecorator(`dynamic[employment_number_street${k+1}]`, {
                    rules: [{ required: false, message: '', whitespace: true }],
                })(
                    <Row gutter={16}>
                        <Col span={16} >
                            <Input disabled={false} style={{ maxWidth: '300px' }} />
                        </Col>
                    </Row>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                colon={false}
                label={(
                    <span>
                        Apt or Ste or Flr number&nbsp;
                        </span>
                )}
            >
                {getFieldDecorator(`dynamic[company_apt_ste_flr_number${k+1}]`, {
                    rules: [{ required: true, message: 'Please input!', whitespace: true }],
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
                        Town or City&nbsp;
                        </span>
                )}
            >
                {getFieldDecorator(`dynamic[company_city${k+1}]`, {
                    rules: [{ required: true, message: 'Please input!', whitespace: true }],
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
                {getFieldDecorator(`dynamic[company_country${k+1}]`, {
                    rules: [{ required: false, message: 'Please select your country!', whitespace: true }],
                })(
                    <Row gutter={16}>
                        <Col span={16} >
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
                {getFieldDecorator(`dynamic[company_state${k+1}]`, {
                    rules: [{ required: false, message: 'Please select your State!', whitespace: true }],
                })(
                    <Row gutter={16}>
                        <Col span={16} >
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
                {getFieldDecorator(`dynamic[company_province${k+1}]`, {
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
                        Postal Code&nbsp;
                        </span>
                )}
            >
                {getFieldDecorator(`dynamic[company_postal_code${k+1}]`, {
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
                        I worked for this employer from&nbsp;
                    </span>
                )}
            >
                {getFieldDecorator(`dynamic[began_job_date${k+1}]`, {
                    onFieldsChange: handleChange,
                    onChange: handleChange,
                    rules: [{ required: false, message: 'Please input worked started date!', whitespace: true }],
                })(
                    <Row gutter={16}>
                        <Col span={16}>
                            <InputMask className="input-mask" mask="99/99/9999" placeholder="mm/dd/yyy" />
                        </Col>
                        <Col span={8}>
                            <p>Until {new Date(selectedDate).toLocaleDateString()}</p>
                        </Col>
                    </Row>
                )}
            </FormItem>

        </div>
    )
}