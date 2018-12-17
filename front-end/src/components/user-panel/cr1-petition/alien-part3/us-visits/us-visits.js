import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Row, Col, Button, Radio, Select, Tooltip, Icon } from 'antd';
import './us-visits.css';
import InputMask from 'react-input-mask';


const FormItem = Form.Item;
const InputText = Input.TextArea;
const RadioGroup = Radio.Group;


class USVisits extends Component {
    state = {
        is_alien_refused_admission: false,
        is_alien_visited_US: false,
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
            <div id="alien-part3-us-visits">
                <h3>Alien Part 3.8 U.S. Visits</h3>

                <p>U.S. Visits</p>
                <p>All questions are about the Alien (foreign citizen).</p>
                <Form onSubmit={this.handleSubmit.bind(this)} className="alien-part3-us-visits-form">

                    <FormItem
                        colon={false}
                        label={(<span>Has the alien ever been refused admission to the United States at a port-of-entry?</span>)}
                    >
                        {getFieldDecorator(`is_alien_refused_admission`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{ textAlign: 'center' }}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_refused_admission')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>

                    {(this.state.is_alien_refused_admission) ?
                        (
                            <div className="field-items">
                                <FormItem
                                    {...formItemLayout}
                                    colon={false}
                                    label="Explain all denied admissions to the United States">
                                    <Row gutter={16}>
                                        <Col span={16}>
                                            {getFieldDecorator(`alien_denied_detail`, {
                                                rules: [{ required: false, message: 'Please input detail!', whitespace: true }],
                                            })(
                                                <InputText col={3} style={{ maxWidth: '300px' }} />
                                            )}
                                        </Col>
                                    </Row>
                                </FormItem>

                            </div>
                        ) : (null)}

                    <FormItem
                        colon={false}
                        label={(<span>Has the alien ever visited or lived in the United States?</span>)}
                    >
                        {getFieldDecorator(`is_alien_visited_US`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{ textAlign: 'center' }}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_visited_US')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>

                    {(this.state.is_alien_visited_US) ?
                        (
                            <div className="field-items">
                                <p>List your last 3 visits to the United States.</p>
                                {keys.map((val, index) =>
                                <OrganizationFields
                                    key={index}
                                    k={index}
                                    data={this.state}
                                    getFieldDecorator={getFieldDecorator}
                                    formItemLayout={formItemLayout} />
                                )}
                            </div>
                        ) : (null)}

                    <Button type="primary" htmlType="submit">SaveandContinue</Button>
                </Form>
            </div >


        );
    }
}

export default Form.create()(USVisits);


const OrganizationFields = ({ k,data, getFieldDecorator, formItemLayout,addEvent,removeEvent }) => {
    return (
        <div>
            <p>Visit #{k+1}</p>
            <FormItem
                {...formItemLayout}
                colon={false}
                label="Primary city and state where you stayed">
                <Row gutter={16}>
                    <Col span={16}>
                        {getFieldDecorator(`dynamic[alien_city_or_state_stayed${k + 1}]`, {
                            rules: [{ required: false, message: 'Please input name!', whitespace: true }],
                        })(
                            <Input style={{ maxWidth: '300px' }} />
                        )}
                    </Col>
                </Row>
            </FormItem>
            <FormItem
                {...formItemLayout}
                colon={false}
                label="Type of visa you used to enter the United States">
                <Row gutter={16}>
                    <Col span={16}>
                        {getFieldDecorator(`dynamic[alien_visa_type${k + 1}]`, {
                            rules: [{ required: false, message: 'Please input type!', whitespace: true }],
                        })(
                            <Input style={{ maxWidth: '300px' }} />
                        )}
                    </Col>
                    <Col span={8}>
                            <Tooltip title={'Tourist,Student,etc'}>
                                <Icon type={'question-circle-o'}/>
                            </Tooltip>
                    </Col>
                </Row>
            </FormItem>
            <FormItem
                {...formItemLayout}
                colon={false}
                label="Your Alien Registration Number">
                <Row gutter={16}>
                    <Col span={16}>
                        {getFieldDecorator(`dynamic[alien_registration_number${k + 1}]`, {
                            rules: [{ required: false, message: 'Please input number!', whitespace: true }],
                        })(
                            <Input style={{ maxWidth: '300px' }} />
                        )}
                    </Col>
                    <Col span={8}>
                            <Tooltip title={'You would not have one if you were a tourist. Enter None if appropriate'}>
                                <Icon type={'question-circle-o'}/>
                            </Tooltip>
                    </Col>
                </Row>
            </FormItem>
            <FormItem
                {...formItemLayout}
                colon={false}
                label={(
                    <span>
                        Start date of this visit&nbsp;
                </span>
                )}
            >
                {getFieldDecorator(`dynamic[alien_visit_start_date${k + 1}]`, {
                    rules: [{ required: false, message: 'Please input date!', whitespace: true }],
                })(
                    <Row gutter={16}>
                        <Col span={16}>
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
                        End date of this visit&nbsp;
                </span>
                )}
            >
                {getFieldDecorator(`dynamic[alien_visit_end_date${k + 1}]`, {
                    rules: [{ required: false, message: 'Please input date!', whitespace: true }],
                })(
                    <Row gutter={16}>
                        <Col span={16}>
                        <InputMask className="input-mask" mask="99/99/9999" placeholder="mm/dd/yyy" />
                        </Col>
                    </Row>
                )}
            </FormItem>
            <FormItem
                {...formItemLayout}
                colon={false}
                label={(<span>Add another visit?</span>)}
            >
                {getFieldDecorator(`another_visit`, {
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
