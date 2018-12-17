import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Row, Col, Button, Radio } from 'antd';
import './question-1.css';


const FormItem = Form.Item;
const InputText = Input.TextArea;
const RadioGroup = Radio.Group;


class QuestionPart1 extends Component {
    state = {
        is_alien_serve_in_paramilitary_unit:false,
        is_alien_have_disease:false,
        is_alien_mental_or_physical_disorder:false,
        is_alien_drug_addict:false,
        is_alien_vaccinations:false,
        is_alien_ever_arrested:false,
        is_alien_engage_in_prostitution:false,
        is_alien_involved_money_laundering:false,
        is_alien_human_trafficking:false,
        is_alien_aided:false
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
            <div id="alien-part4-question1">
                <h3>Alien Part 4.1 Questions</h3>

                <p>Qestions for Alien</p>
                <p>All questions are about the Alien (foreign citizen).</p>
                <p>Do not write your answers in all capital letters and never use any type of non-English characters.</p>
                <Form onSubmit={this.handleSubmit.bind(this)} className="alien-part4-question1-form">

                    <FormItem
                        colon={false}
                        label={(
                        <span>
                        Have you ever served in, been a member of, or been involved with a paramilitary unit, vigilante unit, rebel group, guerrilla group, or insurgent organization?
                        </span>)}
                    >
                        {getFieldDecorator(`is_alien_serve_in_paramilitary_unit`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_serve_in_paramilitary_unit')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>

                    {(this.state.is_alien_serve_in_paramilitary_unit) ?
                        (
                               <FormItem
                                {...formItemLayout}
                                colon={false}
                                label="Explain why you answered 'Yes' to this question and provide details">
                                <Row gutter={16}>
                                    <Col span={16}>
                                        {getFieldDecorator(`alien_served_detail`, {
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
                        Do you have a communicable disease of public health significance? 
                        (Communicable diseases of public significance include chancroid, gonorrhea, 
                            granuloma inguinale, infections leprosy, lymphogranuloma venereum, 
                            infections stage syphilis, active tuberculosis, and other diseases as 
                            determined by the Department of Health and Human Services.)`}
                    >
                        {getFieldDecorator(`is_alien_have_disease`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_have_disease')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>

                    {(this.state.is_alien_have_disease) ?
                        (
                            <FormItem
                            {...formItemLayout}
                            colon={false}
                            label="Explain why you answered 'Yes' to this question and provide details">
                            <Row gutter={16}>
                                <Col span={16}>
                                    {getFieldDecorator(`alien_disease_detail`, {
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
                        Do you have a mental or physical disorder that poses or is likely to pose a 
                        threat to the safety or welfare of yourself or others?`}
                    >
                        {getFieldDecorator(`is_alien_mental_or_physical_disorder`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_mental_or_physical_disorder')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.is_alien_mental_or_physical_disorder) ?
                        (
                            <FormItem
                            {...formItemLayout}
                            colon={false}
                            label="Explain why you answered 'Yes' to this question and provide details">
                            <Row gutter={16}>
                                <Col span={16}>
                                    {getFieldDecorator(`alien_disorder_detail`, {
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
                        Are you or have you ever been a drug abuser or addict?`}
                    >
                        {getFieldDecorator(`is_alien_drug_addict`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_drug_addict')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.is_alien_drug_addict) ?
                        (
                            <FormItem
                            {...formItemLayout}
                            colon={false}
                            label="Explain why you answered 'Yes' to this question and provide details">
                            <Row gutter={16}>
                                <Col span={16}>
                                    {getFieldDecorator(`alien_addicted_detail`, {
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
                        You will be given any necessary vaccinations (shots) at your medical exam 
                        prior to your embassy interview. If you have documentation to show you have 
                        had some or all of these vaccinations you will not need to repeat them. 
                        For the required shots that you have not already had, will you be objecting to 
                        taking these shots and seeking a waiver, possibly delaying your visa?`}
                    >
                        {getFieldDecorator(`is_alien_vaccinations`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_vaccinations')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.is_alien_vaccinations) ?
                        (
                            <FormItem
                            colon={false}
                            label={`Explain why you will not receive the required vaccinations. 
                            Note that you will be required to complete Form I-601, Application for 
                            Waiver of Grounds of Inadmissibility and pay an additional fee of $585 to 
                            the USCIS. This fee will not be refunded even if your waiver request is denied. 
                            Your request may or may not be granted and will usually delay your petition by at least a 
                            few months and possibly much longer.`}>
                            <Row gutter={16}>
                                <Col span={24} style={{textAlign:'center',marginTop:'20px'}}>
                                    {getFieldDecorator(`alien_vaccinations_detail`, {
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
                        Have you ever been arrested or convicted for any offense or crime, 
                        even though subject of a pardon, amnesty, or other similar action?`}
                    >
                        {getFieldDecorator(`is_alien_ever_arrested`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_ever_arrested')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.is_alien_ever_arrested) ?
                        (
                            <FormItem
                            {...formItemLayout}
                            colon={false}
                            label="Explain why you answered 'Yes' to this question and provide details">
                            <Row gutter={16}>
                                <Col span={16}>
                                    {getFieldDecorator(`alien_arrested_detail`, {
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
                        Are you coming to the United States to engage in prostitution or unlawful 
                        commercialized vice or have you been engaged in prostitution or procuring 
                        prostitutes within the past 10 years?`}
                    >
                        {getFieldDecorator(`is_alien_engage_in_prostitution`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_engage_in_prostitution')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.is_alien_engage_in_prostitution) ?
                        (
                            <FormItem
                            {...formItemLayout}
                            colon={false}
                            label="Explain why you answered 'Yes' to this question and provide details">
                            <Row gutter={16}>
                                <Col span={16}>
                                    {getFieldDecorator(`alien_prostitution_detail`, {
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
                        Have you ever been involved in, or do you seek to engage in, money laundering?`}
                    >
                        {getFieldDecorator(`is_alien_involved_money_laundering`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_involved_money_laundering')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.is_alien_involved_money_laundering) ?
                        (
                            <FormItem
                            {...formItemLayout}
                            colon={false}
                            label="Explain why you answered 'Yes' to this question and provide details">
                            <Row gutter={16}>
                                <Col span={16}>
                                    {getFieldDecorator(`alien_money_laundering_detail`, {
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
                        Have you ever committed or conspired to commit
                        a human trafficking offense in the United States or outside the United States?`}
                    >
                        {getFieldDecorator(`is_alien_human_trafficking`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_human_trafficking')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    {(this.state.is_alien_human_trafficking) ?
                        (
                            <FormItem
                            {...formItemLayout}
                            colon={false}
                            label="Explain why you answered 'Yes' to this question and provide details">
                            <Row gutter={16}>
                                <Col span={16}>
                                    {getFieldDecorator(`alien_human_trafficking_detail`, {
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
                        Have you ever knowingly aided, abetted, assisted, or colluded with an individual 
                        who has been identified by the President of the United States as a person who 
                        plays a significant role in a severe form of trafficking in persons?`}
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
                   
                    <Button type="primary" htmlType="submit">SaveandContinue</Button>
                </Form>
            </div >


        );
    }
}

export default Form.create()(QuestionPart1);
