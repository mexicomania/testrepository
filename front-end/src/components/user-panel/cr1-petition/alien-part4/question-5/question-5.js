import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Row, Col, Button, Radio } from 'antd';
import './question-5.css';


const FormItem = Form.Item;
const InputText = Input.TextArea;
const RadioGroup = Radio.Group;


class QuestionPart5 extends Component {
    state = {
        is_alien_renounced_citizenship:false,
        is_alien_former_exchange_visitor:false,
        is_alien_enter_for_labor:false,
        is_alien_perform_medical_services:false,
        is_alien_health_care_worker:false,
        is_alien_eligible_for_citizenship:false,
        is_alien_ever_departed:false,
        is_alien_coming_for_polygamy:false,
        is_alien_made_frivolous_application:false,
        is_alien_assist_fraud_visa:false
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
        console.log('checked on maiden1', e.target.value);
        this.setState({
            [name]: e.target.value,
        });
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
            <div id="alien-part4-question5">
                <h3>Alien Part 4.5 Questions</h3>

                <p>Qestions for Alien</p>
                <p>All questions are about the Alien (foreign citizen).</p>
                <p>Do not write your answers in all capital letters and never use any type of non-English characters.</p>
                <Form onSubmit={this.handleSubmit.bind(this)} className="alien-part4-question5-form">

                    <FormItem
                        colon={false}
                        label={
                        `Have you ever renounced United States citizenship for the purposes 
                        of avoiding taxation?`}
                    >
                        {getFieldDecorator(`is_alien_renounced_citizenship`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_renounced_citizenship')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.is_alien_renounced_citizenship) ?
                        (
                               <FormItem
                                {...formItemLayout}
                                colon={false}
                                label="Explain why you answered 'Yes' to this question and provide details">
                                <Row gutter={16}>
                                    <Col span={16}>
                                        {getFieldDecorator(`alien_renounced_citizenship_detail`, {
                                            rules: [{ required: false, message: 'Please input !', whitespace: true }],
                                        })(
                                            <InputText col={3} style={{ maxWidth: '300px' }} />
                                        )}
                                    </Col>
                                </Row>
                            </FormItem>
                        ) : (null)}
                    
                    <FormItem
                        colon={false}
                        label={
                        `Are you a former exchange visitor (J) who has not yet fulfilled the 
                        two-year foreign residence requirement?`}
                    >
                        {getFieldDecorator(`is_alien_former_exchange_visitor`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_former_exchange_visitor')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.is_alien_former_exchange_visitor) ?
                        (
                            <FormItem
                            {...formItemLayout}
                            colon={false}
                            label="Explain why you answered 'Yes' to this question and provide details">
                            <Row gutter={16}>
                                <Col span={16}>
                                    {getFieldDecorator(`alien_former_exchange_visitor_detail`, {
                                        rules: [{ required: false, message: 'Please input skills!', whitespace: true }],
                                    })(
                                        <InputText col={3} style={{ maxWidth: '300px' }} />
                                    )}
                                </Col>
                            </Row>
                        </FormItem>  
                        ) : (null)}
                    
                    <FormItem
                        colon={false}
                        label={`
                        Do you seek to enter the United States for purpose of performing skilled or 
                        unskilled labor but have not yet been certified by the Secretary of Labor?`}
                    >
                        {getFieldDecorator(`is_alien_enter_for_labor`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_enter_for_labor')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.is_alien_enter_for_labor) ?
                        (
                            <FormItem
                            {...formItemLayout}
                            colon={false}
                            label="Explain why you answered 'Yes' to this question and provide details">
                            <Row gutter={16}>
                                <Col span={16}>
                                    {getFieldDecorator(`alien_enter_purpose_detail`, {
                                        rules: [{ required: false, message: 'Please input!', whitespace: true }],
                                    })(
                                        <InputText col={3} style={{ maxWidth: '300px' }} />
                                    )}
                                </Col>
                            </Row>
                        </FormItem>  
                        ) : (null)}
                    
                    <FormItem
                        colon={false}
                        label={`
                        Are you a graduate of a foreign medical school seeking to perform medical services 
                        in the United States but have not yet passed the National Board of Medical Examiners
                         examination or its equivalent?`}
                    >
                        {getFieldDecorator(`is_alien_perform_medical_services`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_perform_medical_services')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.is_alien_perform_medical_services) ?
                        (
                            <FormItem
                            {...formItemLayout}
                            colon={false}
                            label="Explain why you answered 'Yes' to this question and provide details">
                            <Row gutter={16}>
                                <Col span={16}>
                                    {getFieldDecorator(`alien_perform_medical_services_detail`, {
                                        rules: [{ required: false, message: 'Please input!', whitespace: true }],
                                    })(
                                        <InputText col={3} style={{ maxWidth: '300px' }} />
                                    )}
                                </Col>
                            </Row>
                        </FormItem>  
                        ) : (null)}
                    
                    <FormItem
                        colon={false}
                        label={`
                        Are you a health care worker seeking to perform such work in the United States 
                        but have not yet received certification from the Commission on Graduates of 
                        Foreign Nursing Schools or from an equivalent approved independent credentialing 
                        organization?`}
                    >
                        {getFieldDecorator(`is_alien_health_care_worker`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_health_care_worker')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.is_alien_health_care_worker) ?
                        (
                            <FormItem
                            {...formItemLayout}
                            colon={false}
                            label="Explain why you answered 'Yes' to this question and provide details">
                            <Row gutter={16}>
                                <Col span={16}>
                                    {getFieldDecorator(`alien_health_care_worker_detail`, {
                                        rules: [{ required: false, message: 'Please input!', whitespace: true }],
                                    })(
                                        <InputText col={3} style={{ maxWidth: '300px' }} />
                                    )}
                                </Col>
                            </Row>
                        </FormItem>
                        ) : (null)}
                    
                    <FormItem
                        colon={false}
                        label={`
                        Are you permanently ineligible for U.S. citizenship?`}
                    >
                        {getFieldDecorator(`is_alien_eligible_for_citizenship`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_eligible_for_citizenship')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.is_alien_eligible_for_citizenship) ?
                        (
                            <FormItem
                            {...formItemLayout}
                            colon={false}
                            label="Explain why you answered 'Yes' to this question and provide details">
                            <Row gutter={16}>
                                <Col span={16}>
                                    {getFieldDecorator(`alien_eligible_for_citizenship_detail`, {
                                        rules: [{ required: false, message: 'Please input detail!', whitespace: true }],
                                    })(
                                        <InputText col={3} style={{ maxWidth: '300px' }} />
                                    )}
                                </Col>
                            </Row>
                        </FormItem>  
                        ) : (null)}
                    
                    <FormItem
                        colon={false}
                        label={`
                        Have you ever departed the United States in order to evade military service
                         during a time of war?`}
                    >
                        {getFieldDecorator(`is_alien_ever_departed`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_ever_departed')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.is_alien_ever_departed) ?
                        (
                            <FormItem
                            {...formItemLayout}
                            colon={false}
                            label="Explain why you answered 'Yes' to this question and provide details">
                            <Row gutter={16}>
                                <Col span={16}>
                                    {getFieldDecorator(`alien_departed_detail`, {
                                        rules: [{ required: false, message: 'Please input!', whitespace: true }],
                                    })(
                                        <InputText col={3} style={{ maxWidth: '300px' }} />
                                    )}
                                </Col>
                            </Row>
                        </FormItem>  
                        ) : (null)}
                    
                    <FormItem
                        colon={false}
                        label={`
                        Are you coming to the U.S. to practice polygamy?`}
                    >
                        {getFieldDecorator(`is_alien_coming_for_polygamy`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_coming_for_polygamy')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.is_alien_coming_for_polygamy) ?
                        (
                            <FormItem
                            {...formItemLayout}
                            colon={false}
                            label="Explain why you answered 'Yes' to this question and provide details">
                            <Row gutter={16}>
                                <Col span={16}>
                                    {getFieldDecorator(`alien_polygamy_detail`, {
                                        rules: [{ required: false, message: 'Please input!', whitespace: true }],
                                    })(
                                        <InputText col={3} style={{ maxWidth: '300px' }} />
                                    )}
                                </Col>
                            </Row>
                        </FormItem>  
                        ) : (null)}
                    
                    <FormItem
                        colon={false}
                        label={`
                        Has the Secretary of Homeland Security of the United States ever determined 
                        that you knowingly made a frivolous application for asylum?`}
                    >
                        {getFieldDecorator(`is_alien_made_frivolous_application`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_made_frivolous_application')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.is_alien_made_frivolous_application) ?
                        (
                            <FormItem
                            {...formItemLayout}
                            colon={false}
                            label="Explain why you answered 'Yes' to this question and provide details">
                            <Row gutter={16}>
                                <Col span={16}>
                                    {getFieldDecorator(`alien_frivolous_application_detail`, {
                                        rules: [{ required: false, message: 'Please input!', whitespace: true }],
                                    })(
                                        <InputText col={3} style={{ maxWidth: '300px' }} />
                                    )}
                                </Col>
                            </Row>
                        </FormItem>  
                        ) : (null)}
                    
                    <FormItem
                        colon={false}
                        label={`  
                        Have you ever sought to obtain or assist others to obtain a visa, entry into the 
                        United States, or any other United States immigration benefit by fraud or 
                        willful misrepresentation or other unlawful means?`}
                    >
                        {getFieldDecorator(`is_alien_assist_fraud_visa`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_assist_fraud_visa')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.is_alien_assist_fraud_visa) ?
                        (
                            <FormItem
                            {...formItemLayout}
                            colon={false}
                            label="Explain why you answered 'Yes' to this question and provide details">
                            <Row gutter={16}>
                                <Col span={16}>
                                    {getFieldDecorator(`alien_fraud_visa_detail`, {
                                        rules: [{ required: false, message: 'Please input!', whitespace: true }],
                                    })(
                                        <InputText col={3} style={{ maxWidth: '300px' }} />
                                    )}
                                </Col>
                            </Row>
                        </FormItem>  
                        ) : (null)}
                   
                    <Button type="primary" htmlType="submit">SaveandContinue</Button>
                </Form>
            </div >


        );
    }
}

export default Form.create()(QuestionPart5);
