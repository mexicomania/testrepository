import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Tooltip, Icon, Row, Col, Button, Radio, Select } from 'antd';
import './citizen-part2.1.css';
import { states } from '../../../../../services/countries';
import InputMask from 'react-input-mask';


const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const US_states = states();

class CitizenPart2Status extends Component {
    state = {
        confirmDirty: false,
        current_status: '',
        citizen_ship: '',
        obtained_certificate:false
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
    onChangeCheckBox = (e) => {
        console.log('chekedmark!', e.target.checked)
        this.setState({ disable: e.target.checked, fieldRequired: e.target.checked })
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
            <div id="citizen-part2-status">
                <h3>Citizen Part 2.1 Status</h3>

                <p>Sponsor's Status</p>
                <Form onSubmit={this.handleSubmit.bind(this)} className="citizen-part2-status-form">

                    <FormItem
                        colon={false}
                        label={(<span>What is your current status? <Tooltip title="Select U.S. Citizen if You were born in the USA or You are a Naturalized U.S. Citizen">
                            <Icon type="question-circle-o" />
                        </Tooltip></span>)}
                    >
                        {getFieldDecorator('current_status', {
                            rules: [{ required: false, message: 'Please Select!', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'current_status')}>
                                        <Radio value={'US_citizen'}>U.S.Citizen</Radio>
                                        <Radio value={"permanent_resident"}>Permanent Resident (green card holder)</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>

                    {(this.state.current_status == 'US_citizen') ?
                        (
                            <div>
                            <FormItem
                                colon={false}
                                label={(<span>How did you obtain your citizenship?</span>)}
                                >
                                {getFieldDecorator('citizen_ship', {
                                    rules: [{ required: false, message: 'Please Select!', whitespace: true }],
                                })(
                                    <Row>
                                        <Col span={16}>
                                            <RadioGroup onChange={this.onChangeName.bind(this, 'citizen_ship')}>
                                                <Radio value={'born_in_USA'}>Born in U.S.A</Radio>
                                                <Radio value={"naturalized"}>Naturalized</Radio>
                                                <Radio value={"from_parents"}>From Parents</Radio>
                                            </RadioGroup>
                                        </Col>
                                    </Row>
                                )}
                            </FormItem>
                                {(this.state.citizen_ship == 'naturalized' || this.state.citizen_ship == 'from_parents') ? (
                                    <div>
                                        <FormItem
                                    colon={false}
                                    label={(<span>Have you obtained a Certificate of Naturalization or a Certificate of Citizenship in your name?</span>)}
                                    >
                                    {getFieldDecorator('obtained_certificate', {
                                        rules: [{ required: false, message: 'Please Select!', whitespace: true }],
                                    })(
                                        <Row>
                                            <Col span={16}>
                                                <RadioGroup onChange={this.onChangeName.bind(this, 'obtained_certificate')}>
                                                    <Radio value={false}>No</Radio>
                                                    <Radio value={true}>Yes</Radio>
                                                </RadioGroup>
                                            </Col>
                                        </Row>
                                    )}
                                </FormItem>
                                {(this.state.obtained_certificate) ? 
                                (<CertificateInfo 
                                    getFieldDecorator={getFieldDecorator}
                                    formItemLayout={formItemLayout}/>
                                ) : (null)}
                                    </div>
                                ):(null)}
                            </div>
                        ) :
                        (this.state.current_status == 'permanent_resident') ?
                        (
                         <Permanent_Resident 
                            getFieldDecorator={getFieldDecorator} 
                            formItemLayout={formItemLayout}/>   
                        ) : (null)}

                    <Button type="primary" htmlType="submit">Save and Continue</Button>
                </Form>
            </div>


        );
    }
}

const Status = Form.create()(CitizenPart2Status);

export default Status;



const Permanent_Resident = ({getFieldDecorator,formItemLayout}) => {
    return (
        <div className='center-form-fields'>
            <FormItem
                style={{display: 'block'}}
                colon={false}
                label={(<span>Did you gain permanent status through marriage to a U.S citizen or lawful permanent resident?</span>)}
            >
                {getFieldDecorator('gain_citizen_ship', {
                    rules: [{ required: false, message: 'Please Select!', whitespace: true }],
                })(
                    <Row>
                        <Col span={16} style={{textAlign:'center'}}>
                            <RadioGroup>
                                <Radio value={false}>No</Radio>
                                <Radio value={true}>Yes</Radio>
                            </RadioGroup>
                        </Col>
                    </Row>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                colon={false}
                label={(
                    <span>
                        Class of Admission&nbsp;
        </span>
                )}
            >
                {getFieldDecorator('class_of_admission', {
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
                        Date of Admission&nbsp;
        </span>
                )}
            >
                {getFieldDecorator('date_of_admission', {
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
                        Place of Issue, City or Town&nbsp;
        </span>
                )}
            >
                {getFieldDecorator('place_of_issue', {
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
                        U.S. State (Select Does Not Apply if not USA)&nbsp;
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
        </div>
    )
}


const CertificateInfo = ({getFieldDecorator,formItemLayout}) => {
    return (
        <div className='center-form-fields'>
            <p>If you no longer have your Naturalization Certificate enter Lost in the first two fields and estimate the date.</p>
            <FormItem
                {...formItemLayout}
                colon={false}
                label={(
                    <span>
                        Naturalization Certificate Number&nbsp;
        </span>
                )}
            >
                {getFieldDecorator('certificate_number', {
                    rules: [{ required: false, message: '', whitespace: true }],
                })(
                    <Row gutter={16}>
                        <Col span={16} >
                            <Input style={{ maxWidth: '300px' }} />
                        </Col>
                        <Col span={8}>
                                    <FormItem>
                                        <Tooltip title={<img src='https://support2.filipinafianceevisa.com/images/Naturalization-Certificate-Number.jpg'></img>}>
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
                        Place of Issue, City or Town&nbsp;
        </span>
                )}
            >
                {getFieldDecorator('place_of_issue_certificate', {
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
                        Date of Issue&nbsp;
        </span>
                )}
            >
                {getFieldDecorator('date_of_issue_certificate', {
                    rules: [{ required: false, message: '', whitespace: true }],
                })(
                    <Row gutter={16}>
                        <Col span={16} >
                            <InputMask className="input-mask" mask="99/99/9999" placeholder="mm/dd/yyy" />
                        </Col>
                    </Row>
                )}
            </FormItem>
           
        </div>
    )
}