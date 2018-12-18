import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Row, Col, Button, Radio } from 'antd';
import './question-3.css';


const FormItem = Form.Item;
const InputText = Input.TextArea;
const RadioGroup = Radio.Group;


class QuestionPart3 extends Component {
    state = {
        is_alien_engaged_recruitment_of_child_soldiers:false,
        is_alien_participated_in_violence:false,
        is_alien_carried_out_for_violations:false,
        is_alien_member_of_party:false,
        is_alien_supported_groups:false,
        is_alien_ever_abuse1:false,
        is_alien_ever_abuse2:false,
        is_alien_ever_disclosed_confidential1:false,
        is_alien_ever_disclosed_confidential2:false,
        is_alien_involved_population_controls:false,
        is_alien_attended_public_elementary_school:false
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
            <div id="alien-part4-question3">
                <h3>Alien Part 4.3 Questions</h3>

                <p>Qestions for Alien</p>
                <p>All questions are about the Alien (foreign citizen).</p>
                <p>Do not write your answers in all capital letters and never use any type of non-English characters.</p>
                <Form onSubmit={this.handleSubmit.bind(this)} className="alien-part4-question3-form">

                    <FormItem
                        colon={false}
                        label={
                        `Have you committed, ordered, incited, assisted, or otherwise participated in 
                        extrajudicial killings, political killings, or other acts of violence?`}
                    >
                        {getFieldDecorator(`is_alien_participated_in_violence`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_participated_in_violence')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>

                    {(this.state.is_alien_participated_in_violence) ?
                        (
                               <FormItem
                                {...formItemLayout}
                                colon={false}
                                label="Explain why you answered 'Yes' to this question and provide details">
                                <Row gutter={16}>
                                    <Col span={16}>
                                        {getFieldDecorator(`alien_violence_detail`, {
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
                        `Have you ever engaged in the recruitment or the use of child soldiers?`}
                    >
                        {getFieldDecorator(`is_alien_engaged_recruitment_of_child_soldiers`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_engaged_recruitment_of_child_soldiers')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>

                    {(this.state.is_alien_engaged_recruitment_of_child_soldiers) ?
                        (
                            <FormItem
                            {...formItemLayout}
                            colon={false}
                            label="Explain why you answered 'Yes' to this question and provide details">
                            <Row gutter={16}>
                                <Col span={16}>
                                    {getFieldDecorator(`alien_recruitment_detail`, {
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
                        Have you, while serving as a government official, been responsible for or directly 
                        carried out, at any time, particularly severe violations of religious freedom?`}
                    >
                        {getFieldDecorator(`is_alien_carried_out_for_violations`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_carried_out_for_violations')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.is_alien_carried_out_for_violations) ?
                        (
                            <FormItem
                            {...formItemLayout}
                            colon={false}
                            label="Explain why you answered 'Yes' to this question and provide details">
                            <Row gutter={16}>
                                <Col span={16}>
                                    {getFieldDecorator(`alien_carried_out_detail`, {
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
                        Are you a member of or affiliated with the Communist or other 
                        totalitarian party?`}
                    >
                        {getFieldDecorator(`is_alien_member_of_party`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_member_of_party')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.is_alien_member_of_party) ?
                        (
                            <FormItem
                            {...formItemLayout}
                            colon={false}
                            label="Explain why you answered 'Yes' to this question and provide details">
                            <Row gutter={16}>
                                <Col span={16}>
                                    {getFieldDecorator(`alien_member_party_detail`, {
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
                        Have you ever directly or indirectly assisted or supported any of the groups in 
                        Colombia known as the Revolutionary Armed Forces of Colombia (FARC), National 
                        Liberation Army (ELN), or United Self-Defense Forces of Colombia (AUC)?`}
                    >
                        {getFieldDecorator(`is_alien_supported_groups`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_supported_groups')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.is_alien_supported_groups) ?
                        (
                            <FormItem
                            {...formItemLayout}
                            colon={false}
                            label="Explain why you answered 'Yes' to this question and provide details">
                            <Row gutter={16}>
                                <Col span={16}>
                                    {getFieldDecorator(`alien_supported_groups_detail`, {
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
                        Have you ever through abuse of governmental or political position converted for 
                        personal gain, confiscated or expropriated property in a foreign nation to which
                        a United States national had claim of ownership?`}
                    >
                        {getFieldDecorator(`is_alien_ever_abuse`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_ever_abuse1')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.is_alien_ever_abuse1) ?
                        (
                            <FormItem
                            {...formItemLayout}
                            colon={false}
                            label="Explain why you answered 'Yes' to this question and provide details">
                            <Row gutter={16}>
                                <Col span={16}>
                                    {getFieldDecorator(`alien_abuse_detail1`, {
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
                        Are you the spouse, minor child, or agent of an individual who has through abuse 
                        of governmental or political position converted for personal gain, confiscated, 
                        or expropriated property in a foreign nation to which a United States national 
                        had claim of ownership?`}
                    >
                        {getFieldDecorator(`is_alien_ever_abuse2`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_ever_abuse2')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.is_alien_ever_abuse2) ?
                        (
                            <FormItem
                            {...formItemLayout}
                            colon={false}
                            label="Explain why you answered 'Yes' to this question and provide details">
                            <Row gutter={16}>
                                <Col span={16}>
                                    {getFieldDecorator(`alien_abuse_detail2`, {
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
                        Have you ever disclosed or trafficked in confidential U.S. business information 
                        obtained in connection with U.S. participation in the Chemical Weapons Convention?`}
                    >
                        {getFieldDecorator(`is_alien_ever_disclosed_confidential1`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_ever_disclosed_confidential1')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.is_alien_ever_disclosed_confidential1) ?
                        (
                            <FormItem
                            {...formItemLayout}
                            colon={false}
                            label="Explain why you answered 'Yes' to this question and provide details">
                            <Row gutter={16}>
                                <Col span={16}>
                                    {getFieldDecorator(`alien_disclosed_confidential_detail1`, {
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
                        Are you the spouse, minor child, or agent of an individual who has disclosed or 
                        trafficked in confidential U.S. business information obtained in connection with 
                        U.S. participation in the Chemical Weapons Convention?`}
                    >
                        {getFieldDecorator(`is_alien_ever_disclosed_confidential2`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_ever_disclosed_confidential2')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.is_alien_ever_disclosed_confidential2) ?
                        (
                            <FormItem
                            {...formItemLayout}
                            colon={false}
                            label="Explain why you answered 'Yes' to this question and provide details">
                            <Row gutter={16}>
                                <Col span={16}>
                                    {getFieldDecorator(`alien_disclosed_confidential_detail2`, {
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
                        Have you ever been directly involved in the establishment or enforcement of 
                        population controls forcing a woman to undergo an abortion against her free 
                        choice or a man or a woman to undergo sterilization against his or her 
                        free will?`}
                    >
                        {getFieldDecorator(`is_alien_involved_population_controls`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_involved_population_controls')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.is_alien_involved_population_controls) ?
                        (
                            <FormItem
                            {...formItemLayout}
                            colon={false}
                            label="Explain why you answered 'Yes' to this question and provide details">
                            <Row gutter={16}>
                                <Col span={16}>
                                    {getFieldDecorator(`alien_population_controls_detail`, {
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
                        Have you attended a public elementary school or a public secondary school on 
                        student (F) status after November 30, 1996 without reimbursing the school?`}
                    >
                        {getFieldDecorator(`is_alien_attended_public_elementary_school`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_attended_public_elementary_school')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.is_alien_attended_public_elementary_school) ?
                        (
                            <FormItem
                            {...formItemLayout}
                            colon={false}
                            label="Explain why you answered 'Yes' to this question and provide details">
                            <Row gutter={16}>
                                <Col span={16}>
                                    {getFieldDecorator(`alien_elementary_school_detail`, {
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

export default Form.create()(QuestionPart3);
