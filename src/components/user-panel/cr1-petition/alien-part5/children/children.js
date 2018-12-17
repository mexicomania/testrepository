import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Tooltip, Icon, Row, Col, Button, Select, Checkbox, Radio, Divider } from 'antd';
import './children.css';

import { countriesName, states } from '../../../../../services/countries';
import InputMask from 'react-input-mask';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const countries = countriesName();
const US_states = states();

const RaceOptions = [
    { label: 'White', value: 'White' },
    { label: 'Asian', value: 'Asian' },
    { label: 'Black or African American', value: 'Black or African American' },
    { label: 'American Indian or Alaska Native', value: 'American Indian or Alaska Native' },
    { label: 'Native Hawaiian or Other Pacific Islander', value: 'Native Hawaiian or Other Pacific Islander' }
];

const HairColorOptions = [
    { label: 'Black', value: 'Black' },
    { label: 'Brown', value: 'Brown' },
    { label: 'Blond', value: 'Blond' },
    { label: 'Gray', value: 'Gray' },
    { label: 'White', value: 'White' },
    { label: 'Red', value: 'Red' },
    { label: 'Sandy', value: 'Sandy' },
    { label: 'Bald (No Hair)', value: 'Bald' },
    { label: 'Unknown/Other', value: 'Other' },
];

class Children extends Component {
    state = {
        confirmDirty: false,
        alien_have_children: false,
        child_address_same: undefined,
        is_child_join_petition: undefined,
        father_other_name: false,
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
            <div id="alien-part5-children">
                <h3>Alien Part 5 Children of Alien Beneficiary</h3>

                <div className="general-box">
                    <p>
                        You must list all children, include all biological or legally adopted children,
                        as well as current stepchildren, of any age, whether born in the United States or
                        other countries, married or unmarried, living with you or elsewhere and includes any
                        missing children and those born to you outside of marriage.
                    </p>
                    <p>
                        Please list all the children who are immigrating first, followed by children who
                        will not be immigrating. Then try to list by age ordered from lowest to hightest.
                    </p>
                </div>
                <Form onSubmit={this.handleSubmit.bind(this)} className="alien-part5-children-form">
                    <div className="general-box" style={{ backgroundColor: '#e2e1e0' }}>
                        <FormItem
                            {...formItemLayout}
                            colon={false}
                            label={<span>Do you have any children?</span>}
                        >
                            {getFieldDecorator('alien_have_children', {
                                rules: [{ required: true, message: '', whitespace: true }],
                            })(
                                <Row>
                                    <Col span={8}>
                                        <RadioGroup onChange={this.onChangeName.bind(this, 'alien_have_children')}>
                                            <Radio value={false}>No</Radio>
                                            <Radio value={true}>Yes</Radio>
                                        </RadioGroup>
                                    </Col>
                                </Row>
                            )}
                        </FormItem>
                    </div>
                    {(this.state.alien_have_children) ?
                        (
                            <div>
                                {keys.map((val, index) =>
                                    <ChildFields
                                        key={index}
                                        k={index}
                                        getFieldDecorator={getFieldDecorator}
                                        formItemLayout={formItemLayout}
                                        data={this.state}
                                        addEvent={this.add.bind(this)}
                                        removeEvent={this.remove.bind(this)}
                                        radioEvent={this.onChangeName.bind(this)} />
                                )}
                            </div>
                        ) : (null)}

                    <Button type="primary" htmlType="submit">SaveandContinue</Button>
                </Form>
            </div>
        );
    }
}

export default Form.create()(Children);;


