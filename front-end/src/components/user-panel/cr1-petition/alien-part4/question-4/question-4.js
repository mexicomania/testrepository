import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Row, Col, Button, Radio } from 'antd';
import './question-4.css';


const FormItem = Form.Item;
const InputText = Input.TextArea;
const RadioGroup = Radio.Group;


class QuestionPart4 extends Component {
    state = {
        is_alien_involved_in_transplantation:false,
        is_alien_civil_penalty:false,
        is_alien_ordered_removed_from_US1:false,
        is_alien_ordered_removed_from_US2:false,
        is_alien_ordered_removed_from_US3:false,
        is_alien_ordered_removed_from_US4:false,
        is_alien_unlawfully_present1:false,
        is_alien_unlawfully_present2:false,
        is_alien_withheld_custody:false,
        is_alien_voted_in_US:false

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
            <div id="alien-part4-question4">
                <h3>Alien Part 4.4 Questions</h3>

                <p>Qestions for Alien</p>
                <p>All questions are about the Alien (foreign citizen).</p>
                <p>Do not write your answers in all capital letters and never use any type of non-English characters.</p>
                <Form onSubmit={this.handleSubmit.bind(this)} className="alien-part4-question4-form">

                    <FormItem
                        colon={false}
                        label={
                        `Have you ever been directly involved in the coercive transplantation of human 
                        organs or bodily tissue?`}
                    >
                        {getFieldDecorator(`is_alien_involved_in_transplantation`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_involved_in_transplantation')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>

                    {(this.state.is_alien_involved_in_transplantation) ?
                        (
                               <FormItem
                                {...formItemLayout}
                                colon={false}
                                label="Explain why you answered 'Yes' to this question and provide details">
                                <Row gutter={16}>
                                    <Col span={16}>
                                        {getFieldDecorator(`alien_transplantation_detail`, {
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
                        `Are you subject to a civil penalty under INA 274C?`}
                    >
                        {getFieldDecorator(`is_alien_civil_penalty`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_civil_penalty')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>

                    {(this.state.is_alien_civil_penalty) ?
                        (
                            <FormItem
                            {...formItemLayout}
                            colon={false}
                            label="Explain why you answered 'Yes' to this question and provide details">
                            <Row gutter={16}>
                                <Col span={16}>
                                    {getFieldDecorator(`alien_civil_penalty_detail`, {
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
                        Have you been ordered removed from the U.S. during the last five years?`}
                    >
                        {getFieldDecorator(`is_alien_ordered_removed_from_US1`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_ordered_removed_from_US1')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.is_alien_ordered_removed_from_US1) ?
                        (
                            <FormItem
                            {...formItemLayout}
                            colon={false}
                            label="Explain why you answered 'Yes' to this question and provide details">
                            <Row gutter={16}>
                                <Col span={16}>
                                    {getFieldDecorator(`alien_ordered_removed_from_US_detail1`, {
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
                        Have you been ordered removed from the U.S. for a second time within 
                        the last 20 years?`}
                    >
                        {getFieldDecorator(`is_alien_ordered_removed_from_US2`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_ordered_removed_from_US2')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.is_alien_ordered_removed_from_US2) ?
                        (
                            <FormItem
                            {...formItemLayout}
                            colon={false}
                            label="Explain why you answered 'Yes' to this question and provide details">
                            <Row gutter={16}>
                                <Col span={16}>
                                    {getFieldDecorator(`alien_ordered_removed_from_US_detail2`, {
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
                        Have you ever been unlawfully present and ordered removed from 
                        the U.S. during the last ten years?`}
                    >
                        {getFieldDecorator(`is_alien_ordered_removed_from_US3`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_ordered_removed_from_US3')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.is_alien_ordered_removed_from_US3) ?
                        (
                            <FormItem
                            {...formItemLayout}
                            colon={false}
                            label="Explain why you answered 'Yes' to this question and provide details">
                            <Row gutter={16}>
                                <Col span={16}>
                                    {getFieldDecorator(`alien_ordered_removed_from_US_detail3`, {
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
                        Have you ever been convicted of an aggravated felony and been 
                        ordered removed from the U.S.?`}
                    >
                        {getFieldDecorator(`is_alien_ordered_removed_from_US4`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_ordered_removed_from_US4')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.is_alien_ordered_removed_from_US4) ?
                        (
                            <FormItem
                            {...formItemLayout}
                            colon={false}
                            label="Explain why you answered 'Yes' to this question and provide details">
                            <Row gutter={16}>
                                <Col span={16}>
                                    {getFieldDecorator(`alien_ordered_removed_from_US_detail4`, {
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
                        Have you ever been unlawfully present in the U.S. for more than 180 days 
                        (but no ore than one year) and have voluntarily departed the U.S. within the last 
                        three years?`}
                    >
                        {getFieldDecorator(`is_alien_unlawfully_present1`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_unlawfully_present1')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.is_alien_unlawfully_present1) ?
                        (
                            <FormItem
                            {...formItemLayout}
                            colon={false}
                            label="Explain why you answered 'Yes' to this question and provide details">
                            <Row gutter={16}>
                                <Col span={16}>
                                    {getFieldDecorator(`alien_unlawfully_present_detail1`, {
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
                        Have you ever been unlawfully present in the U.S. for more than one year in the 
                        aggregate at any time during the past ten years?`}
                    >
                        {getFieldDecorator(`is_alien_unlawfully_present2`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_unlawfully_present2')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.is_alien_unlawfully_present2) ?
                        (
                            <FormItem
                            {...formItemLayout}
                            colon={false}
                            label="Explain why you answered 'Yes' to this question and provide details">
                            <Row gutter={16}>
                                <Col span={16}>
                                    {getFieldDecorator(`alien_unlawfully_present_detail2`, {
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
                        Have you ever withheld custody of a U.S. citizen child outside the United States 
                        from a person granted legal custody by a U.S. court?`}
                    >
                        {getFieldDecorator(`is_alien_withheld_custody`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_withheld_custody')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.is_alien_withheld_custody) ?
                        (
                            <FormItem
                            {...formItemLayout}
                            colon={false}
                            label="Explain why you answered 'Yes' to this question and provide details">
                            <Row gutter={16}>
                                <Col span={16}>
                                    {getFieldDecorator(`alien_withheld_custody_detail`, {
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
                        Have you voted in the United States in violation of any law or regulation?`}
                    >
                        {getFieldDecorator(`is_alien_voted_in_US`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_voted_in_US')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.is_alien_voted_in_US) ?
                        (
                            <FormItem
                            {...formItemLayout}
                            colon={false}
                            label="Explain why you answered 'Yes' to this question and provide details">
                            <Row gutter={16}>
                                <Col span={16}>
                                    {getFieldDecorator(`alien_voted_in_US_detail`, {
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

export default Form.create()(QuestionPart4);
