import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Row, Col, Button, Radio } from 'antd';
import './question-2.css';


const FormItem = Form.Item;
const InputText = Input.TextArea;
const RadioGroup = Radio.Group;


class QuestionPart2 extends Component {
    state = {
        is_alien_aided:false,
        is_alien_relation_to_severe_trafficking1:false,
        is_alien_relation_to_severe_trafficking2:false,
        is_alien_relation_to_severe_trafficking3:false,
        is_alien_engage_illegal_activity:false,
        is_alien_engaged_in_terrorist_activities:false,
        is_alien_financial_assistance_to_terrorists:false,
        is_alien_member_terrorist:false,
        is_alien_participated_in_genocide:false,
        is_alien_participated_in_torture:false,
        is_alien_custody_issue:false
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
            <div id="alien-part4-question2">
                <h3>Alien Part 4.2 Questions</h3>

                <p>Qestions for Alien</p>
                <p>All questions are about the Alien (foreign citizen).</p>
                <p>Do not write your answers in all capital letters and never use any type of non-English characters.</p>
                <Form onSubmit={this.handleSubmit.bind(this)} className="alien-part4-question2-form">

                    <FormItem
                        colon={false}
                        label={
                        `Have you ever knowingly aided, abetted, assisted or colluded with an 
                        individual who has committed, or conspired to commit a severe human trafficking 
                        offense in the United States or outside the United States?`}
                    >
                        {getFieldDecorator(`is_alien_aided`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_aided')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>

                    {(this.state.is_alien_aided) ?
                        (
                               <FormItem
                                {...formItemLayout}
                                colon={false}
                                label="Explain why you answered 'Yes' to this question and provide details">
                                <Row gutter={16}>
                                    <Col span={16}>
                                        {getFieldDecorator(`alien_aided_detail`, {
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
                        label={
                            `Are you the spouse, son, or daughter of an individual who has committed or 
                            conspired to commit a human trafficking offense in the United States or 
                            outside the United States and have you within the last five years, knowingly 
                            benefited from trafficking activities?`}
                    >
                        {getFieldDecorator(`is_alien_relation_to_severe_trafficking1`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_relation_to_severe_trafficking1')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>

                    {(this.state.is_alien_relation_to_severe_trafficking1) ?
                        (
                            <FormItem
                            {...formItemLayout}
                            colon={false}
                            label="Explain why you answered 'Yes' to this question and provide details">
                            <Row gutter={16}>
                                <Col span={16}>
                                    {getFieldDecorator(`alien_trafficking1_detail`, {
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
                        Are you the spouse, son or daughter of an individual who has been identified by 
                        the President of the United States as a person who plays a significant role in 
                        a severe form of trafficking in persons and have you, within the last five yars, 
                        knowingly benefitted from the trafficking activities?`}
                    >
                        {getFieldDecorator(`is_alien_relation_to_severe_trafficking2`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_relation_to_severe_trafficking2')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.is_alien_relation_to_severe_trafficking2) ?
                        (
                            <FormItem
                            {...formItemLayout}
                            colon={false}
                            label="Explain why you answered 'Yes' to this question and provide details">
                            <Row gutter={16}>
                                <Col span={16}>
                                    {getFieldDecorator(`alien_trafficking2_detail`, {
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
                        Are you the spouse, son or daughter of an individual who has violated any 
                        controlled substance trafficking law, and have knowingly benefited from the 
                        trafficking activities in the past five years?`}
                    >
                        {getFieldDecorator(`is_alien_relation_to_severe_trafficking3`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_relation_to_severe_trafficking3')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.is_alien_relation_to_severe_trafficking3) ?
                        (
                            <FormItem
                            {...formItemLayout}
                            colon={false}
                            label="Explain why you answered 'Yes' to this question and provide details">
                            <Row gutter={16}>
                                <Col span={16}>
                                    {getFieldDecorator(`alien_trafficking3_detail`, {
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
                        Do you seek to engage in espionage, sabotage, export control violations, or any
                        other illegal activity while in the United States?`}
                    >
                        {getFieldDecorator(`is_alien_engage_illegal_activity`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_engage_illegal_activity')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.is_alien_engage_illegal_activity) ?
                        (
                            <FormItem
                            {...formItemLayout}
                            colon={false}
                            label="Explain why you answered 'Yes' to this question and provide details">
                            <Row gutter={16}>
                                <Col span={16}>
                                    {getFieldDecorator(`alien_engage_illegal_activity_detail`, {
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
                        Do you seek to engage in terrorist activities while in the United States or have
                        you ever engaged in terrorist activities?`}
                    >
                        {getFieldDecorator(`is_alien_engaged_in_terrorist_activities`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_engaged_in_terrorist_activities')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.is_alien_engaged_in_terrorist_activities) ?
                        (
                            <FormItem
                            {...formItemLayout}
                            colon={false}
                            label="Explain why you answered 'Yes' to this question and provide details">
                            <Row gutter={16}>
                                <Col span={16}>
                                    {getFieldDecorator(`alien_terrorist_activities_detail`, {
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
                        Have you ever or do you intend to provide financial assistance or other support to
                        terrorists or terrorist organizations?`}
                    >
                        {getFieldDecorator(`is_alien_financial_assistance_to_terrorists`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_financial_assistance_to_terrorists')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.is_alien_financial_assistance_to_terrorists) ?
                        (
                            <FormItem
                            {...formItemLayout}
                            colon={false}
                            label="Explain why you answered 'Yes' to this question and provide details">
                            <Row gutter={16}>
                                <Col span={16}>
                                    {getFieldDecorator(`alien_financial_assistance_to_terrorists_detail`, {
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
                        Are you a member or representative of a terrorist organization?`}
                    >
                        {getFieldDecorator(`is_alien_member_terrorist`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_member_terrorist')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.is_alien_member_terrorist) ?
                        (
                            <FormItem
                            {...formItemLayout}
                            colon={false}
                            label="Explain why you answered 'Yes' to this question and provide details">
                            <Row gutter={16}>
                                <Col span={16}>
                                    {getFieldDecorator(`alien_member_terrorist_detail`, {
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
                        Have you ever ordered, incited, committed, assisted, or otherwise participated in genocide?`}
                    >
                        {getFieldDecorator(`is_alien_participated_in_genocide`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_participated_in_genocide')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.is_alien_participated_in_genocide) ?
                        (
                            <FormItem
                            {...formItemLayout}
                            colon={false}
                            label="Explain why you answered 'Yes' to this question and provide details">
                            <Row gutter={16}>
                                <Col span={16}>
                                    {getFieldDecorator(`alien_genocide_detail`, {
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
                        Have you ever committed, ordered, incited, assisted, or otherwise participated in torture?`}
                    >
                        {getFieldDecorator(`is_alien_participated_in_torture`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_participated_in_torture')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.is_alien_participated_in_torture) ?
                        (
                            <FormItem
                            {...formItemLayout}
                            colon={false}
                            label="Explain why you answered 'Yes' to this question and provide details">
                            <Row gutter={16}>
                                <Col span={16}>
                                    {getFieldDecorator(`alien_torture_detail`, {
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
                        Have you ever intentionally assisted another person in withholding custody of a 
                        U.S. citizen child outside the United States from a person granted legal custody 
                        by a U.S. court?`}
                    >
                        {getFieldDecorator(`is_alien_custody_issue`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_custody_issue')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.is_alien_custody_issue) ?
                        (
                            <FormItem
                            {...formItemLayout}
                            colon={false}
                            label="Explain why you answered 'Yes' to this question and provide details">
                            <Row gutter={16}>
                                <Col span={16}>
                                    {getFieldDecorator(`alien_custody_issue_detail`, {
                                        rules: [{ required: false, message: 'Please input skills!', whitespace: true }],
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

export default Form.create()(QuestionPart2);
