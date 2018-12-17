import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Tooltip, Icon, Row, Col, Button, Select, Radio } from 'antd';
import './marital-status.css';

import { countriesName, states } from '../../../../../services/countries';
import InputMask from 'react-input-mask';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const countries = countriesName();
const US_states = states();

class MaritalStatus extends Component {
    state = {
        confirmDirty: false,
        unconsummated_proxy_marriage: false,
        child: false,
        married_before: false,
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
        console.log("form",form)
        const keys = form.getFieldValue('keys');
        console.log("keys",keys)
        const nextKeys = keys.concat(keys.length);
        console.log("next keys",nextKeys)
        form.setFieldsValue({
            keys: nextKeys,
        });
    }


    removeChild = (k) => {
        const { form } = this.props;
        const keys = form.getFieldValue('childKeys');
        if (keys.length === 1) {
            return;
        }
        form.setFieldsValue({
            childKeys: keys.filter(key => key !== k),
        });
    }

    addChild = () => {
        const { form } = this.props;
        const keys = form.getFieldValue('childKeys');
        const nextKeys = keys.concat(keys.length);
        form.setFieldsValue({
            childKeys: nextKeys,
        });
    }

    componentDidMount(){
        this.addSpouse();
        this.addChild();
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

        getFieldDecorator('childKeys', { initialValue: [] });
        const childKeys = getFieldValue('childKeys');

        return (
            <div id="citizen-part-marital-status">
                <h3>Citizen Part 1.4 Marital Status</h3>
                <Form onSubmit={this.handleSubmit.bind(this)} className="citizen-part-marital-status-form">
                    <span className="ant-form-text" style={{ marginBottom: '10px' }}>
                        <b>Sponsor's Marital Status</b>
                    </span>
                    <FormItem
                        colon={false}
                        label="Is your current marriage an unconsummated proxy marriage?"
                    >
                        {getFieldDecorator('unconsummated_proxy_marriage', {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{ textAlign: 'center' }}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'unconsummated_proxy_marriage')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>

                    {(this.state.unconsummated_proxy_marriage) ?
                        (
                            <span className="ant-form-text" style={{ marginBottom: '10px' }}>
                                <b>The USCIS will not accept an unconsummated proxy marriage. You might be able to file a K1 Fiancee visa instead. Give us a call to discuss this. If you decide to file your petition despite this warning you will not be eligible for a refund.</b>
                            </span>
                        )
                        : (null)
                    }
                    <FormItem
                        colon={false}
                        label="Were you ever married before your current marriage?"
                    >
                        {getFieldDecorator('married_before', {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{ textAlign: 'center' }}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'married_before')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>

                    {(this.state.married_before) ?
                        (
                            <div>
                                <span className="ant-form-text" style={{ marginBottom: '10px' }}>
                                    <b>Enter all Prior Spouses, no matter how many or how far back. You must provide a divorce, annulment or death certificate for all prior spouses with no exceptions. Space is limited to match USCIS forms. Abbreviate as necessary.</b>
                                </span>
                                {keys.map((val,index) => 
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

                    <FormItem
                        colon={false}
                        label="Do you have a child under 18 years of age? (Please list from oldest to youngest)"
                    >
                        {getFieldDecorator('child', {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{ textAlign: 'center' }}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'child')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>

                    {(this.state.child) ?
                        (
                            <div>
                                {childKeys.map((val,index) => 
                                    <ChildFields 
                                        key={index} 
                                        k={index} 
                                        getFieldDecorator={getFieldDecorator} 
                                        formItemLayout={formItemLayout} 
                                        addEvent={this.addChild}
                                        removeEvent={this.removeChild}
                                        />    
                                    )}
                            </div>
                        )
                        : ( null )
                    }
                    <Button type="primary" htmlType="submit">SaveandContinue</Button>
                </Form>
            </div>
        );
    }
}

const CitizenSix = Form.create()(MaritalStatus);

export default CitizenSix;




const SpouseFields = ({ k,getFieldDecorator, formItemLayout,addEvent,removeEvent }) => {
    return (
        <div>
            <span className="ant-form-text" style={{ marginBottom: '10px' }}>
                <b>Prior Spouse #{k+1}</b>
            </span>
            <FormItem
                {...formItemLayout}
                colon={false}
                label={(
                    <span>
                        Maidens's Last Name&nbsp;
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
                        Date of Birth&nbsp;
                        </span>
                )}
            >
                {getFieldDecorator(`spouses[dob${k + 1}]`, {
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

            <FormItem
                {...formItemLayout}
                colon={false}
                label={(
                    <span>
                        City &amp; State of Marriage&nbsp;
                    </span>
                )}
            >
                {getFieldDecorator(`spouses[city_or_state_of_marriage${k + 1}]`, {
                    rules: [{ required: false, message: '', whitespace: true }],
                })(
                    <Row gutter={16}>
                        <Col span={16}>
                            <Input style={{ maxWidth: '300px' }} />
                        </Col>
                        <Col span={8}>
                            <FormItem>
                                <Tooltip placement="right" title="City and Country if not USA">
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
                        <Col span={8}>
                            <FormItem>
                                <Tooltip placement="right" title="Must match divorce/annulment/death document">
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
                        City &amp; State where marriage ended&nbsp;
                        </span>
                )}
            >
                {getFieldDecorator(`spouses[city_or_state_of_marriage_ended${k + 1}]`, {
                    rules: [{ required: false, message: '', whitespace: true }],
                })(
                    <Row gutter={16}>
                        <Col span={16}>
                            <Input style={{ maxWidth: '300px' }} />
                        </Col>
                        <Col span={8}>
                            <FormItem>
                                <Tooltip placement="right" title="City and Country if not USA">
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
                label="Add second prior spouse?"
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



const ChildFields = ({ k,getFieldDecorator, formItemLayout,addEvent,removeEvent }) => {
    return (
        <div>
            <FormItem
                {...formItemLayout}
                colon={false}
                label={(
                    <span>
                        Date of Birth&nbsp;
                        </span>
                )}
            >
                {getFieldDecorator(`childs[dob${k + 1}]`, {
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
                colon={false}
                label="Do you have a child under 18 years of age?"
            >
                {getFieldDecorator('child', {
                    rules: [{ required: false, message: '', whitespace: true }],
                })(
                    <Row>
                        <Col span={16} style={{ textAlign: 'center' }}>
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