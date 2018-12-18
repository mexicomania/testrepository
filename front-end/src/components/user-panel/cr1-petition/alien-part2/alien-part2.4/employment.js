import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Tooltip, Icon, Row, Col, Button, Select, Radio, Checkbox } from 'antd';
import './employment.css';

import { countriesName, states } from '../../../../../services/countries';
import InputMask from 'react-input-mask';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const InputText = Input.TextArea;

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
        worked_outside_US: false,
        alien_company_state_or_province: false,
        alien_company_postal_code: false,
        alien_company_phone: false,
        alien_company_supervisor_first_name: false,
        alien_company_supervisor_last_name: false,
        alien_income: false
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

    onChangeCheckBox = (name, e) => {
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
        // this.add();
    }

    render() {
        console.log("render")

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
        console.log(keys)

        return (
            <div id="alien-part2-employment">
                <h3>Alien Part 2.4 Employment</h3>
                <p>Alien's Employment Last Five Years (most recent first)</p>
                <Form onSubmit={this.handleSubmit.bind(this)} className="alien-part2-employment-form">

                    <div className="center-field-label">
                        <FormItem
                            {...formItemLayout}
                            colon={false}
                            label={(
                                <span>
                                    Name of Company or School&nbsp;
                                </span>
                            )}
                        >
                            {getFieldDecorator('alien_company_name', {
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
                                    street&nbsp;
                                </span>
                            )}
                        >
                            {getFieldDecorator('alien_employment_street', {
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
                                    City&nbsp;
                                </span>
                            )}
                        >
                            {getFieldDecorator('alien_company_city', {
                                rules: [{ required: false, message: 'Please input!', whitespace: true }],
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
                            <Row gutter={16}>
                                <Col span={16} >
                                    {getFieldDecorator('alien_company_state_or_province', {
                                        rules: [{ required: false, message: '', whitespace: true }],
                                    })(
                                        <div>
                                            {(!this.state.alien_company_state_or_province) ?
                                                (
                                                    <Input disabled={false} defaultValue={''} style={{ maxWidth: '300px' }} />
                                                ) : (
                                                    <Input disabled={true} defaultValue={'N/A'} style={{ maxWidth: '300px' }} />
                                                )}
                                        </div>
                                    )}
                                </Col>
                                <Col span={8}>
                                    <Checkbox onChange={this.onChangeCheckBox.bind(this, 'alien_company_state_or_province')}>Does not apply </Checkbox>
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
                                    {getFieldDecorator('alien_company_postal_code', {
                                        rules: [{ required: false, message: '', whitespace: true }],
                                    })(
                                        <div>
                                            {(!this.state.alien_company_postal_code) ?
                                                (
                                                    <Input disabled={false} defaultValue={''} style={{ maxWidth: '300px' }} />
                                                ) : (
                                                    <Input disabled={true} defaultValue={'N/A'} style={{ maxWidth: '300px' }} />
                                                )}
                                        </div>
                                    )}
                                </Col>
                                <Col span={8}>
                                    <Checkbox onChange={this.onChangeCheckBox.bind(this, 'alien_company_postal_code')}>Does not apply </Checkbox>
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
                            {getFieldDecorator('alien_company_country', {
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
                                    Phone&nbsp;
                        </span>
                            )}
                        >
                            <Row gutter={16}>
                                <Col span={16} >
                                    {getFieldDecorator('alien_company_phone', {
                                        rules: [{ required: false, message: '', whitespace: true }],
                                    })(
                                        <div>
                                            {(!this.state.alien_company_phone) ?
                                                (
                                                    <Input disabled={false} defaultValue={''} style={{ maxWidth: '300px' }} />
                                                ) : (
                                                    <Input disabled={true} defaultValue={'N/A'} style={{ maxWidth: '300px' }} />
                                                )}
                                        </div>
                                    )}
                                </Col>
                                <Col span={8}>
                                    <Checkbox onChange={this.onChangeCheckBox.bind(this, 'alien_company_phone')}>Does not apply </Checkbox>
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            colon={false}
                            label={(
                                <span>
                                    Supervisor's First Name&nbsp;
                        </span>
                            )}
                        >
                            <Row gutter={16}>
                                <Col span={16} >
                                    {getFieldDecorator('alien_company_supervisor_first_name', {
                                        rules: [{ required: false, message: '', whitespace: true }],
                                    })(
                                        <div>
                                            {(!this.state.alien_company_supervisor_first_name) ?
                                                (
                                                    <Input disabled={false} defaultValue={''} style={{ maxWidth: '300px' }} />
                                                ) : (
                                                    <Input disabled={true} defaultValue={'N/A'} style={{ maxWidth: '300px' }} />
                                                )}
                                        </div>
                                    )}
                                </Col>
                                <Col span={8}>
                                    <Checkbox onChange={this.onChangeCheckBox.bind(this, 'alien_company_supervisor_first_name')}>Don't Know or Does not apply </Checkbox>
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            colon={false}
                            label={(
                                <span>
                                    Supervisor's Last Name&nbsp;
                        </span>
                            )}
                        >
                            <Row gutter={16}>
                                <Col span={16} >
                                    {getFieldDecorator('alien_company_supervisor_last_name', {
                                        rules: [{ required: false, message: '', whitespace: true }],
                                    })(
                                        <div>
                                            {(!this.state.alien_company_supervisor_last_name) ?
                                                (
                                                    <Input disabled={false} defaultValue={''} style={{ maxWidth: '300px' }} />
                                                ) : (
                                                    <Input disabled={true} defaultValue={'N/A'} style={{ maxWidth: '300px' }} />
                                                )}
                                        </div>
                                    )}
                                </Col>
                                <Col span={8}>
                                    <Checkbox onChange={this.onChangeCheckBox.bind(this, 'alien_company_supervisor_last_name')}>Don't Know or Does not apply </Checkbox>
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            colon={false}
                            label={(
                                <span>
                                    Monthly Income in Local Currency&nbsp;
                        </span>
                            )}
                        >
                            <Row gutter={16}>
                                <Col span={16} >
                                    {getFieldDecorator('alien_income', {
                                        rules: [{ required: false, message: '', whitespace: true }],
                                    })(
                                        <div>
                                            {(!this.state.alien_income) ?
                                                (
                                                    <Input disabled={false} defaultValue={''} style={{ maxWidth: '300px' }} />
                                                ) : (
                                                    <Input disabled={true} defaultValue={'N/A'} style={{ maxWidth: '300px' }} />
                                                )}
                                        </div>
                                    )}
                                </Col>
                                <Col span={8}>
                                    <Checkbox onChange={this.onChangeCheckBox.bind(this, 'alien_income')}>Does not apply </Checkbox>
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            colon={false}
                            label={(
                                <span>
                                    Briefly explain your duties, studies or reason for this status below&nbsp;
                                </span>
                            )}
                        >
                            <Row gutter={16}>
                                <Col span={16} >
                                    {getFieldDecorator('alien_duties', {
                                        rules: [{ required: false, message: '', whitespace: true }],
                                    })(
                                        <InputText cols={3} style={{ maxWidth: '300px' }} />
                                    )}
                                </Col>
                            </Row>
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
                            {getFieldDecorator('alien_job_title', {
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
                            {getFieldDecorator('alien_job_category', {
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
                            {getFieldDecorator('alien_began_job_date', {
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
                                            data={this.state}
                                            handleChange={this.onChangeYear.bind(this)}
                                            onChangeCheckBox={this.onChangeCheckBox.bind(this)}/>
                                    )}
                                </div>
                            )
                        }
                    </div>
                    <span className="ant-form-text" style={{ marginBottom: '10px' }}>
                        <b>What type of work do you intend to do in the United States?</b>
                    </span>
                    <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={(
                            <span>
                                Pick the category that best describes your intended occupation&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('alien_intended_job_category', {
                            rules: [{ required: false, message: 'Please select Category!', whitespace: true }],
                        })(
                            <Row gutter={16}>
                                <Col span={16} >
                                    <Select
                                        style={{ maxWidth: '300px' }}
                                        placeholder="Select Category"
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

                    <Button type="primary" htmlType="submit">SaveandContinue</Button>
                </Form>
            </div>
        );
    }
}

const CitizenSix = Form.create()(Employment);

export default CitizenSix;




const EmploymentFields = ({ k, getFieldDecorator, formItemLayout, selectedDate, handleChange,onChangeCheckBox,data }) => {
    return (
        <div key={k} className="center-field-label">
            <p>You must list your employment for the past five years. Enter your employment prior to {selectedDate}</p>
            <FormItem
                {...formItemLayout}
                colon={false}
                label={(
                    <span>
                        Name of Company or School&nbsp;
                                </span>
                )}
            >
                {getFieldDecorator(`dynamic[alien_company_name${k+1}]`, {
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
                        street&nbsp;
                                </span>
                )}
            >
                {getFieldDecorator(`dynamic[alien_employment_street${k+1}]`, {
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
                        City&nbsp;
                    </span>
                )}
            >
                {getFieldDecorator(`dynamic[alien_company_city${k+1}]`, {
                    rules: [{ required: false, message: 'Please input!', whitespace: true }],
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
                <Row gutter={16}>
                    <Col span={16} >
                        {getFieldDecorator(`dynamic[alien_company_state_or_province${k+1}]`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <div>
                                {(!data.alien_company_state_or_province) ?
                                    (
                                        <Input disabled={false} defaultValue={''} style={{ maxWidth: '300px' }} />
                                    ) : (
                                        <Input disabled={true} defaultValue={'N/A'} style={{ maxWidth: '300px' }} />
                                    )}
                            </div>
                        )}
                    </Col>
                    <Col span={8}>
                        <Checkbox onChange={onChangeCheckBox.bind(this, 'alien_company_state_or_province')}>Does not apply </Checkbox>
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
                        {getFieldDecorator(`dynamic[alien_company_postal_code${k+1}]`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <div>
                                {(!data.alien_company_postal_code) ?
                                    (
                                        <Input disabled={false} defaultValue={''} style={{ maxWidth: '300px' }} />
                                    ) : (
                                        <Input disabled={true} defaultValue={'N/A'} style={{ maxWidth: '300px' }} />
                                    )}
                            </div>
                        )}
                    </Col>
                    <Col span={8}>
                        <Checkbox onChange={onChangeCheckBox.bind(this, 'alien_company_postal_code')}>Does not apply </Checkbox>
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
                {getFieldDecorator(`dynamic[alien_company_country${k+1}]`, {
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
                        Phone&nbsp;
                        </span>
                )}
            >
                <Row gutter={16}>
                    <Col span={16} >
                        {getFieldDecorator(`dynamic[alien_company_phone${k+1}]`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <div>
                                {(!data.alien_company_phone) ?
                                    (
                                        <Input disabled={false} defaultValue={''} style={{ maxWidth: '300px' }} />
                                    ) : (
                                        <Input disabled={true} defaultValue={'N/A'} style={{ maxWidth: '300px' }} />
                                    )}
                            </div>
                        )}
                    </Col>
                    <Col span={8}>
                        <Checkbox onChange={onChangeCheckBox.bind(this, 'alien_company_phone')}>Does not apply </Checkbox>
                    </Col>
                </Row>
            </FormItem>
            <FormItem
                {...formItemLayout}
                colon={false}
                label={(
                    <span>
                        Supervisor's First Name&nbsp;
                        </span>
                )}
            >
                <Row gutter={16}>
                    <Col span={16} >
                        {getFieldDecorator(`dynamic[alien_company_supervisor_first_name${k+1}]`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <div>
                                {(!data.alien_company_supervisor_first_name) ?
                                    (
                                        <Input disabled={false} defaultValue={''} style={{ maxWidth: '300px' }} />
                                    ) : (
                                        <Input disabled={true} defaultValue={'N/A'} style={{ maxWidth: '300px' }} />
                                    )}
                            </div>
                        )}
                    </Col>
                    <Col span={8}>
                        <Checkbox onChange={onChangeCheckBox.bind(this, 'alien_company_supervisor_first_name')}>Don't Know or Does not apply </Checkbox>
                    </Col>
                </Row>
            </FormItem>
            <FormItem
                {...formItemLayout}
                colon={false}
                label={(
                    <span>
                        Supervisor's Last Name&nbsp;
                        </span>
                )}
            >
                <Row gutter={16}>
                    <Col span={16} >
                        {getFieldDecorator(`dynamic[alien_company_supervisor_last_name${k+1}]`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <div>
                                {(!data.alien_company_supervisor_last_name) ?
                                    (
                                        <Input disabled={false} defaultValue={''} style={{ maxWidth: '300px' }} />
                                    ) : (
                                        <Input disabled={true} defaultValue={'N/A'} style={{ maxWidth: '300px' }} />
                                    )}
                            </div>
                        )}
                    </Col>
                    <Col span={8}>
                        <Checkbox onChange={onChangeCheckBox.bind(this, 'alien_company_supervisor_last_name')}>Don't Know or Does not apply </Checkbox>
                    </Col>
                </Row>
            </FormItem>
            <FormItem
                {...formItemLayout}
                colon={false}
                label={(
                    <span>
                        Monthly Income in Local Currency&nbsp;
                        </span>
                )}
            >
                <Row gutter={16}>
                    <Col span={16} >
                        {getFieldDecorator(`dynamic[alien_income${k+1}]`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <div>
                                {(!data.alien_income) ?
                                    (
                                        <Input disabled={false} defaultValue={''} style={{ maxWidth: '300px' }} />
                                    ) : (
                                        <Input disabled={true} defaultValue={'N/A'} style={{ maxWidth: '300px' }} />
                                    )}
                            </div>
                        )}
                    </Col>
                    <Col span={8}>
                        <Checkbox onChange={onChangeCheckBox.bind(this, 'alien_income')}>Does not apply </Checkbox>
                    </Col>
                </Row>
            </FormItem>
            <FormItem
                {...formItemLayout}
                colon={false}
                label={(
                    <span>
                        Briefly explain your duties, studies or reason for this status below&nbsp;
                    </span>
                )}
            >
                <Row gutter={16}>
                    <Col span={16} >
                        {getFieldDecorator(`dynamic[alien_duties${k+1}]`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <InputText cols={3} style={{ maxWidth: '300px' }} />
                        )}
                    </Col>
                </Row>
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
                {getFieldDecorator(`dynamic[alien_job_title${k+1}]`, {
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
                {getFieldDecorator(`dynamic[alien_worked_from${k+1}]`, {
                    onFieldsChange: handleChange,
                    onChange: handleChange,
                    rules: [{ required: false, message: 'Please input worked started date!', whitespace: true }],
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
}