const ChildFields = ({ k, data, getFieldDecorator, formItemLayout, addEvent, removeEvent, radioEvent }) => {
    return (
        <div>
            <div className="general-box" style={{ marginTop: '15px', backgroundColor: '#e2e1e0' }}>
                <span className="ant-form-text" >
                    <b>First Child Name</b>
                </span>
                <Divider />
                <FormItem
                    {...formItemLayout}
                    colon={false}
                    label={(
                        <span>
                            First Name&nbsp;
                                </span>
                    )}
                >
                    <Row gutter={16}>
                        <Col span={16} >
                            {getFieldDecorator(`children[first_name${k + 1}]`, {
                                rules: [{ required: true, message: '', whitespace: true }],
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
                            Middle Name&nbsp;
                                 </span>
                    )}
                >
                    <Row gutter={16}>
                        <Col span={16} >
                            {getFieldDecorator(`children[middle_name${k + 1}]`, {
                                rules: [{ required: true, message: '', whitespace: true }],
                            })(
                                <div>
                                    <Tooltip title='Enter N/A if none'>
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
                            Last Name&nbsp;
                                 </span>
                    )}
                >
                    <Row gutter={16}>
                        <Col span={16} >
                            {getFieldDecorator(`children[last_name${k + 1}]`, {
                                rules: [{ required: true, message: '', whitespace: true }],
                            })(
                                <Input style={{ maxWidth: '300px' }} />
                            )}
                        </Col>
                    </Row>
                </FormItem>
            </div>
            <div className="general-box" style={{ marginTop: '15px', backgroundColor: '#e2e1e0' }}>
                <span className="ant-form-text">
                    <b>Physical Characteristics</b>
                </span>
                <Divider />
                <FormItem
                    style={{ display: 'flex', alignItems: 'center' }}
                    {...formItemLayout}
                    colon={false}
                    label={(
                        <span>
                            Feet&nbsp;
                        </span>
                    )}
                >
                    {getFieldDecorator(`children[feet${k + 1}]`, {
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
                    style={{ display: 'flex', alignItems: 'center' }}
                    {...formItemLayout}
                    colon={false}
                    label={(
                        <span>
                            Inches&nbsp;
                        </span>
                    )}
                >
                    {getFieldDecorator(`children[inches${k + 1}]`, {
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
                    style={{ display: 'flex', alignItems: 'center' }}
                    {...formItemLayout}
                    colon={false}
                    label={(
                        <span>
                            Pounds&nbsp;
                        </span>
                    )}
                >
                    {getFieldDecorator(`children[pounds${k + 1}]`, {
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
                    label={(<span>Ethnicity</span>)}
                >
                    {getFieldDecorator(`children[ethnicity${k + 1}]`, {
                        rules: [{ required: false, message: 'Please Select!', whitespace: true }],
                    })(
                        <Row>
                            <Col span={16}>
                                <RadioGroup>
                                    <Radio value={false}>Not Hispanic or Latino</Radio>
                                    <Radio value={true}>Hispanic or Latino</Radio>
                                </RadioGroup>
                            </Col>
                        </Row>
                    )}
                </FormItem>
                <FormItem
                    colon={false}
                    label={(
                        <span>
                            Race&nbsp;
                            </span>
                    )}
                >
                    {getFieldDecorator(`children[race${k + 1}]`, {
                        rules: [{ required: true, message: '', whitespace: true }],
                    })(
                        <Row gutter={16}>
                            <Col span={24} >
                                <RadioGroup>
                                    {RaceOptions.map((val, index) => {
                                        return (
                                            <Radio key={index} value={val.value}>{val.label}</Radio>
                                        )
                                    })}
                                </RadioGroup>
                            </Col>
                        </Row>
                    )}
                </FormItem>
                <FormItem
                    colon={false}
                    label={(
                        <span>
                            Hair Color&nbsp;
                            </span>
                    )}
                >
                    {getFieldDecorator(`children[hair_color${k + 1}]`, {
                        rules: [{ required: true, message: '', whitespace: true }],
                    })(
                        <Row gutter={16}>
                            <Col span={24} >
                                <RadioGroup>
                                    {HairColorOptions.map((val, index) => {
                                        return (
                                            <Radio key={index} value={val.value}>{val.label}</Radio>
                                        )
                                    })}
                                </RadioGroup>
                            </Col>
                        </Row>
                    )}
                </FormItem>
            </div>
            <div className="general-box" style={{ marginTop: '15px', backgroundColor: '#e2e1e0' }}>
                <FormItem
                    {...formItemLayout}
                    colon={false}
                    label={<span>Is the address for this child the same as the alien parent?</span>}
                >
                    {getFieldDecorator(`children[child_address_same${k + 1}]`, {
                        rules: [{ required: true, message: '', whitespace: true }],
                    })(
                        <Row>
                            <Col span={8}>
                                <RadioGroup onChange={radioEvent.bind(this, `child_address_same${k+1}`)}>
                                    <Radio value={false}>No</Radio>
                                    <Radio value={true}>Yes</Radio>
                                </RadioGroup>
                            </Col>
                        </Row>
                    )}
                </FormItem>
                {(data[`child_address_same${k+1}`] == false) ?
                    (
                        <div>
                            <span className="ant-form-text">
                                <b>Address</b>
                            </span>
                            <Divider />
                            <FormItem
                                {...formItemLayout}
                                colon={false}
                                label={(
                                    <span>
                                        Street&nbsp;
                                            </span>
                                )}
                            >
                                <Row gutter={16}>
                                    <Col span={16} >
                                        {getFieldDecorator(`children[child_street${k + 1}]`, {
                                            rules: [{ required: true, message: '', whitespace: true }],
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
                                        Apartment&nbsp;
                                            </span>
                                )}
                            >
                                <Row gutter={16}>
                                    <Col span={16} >
                                        {getFieldDecorator(`children[child_apartment${k + 1}]`, {
                                            rules: [{ required: true, message: '', whitespace: true }],
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
                                <Row gutter={16}>
                                    <Col span={16} >
                                        {getFieldDecorator(`children[child_city${k + 1}]`, {
                                            rules: [{ required: true, message: '', whitespace: true }],
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
                                        Province (State if USA)&nbsp;
                                            </span>
                                )}
                            >
                                <Row gutter={16}>
                                    <Col span={16} >
                                        {getFieldDecorator(`children[child_province${k + 1}]`, {
                                            rules: [{ required: true, message: '', whitespace: true }],
                                        })(
                                            <Tooltip title={'Enter None if appropriate'}>
                                                <Input style={{ maxWidth: '300px' }} />
                                            </Tooltip>
                                        )}
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
                                        {getFieldDecorator(`children[child_country${k + 1}]`, {
                                            rules: [{ required: true, message: '', whitespace: true }],
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
                                        Postal Code&nbsp;
                                            </span>
                                )}
                            >
                                <Row gutter={16}>
                                    <Col span={16} >
                                        {getFieldDecorator(`children[child_postal_code${k + 1}]`, {
                                            rules: [{ required: true, message: '', whitespace: true }],
                                        })(
                                            <Input style={{ maxWidth: '300px' }} />
                                        )}
                                    </Col>
                                </Row>
                            </FormItem>
                        </div>
                    ) : (null)}
            </div>
            <div className="general-box" style={{ marginTop: '15px', backgroundColor: '#e2e1e0' }}>
                <span className="ant-form-text">
                    <b>Birth Information</b>
                </span>
                <Divider />
                <FormItem
                    {...formItemLayout}
                    colon={false}
                    label={(
                        <span>
                            Date of Birth&nbsp;
                                </span>
                    )}
                >
                    <Row gutter={16}>
                        <Col span={16} >
                            {getFieldDecorator(`children[child_dob${k + 1}]`, {
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
                            City of Birth&nbsp;
                                </span>
                    )}
                >
                    <Row gutter={16}>
                        <Col span={16} >
                            {getFieldDecorator(`children[child_birth_city${k + 1}]`, {
                                rules: [{ required: true, message: '', whitespace: true }],
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
                            State or Province of Birth&nbsp;
                                </span>
                    )}
                >
                    <Row gutter={16}>
                        <Col span={16} >
                            {getFieldDecorator(`children[child_birth_state_or_province${k + 1}]`, {
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
                            Country of Birth&nbsp;
                                </span>
                    )}
                >
                    <Row gutter={16}>
                        <Col span={16} >
                            {getFieldDecorator(`children[child_birth_country${k + 1}]`, {
                                rules: [{ required: true, message: '', whitespace: true }],
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
                            Country of Citizenship&nbsp;
                                </span>
                    )}
                >
                    <Row gutter={16}>
                        <Col span={16} >
                            {getFieldDecorator(`children[child_country_citizenship${k + 1}]`, {
                                rules: [{ required: true, message: '', whitespace: true }],
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
                            Child's A# or enter None.&nbsp;
                                </span>
                    )}
                >
                    <Row gutter={16}>
                        <Col span={16} >
                            {getFieldDecorator(`children[child_registration_number${k + 1}]`, {
                                rules: [{ required: true, message: '', whitespace: true }],
                            })(
                                <div>
                                    <Tooltip title={`Alien Registration Number or Alien Number(A Number or A#) is a unique seven-, eight- or nine-digit number assigned to a noncitizen by the Department of Homeland Security. This is not the same as the receipt number used for tracking your case. Enter None if none. The A Number never includes letters but often has the letter 'A' in front of it (the 'A' is not part of the number).`}>
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
                            Child's US Social Security Number (if any)&nbsp;
                                </span>
                    )}
                >
                    <Row gutter={16}>
                        <Col span={16} >
                            {getFieldDecorator(`children[child_US_social_security_number${k + 1}]`, {
                                rules: [{ required: true, message: '', whitespace: true }],
                            })(
                                <div>
                                    <Tooltip title={`If no US Social Security Number, put down N/A`}>
                                        <Input style={{ maxWidth: '300px' }} />
                                    </Tooltip>
                                </div>
                            )}
                        </Col>
                    </Row>
                </FormItem>
            </div>
            <div className="general-box" style={{ marginTop: '15px', backgroundColor: '#e2e1e0' }}>
                <FormItem
                    colon={false}
                    label={<span>Relationship to Alien Beneficiary</span>}
                >
                    {getFieldDecorator(`children[child_relation_with_alien${k + 1}]`, {
                        rules: [{ required: true, message: '', whitespace: true }],
                    })(
                        <Row>
                            <Col span={24}>
                                <RadioGroup>
                                    <Radio value={'Son'}>Son</Radio>
                                    <Radio value={'Daughter'}>Daughter</Radio>
                                    <Radio value={'Step-Son'}>Step-Son</Radio>
                                    <Radio value={'Step-Daughter'}>Step-Daughter</Radio>
                                </RadioGroup>
                            </Col>
                        </Row>
                    )}
                </FormItem>
            </div>
            <div className="general-box" style={{ backgroundColor: '#e2e1e0' }}>
                <FormItem
                    {...formItemLayout}
                    colon={false}
                    label={<span>Will this child be joining you on this petition?</span>}
                >
                    {getFieldDecorator(`children[is_child_join_petition${k + 1}]`, {
                        rules: [{ required: true, message: '', whitespace: true }],
                    })(
                        <Row>
                            <Col span={8}>
                                <RadioGroup onChange={radioEvent.bind(this, `is_child_join_petition${k + 1}`)}>
                                    <Radio value={false}>No</Radio>
                                    <Radio value={true}>Yes</Radio>
                                </RadioGroup>
                            </Col>
                        </Row>
                    )}
                </FormItem>
                {(data[`is_child_join_petition${k + 1}`]) ?
                    (
                        <div className="general-box" style={{ marginTop: '15px', backgroundColor: '#e2e1e0' }}>
                            <span className="ant-form-text">
                                <b>Biological Father Name</b>
                            </span>
                            <Divider />
                            <FormItem
                                {...formItemLayout}
                                colon={false}
                                label={(
                                    <span>
                                        First Name&nbsp;
                                </span>
                                )}
                            >
                                <Row gutter={16}>
                                    <Col span={16} >
                                        {getFieldDecorator(`children[father_first_name${k + 1}]`, {
                                            rules: [{ required: true, message: '', whitespace: true }],
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
                                        Middle Name&nbsp;
                                 </span>
                                )}
                            >
                                <Row gutter={16}>
                                    <Col span={16} >
                                        {getFieldDecorator(`children[father_middle_name${k + 1}]`, {
                                            rules: [{ required: true, message: '', whitespace: true }],
                                        })(
                                            <div>
                                                <Tooltip title='Enter N/A if none'>
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
                                        Last Name&nbsp;
                                 </span>
                                )}
                            >
                                <Row gutter={16}>
                                    <Col span={16} >
                                        {getFieldDecorator(`children[father_last_name${k + 1}]`, {
                                            rules: [{ required: true, message: '', whitespace: true }],
                                        })(
                                            <Input style={{ maxWidth: '300px' }} />
                                        )}
                                    </Col>
                                </Row>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                colon={false}
                                label={<span>Is your biological father's birth name different than above?</span>}
                            >
                                {getFieldDecorator(`children[father_other_name${k + 1}]`, {
                                    rules: [{ required: true, message: '', whitespace: true }],
                                })(
                                    <Row>
                                        <Col span={8}>
                                            <RadioGroup onChange={radioEvent.bind(this, `father_other_name${k + 1}`)}>
                                                <Radio value={false}>No</Radio>
                                                <Radio value={true}>Yes</Radio>
                                            </RadioGroup>
                                        </Col>
                                    </Row>
                                )}
                            </FormItem>
                            {(data[`father_other_name${k + 1}`]) ?
                                (
                                    <div>
                                        <FormItem
                                            {...formItemLayout}
                                            colon={false}
                                            label={(
                                                <span>
                                                    First Name at Birth&nbsp;
                                            </span>
                                            )}
                                        >
                                            <Row gutter={16}>
                                                <Col span={16} >
                                                    {getFieldDecorator(`children[father_birth_first_name${k + 1}]`, {
                                                        rules: [{ required: true, message: '', whitespace: true }],
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
                                                    Middle Name at Birth&nbsp;
                                 </span>
                                            )}
                                        >
                                            <Row gutter={16}>
                                                <Col span={16} >
                                                    {getFieldDecorator(`children[father_birth_middle_name${k + 1}]`, {
                                                        rules: [{ required: true, message: '', whitespace: true }],
                                                    })(
                                                        <div>
                                                            <Tooltip title='Enter N/A if none'>
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
                                                    Last Name at Birth&nbsp;
                                 </span>
                                            )}
                                        >
                                            <Row gutter={16}>
                                                <Col span={16} >
                                                    {getFieldDecorator(`children[father_birth_last_name${k + 1}]`, {
                                                        rules: [{ required: true, message: '', whitespace: true }],
                                                    })(
                                                        <Input style={{ maxWidth: '300px' }} />
                                                    )}
                                                </Col>
                                            </Row>
                                        </FormItem>
                                    </div>

                                ) : (null)}
                         <div className="general-box" style={{ marginTop: '15px', backgroundColor: '#e2e1e0' }}>
                            <span className="ant-form-text">
                                <b>Biological Father  Birth Information</b>
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
                                <Row gutter={16}>
                                    <Col span={16} >
                                        {getFieldDecorator(`children[father_dob${k + 1}]`, {
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
                                        City or Town of Birth&nbsp;
                                        </span>
                                )}
                            >
                                <Row gutter={16}>
                                    <Col span={16} >
                                        {getFieldDecorator(`children[father_birth_city${k + 1}]`, {
                                            rules: [{ required: true, message: '', whitespace: true }],
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
                                        Country of Birth&nbsp;
                                        </span>
                                )}
                            >
                                <Row gutter={16}>
                                    <Col span={16} >
                                        {getFieldDecorator(`children[father_birth_country${k + 1}]`, {
                                            rules: [{ required: true, message: '', whitespace: true }],
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
                                        Current City or Town of Residence&nbsp;
                                        </span>
                                )}
                            >
                                <Row gutter={16}>
                                    <Col span={16} >
                                        {getFieldDecorator(`children[father_current_city_residence${k + 1}]`, {
                                            rules: [{ required: true, message: '', whitespace: true }],
                                        })(
                                            <div>
                                                <Tooltip title='if deceased, write N/A'>
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
                                        Current Country of Residence&nbsp;
                                    </span>
                                )}
                            >
                                <Row gutter={16}>
                                    <Col span={16} >
                                        {getFieldDecorator(`children[father_current_country_residence${k + 1}]`, {
                                            rules: [{ required: true, message: '', whitespace: true }],
                                        })(
                                            <div>
                                                <Tooltip title='if deceased, write N/A'>
                                                    <Input style={{ maxWidth: '300px' }} />
                                                </Tooltip>
                                            </div>
                                        )}
                                    </Col>
                                </Row>
                            </FormItem>
                        </div>
                        <div className="general-box" style={{ marginTop: '15px', backgroundColor: '#e2e1e0' }}>
                            <span className="ant-form-text">
                                <b>Immigration Information</b>
                            </span>
                            <FormItem
                                {...formItemLayout}
                                colon={false}
                                label={(
                                    <span>
                                        Passport Number Used at Last Arrival&nbsp;
                                </span>
                                )}
                            >
                                <Row gutter={16}>
                                    <Col span={16} >
                                        {getFieldDecorator(`children[child_passport_number${k + 1}]`, {
                                            rules: [{ required: true, message: '', whitespace: true }],
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
                                        Travel Document Number Used at Last Arrival&nbsp;
                                </span>
                                )}
                            >
                                <Row gutter={16}>
                                    <Col span={16} >
                                        {getFieldDecorator(`children[child_travel_document_number${k + 1}]`, {
                                            rules: [{ required: true, message: '', whitespace: true }],
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
                                        Expiration Date of this Passport or Travel Document&nbsp;
                                        </span>
                                )}
                            >
                                <Row gutter={16}>
                                    <Col span={16} >
                                        {getFieldDecorator(`children[child_expiration_date_passport${k + 1}]`, {
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
                                        Country that Issued this Passport or Travel Document&nbsp;
                                </span>
                                )}
                            >
                                <Row gutter={16}>
                                    <Col span={16} >
                                        {getFieldDecorator(`children[child_country_issue_passport${k + 1}]`, {
                                            rules: [{ required: true, message: '', whitespace: true }],
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
                                        Nonimmigrant Visa Number from this Passport (if any)&nbsp;
                                </span>
                                )}
                            >
                                <Row gutter={16}>
                                    <Col span={16} >
                                        {getFieldDecorator(`children[child_nonimmigrant_visa_number${k + 1}]`, {
                                            rules: [{ required: true, message: '', whitespace: true }],
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
                                        City or Town child last entered the United States&nbsp;
                                </span>
                                )}
                            >
                                <Row gutter={16}>
                                    <Col span={16} >
                                        {getFieldDecorator(`children[child_city_or_town_last_entered${k + 1}]`, {
                                            rules: [{ required: true, message: '', whitespace: true }],
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
                                        State child last entered the United States&nbsp;
                                </span>
                                )}
                            >
                                <Row gutter={16}>
                                    <Col span={16} >
                                        {getFieldDecorator(`children[child_state_last_entered${k + 1}]`, {
                                            rules: [{ required: true, message: '', whitespace: true }],
                                        })(
                                            <Tooltip title={`If you entered through Guam, just enter Guam.`}>
                                                <Input style={{ maxWidth: '300px' }} />
                                            </Tooltip>
                                        )}
                                    </Col>
                                </Row>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                colon={false}
                                label={(
                                    <span>
                                        Date of Last Arrival&nbsp;
                                        </span>
                                )}
                            >
                                <Row gutter={16}>
                                    <Col span={16} >
                                        {getFieldDecorator(`children[child_date_last_arrival${k + 1}]`, {
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
                                        Form I-94 Arrival-Departure Record Number&nbsp;
                                </span>
                                )}
                            >
                                <Row gutter={16}>
                                    <Col span={16} >
                                        {getFieldDecorator(`children[child_arrival_departure_record_number${k + 1}]`, {
                                            rules: [{ required: true, message: '', whitespace: true }],
                                        })(
                                            <Tooltip title={`Enter N/A if none. This number is 11 digits long. You can find this number at the top left on your Form I-94, Arrival Departure Record. This small form will normally be stapled to a page in your Passport when you enter the United States. Enter None if you did not enter the USA with a printed visa, such as with the Visa Waiver Program (WT/WB Visa).`}>
                                                <Input style={{ maxWidth: '300px' }} />
                                            </Tooltip>
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
                                        {getFieldDecorator(`children[child_expiration_date_stay${k + 1}]`, {
                                            rules: [{ required: true, message: '', whitespace: true }],
                                        })(
                                            <div>
                                                <Tooltip title='Enter N/A if none. Shown on Form I-94'>
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
                                        {getFieldDecorator(`children[child_status_on_formI_94${k + 1}]`, {
                                            rules: [{ required: true, message: '', whitespace: true }],
                                        })(
                                            <Tooltip title={`Enter N/A if none. For example, class of admission, or paroled, if paroled`}>
                                                <Input style={{ maxWidth: '300px' }} />
                                            </Tooltip>
                                        )}
                                    </Col>
                                </Row>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                colon={false}
                                label={(
                                    <span>
                                        Current Immigration Status&nbsp;
                                </span>
                                )}
                            >
                                <Row gutter={16}>
                                    <Col span={16} >
                                        {getFieldDecorator(`children[child_current_immigration_status${k + 1}]`, {
                                            rules: [{ required: true, message: '', whitespace: true }],
                                        })(
                                            <Tooltip title={`Enter N/A if none. Your current immigration status (if it has changed since your arrival)`}>
                                                <Input style={{ maxWidth: '300px' }} />
                                            </Tooltip>
                                        )}
                                    </Col>
                                </Row>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                colon={false}
                                label={(
                                    <span>
                                        Child's Family Name as it appears on the I-94&nbsp;
                                </span>
                                )}
                            >
                                <Row gutter={16}>
                                    <Col span={16} >
                                        {getFieldDecorator(`children[child_family_name${k + 1}]`, {
                                            rules: [{ required: true, message: '', whitespace: true }],
                                        })(
                                            <Tooltip title={`Exactly as it appears on the I-94`}>
                                                <Input style={{ maxWidth: '300px' }} />
                                            </Tooltip>
                                        )}
                                    </Col>
                                </Row>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                colon={false}
                                label={(
                                    <span>
                                       Child's Given Name as it appears on the I-94&nbsp;
                                </span>
                                )}
                            >
                                <Row gutter={16}>
                                    <Col span={16} >
                                        {getFieldDecorator(`children[child_given_name${k + 1}]`, {
                                            rules: [{ required: true, message: '', whitespace: true }],
                                        })(
                                            <Tooltip title={`Exactly as it appears on the I-94`}>
                                                <Input style={{ maxWidth: '300px' }} />
                                            </Tooltip>
                                        )}
                                    </Col>
                                </Row>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                colon={false}
                                label={(
                                    <span>
                                       Child's Middle Name as it appears on the I-94&nbsp;
                                </span>
                                )}
                            >
                                <Row gutter={16}>
                                    <Col span={16} >
                                        {getFieldDecorator(`children[child_given_middle_name${k + 1}]`, {
                                            rules: [{ required: true, message: '', whitespace: true }],
                                        })(
                                            <Tooltip title={`Exactly as it appears on the I-94`}>
                                                <Input style={{ maxWidth: '300px' }} />
                                            </Tooltip>
                                        )}
                                    </Col>
                                </Row>
                            </FormItem>
                        </div>
                            
                    </div>
                    )
                    : (data[`is_child_join_petition${k + 1}`] == false) ?
                        (
                            <FormItem
                                {...formItemLayout}
                                colon={false}
                                label={<span>Is this child traveling to the United States at a later date to join you?</span>}
                            >
                                {getFieldDecorator(`children[is_child_join_later${k + 1}]`, {
                                    rules: [{ required: true, message: '', whitespace: true }],
                                })(
                                    <Row>
                                        <Col span={8}>
                                            <RadioGroup>
                                                <Radio value={false}>No</Radio>
                                                <Radio value={true}>Yes</Radio>
                                            </RadioGroup>
                                        </Col>
                                    </Row>
                                )}
                            </FormItem>
                        )
                        : (null)}
            </div>

            <div className="general-box" style={{ marginTop: '15px', backgroundColor: '#e2e1e0' }}>
                <FormItem
                    colon={false}
                    label={<span>Add another child?</span>}
                >
                    {getFieldDecorator(`children[another_child${k + 1}]`, {
                        rules: [{ required: true, message: '', whitespace: true }],
                    })(
                        <Row>
                            <Col span={24}>
                                <RadioGroup onChange={(e) => e.target.value ? addEvent() : removeEvent(k)}>
                                    <Radio value={false}>No</Radio>
                                    <Radio value={true}>Yes</Radio>
                                </RadioGroup>
                            </Col>
                        </Row>
                    )}
                </FormItem>
            </div>


        </div>
    )
}