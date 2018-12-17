import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Row, Col, Button, Radio, Tooltip,Icon } from 'antd';
import './immigration.css';
import InputMask from 'react-input-mask';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class Immigration extends Component {
    state = {
        is_alien_under_immigration_proceeding: false,
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
            <div id="alien-part3-immigration">
                <h3>Alien Part 3.6 Immigration</h3>

                <p>Immigration  Proceedings</p>
                <Form onSubmit={this.handleSubmit.bind(this)} className="alien-part3-immigration-form">

                    <FormItem
                        colon={false}
                        label={(<span>Has your alien beneficiary been under immigration proceedings? (in trouble with the immigration authorities)</span>)}
                    >
                        {getFieldDecorator(`is_alien_under_immigration_proceeding`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{ textAlign: 'center' }}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_under_immigration_proceeding')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>

                    {(this.state.is_alien_under_immigration_proceeding) ?
                        (
                            <div className="field-items">
                                <FormItem
                                    {...formItemLayout}
                                    colon={false}
                                    label="Where?">
                                    <Row gutter={16}>
                                        <Col span={16}>
                                            {getFieldDecorator(`alien_proceeding_place`, {
                                                rules: [{ required: false, message: 'Please input skills!', whitespace: true }],
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
                                            When&nbsp;
                                        </span>
                                    )}
                                >
                                    {getFieldDecorator(`alien_proceeding_date`, {
                                        rules: [{ required: true, message: 'Please input date!', whitespace: true }],
                                    })(
                                        <Row gutter={16}>
                                            <Col span={16}>
                                                <InputMask className="input-mask" mask="99/99/9999" placeholder="mm/dd/yyy" />
                                            </Col>
                                            <Col span={8}>
                                            <Tooltip title={`Estimate if you don't know the exact date.`}>
                                                <Icon type={'question-circle-o'}/>
                                            </Tooltip>
                                            </Col>
                                        </Row>
                                    )}
                                </FormItem>
                                <FormItem
                                    colon={false}
                                    label={(<span>What type of proceeding was it?</span>)}
                                >
                                    {getFieldDecorator(`alien_proceeding_type`, {
                                        rules: [{ required: false, message: '', whitespace: true }],
                                    })(
                                        <Row>
                                            <Col span={16} style={{ textAlign: 'center' }}>
                                                <RadioGroup>
                                                    <Radio value={'Removal'}>Removal</Radio>
                                                    <Radio value={'Exclusion/Deportation '}>Exclusion/Deportation</Radio>
                                                    <Radio value={'Rescission'}>Rescission</Radio>
                                                    <Radio value={'Judicial Proceedings'}>Judicial Proceedings</Radio>
                                                </RadioGroup>
                                            </Col>
                                        </Row>
                                    )}
                                </FormItem>   
                                <p>Attach to your petition a copy of the official documentation relating to this proceeding.</p>     
                            </div>
                        ) : (null)}

                    <Button type="primary" htmlType="submit">SaveandContinue</Button>
                </Form>
            </div >


        );
    }
}

export default Form.create()(Immigration);


