import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Row, Col, Button, Radio, Select } from 'antd';
import './military.css';
import InputMask from 'react-input-mask';


import { countriesName } from '../../../../../services/countries';

const FormItem = Form.Item;
const InputText = Input.TextArea;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const countries = countriesName();

class Military extends Component {
    state = {
        is_alien_special_skills:false,
        is_alien_served_military:false,
        is_alien_participant_or_victim:false
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
            <div id="alien-part3-military">
                <h3>Alien Part 3.4 Military</h3>

                <p>Alien Military</p>
                <p>All questions are about the Alien (foreign citizen).</p>
                <Form onSubmit={this.handleSubmit.bind(this)} className="alien-part3-military-form">

                    <FormItem
                        colon={false}
                        label={(<span>Do you have any specialized skills or training, such as firearms, explosives, nuclear, biological, or chemical experience?</span>)}
                    >
                        {getFieldDecorator(`is_alien_special_skills`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_special_skills')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>

                    {(this.state.is_alien_special_skills) ?
                        (
                            <div className="field-items">
                               <FormItem
                                {...formItemLayout}
                                colon={false}
                                label="Explain all specialized skills">
                                <Row gutter={16}>
                                    <Col span={16}>
                                        {getFieldDecorator(`alien_special_skills`, {
                                            rules: [{ required: false, message: 'Please input skills!', whitespace: true }],
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
                        label={(<span>Has the alien ever served in the military?</span>)}
                    >
                        {getFieldDecorator(`is_alien_served_military`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_served_military')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>

                    {(this.state.is_alien_served_military) ?
                        (
                            <div className="field-items">
                                {keys.map((val, index) =>
                                    <DynamicMilitaryFields
                                        key={index}
                                        k={index}
                                        data={this.state}
                                        getFieldDecorator={getFieldDecorator}
                                        formItemLayout={formItemLayout}
                                        addEvent={this.add}
                                        removeEvent={this.remove}/>
                                )}
                            </div>
                        ) : (null)}
                    <FormItem
                        colon={false}
                        label={(<span>Has the alien been a participant or victim in an armed conflict?</span>)}
                    >
                        {getFieldDecorator(`is_alien_participant_or_victim`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_participant_or_victim')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>

                    {(this.state.is_alien_participant_or_victim) ?
                        (
                            <div className="field-items">
                            <FormItem
                                {...formItemLayout}
                                colon={false}
                                label="Explain alien's involvement in this conflict">
                                <Row gutter={16}>
                                    <Col span={16}>
                                        {getFieldDecorator(`alien_involvement_detail`, {
                                            rules: [{ required: false, message: 'Please input detail!', whitespace: true }],
                                        })(
                                            <InputText col={3} style={{ maxWidth: '300px' }} />
                                        )}
                                    </Col>
                                </Row>
                            </FormItem>
                            </div>
                        ) : (null)}

                    <Button type="primary" htmlType="submit">SaveandContinue</Button>
                </Form>
            </div >


        );
    }
}

export default Form.create()(Military);


const DynamicMilitaryFields = ({ k, data, getFieldDecorator, formItemLayout, addEvent, removeEvent }) => {
    return (
        <div>
            <p>Military Service #{k+1}</p>
            <FormItem
                {...formItemLayout}
                colon={false}
                label={(
                    <span>
                        Country of military service&nbsp;
                </span>
                )}
            >
                <Row gutter={16}>
                    <Col span={16} >
                        {getFieldDecorator(`dynamic[alien_military_service_country${k + 1}]`, {
                            rules: [{ required: false, message: 'Please select your country!', whitespace: true }],
                        })(
                            <Select
                                style={{ maxWidth: '300px' }}
                                placeholder="Select Country"
                                showSearch={true}
                            >
                                {
                                    countries.map((val, index) => {
                                        return (
                                            <Option key={index} value={val.name}>{val.name}</Option>
                                        )
                                    })
                                }
                            </Select>
                        )}
                    </Col>
                </Row>
            </FormItem>
            <FormItem
                {...formItemLayout}
                colon={false}
                label="Branch of military service">
                <Row gutter={16}>
                    <Col span={16}>
                        {getFieldDecorator(`dynamic[alien_military_service_branch${k + 1}]`, {
                            rules: [{ required: false, message: 'Please input branch!', whitespace: true }],
                        })(
                            <Input style={{ maxWidth: '300px' }} />
                        )}
                    </Col>
                </Row>
            </FormItem>
            <FormItem
                {...formItemLayout}
                colon={false}
                label="Rank or position">
                <Row gutter={16}>
                    <Col span={16}>
                        {getFieldDecorator(`dynamic[alien_military_rank_or_position${k + 1}]`, {
                            rules: [{ required: false, message: 'Please input rank!', whitespace: true }],
                        })(
                            <Input style={{ maxWidth: '300px' }} />
                        )}
                    </Col>
                </Row>
            </FormItem>
            <FormItem
                {...formItemLayout}
                colon={false}
                label="Military speciality">
                <Row gutter={16}>
                    <Col span={16}>
                        {getFieldDecorator(`dynamic[alien_military_speciality${k + 1}]`, {
                            rules: [{ required: false, message: 'Please input Military speciality!', whitespace: true }],
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
                        Start Date&nbsp;
                </span>
                )}
            >
                {getFieldDecorator(`dynamic[alien_military_service_start_date${k + 1}]`, {
                    rules: [{ required: true, message: 'Please input date!', whitespace: true }],
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
                        End Date&nbsp;
                </span>
                )}
            >
                {getFieldDecorator(`dynamic[alien_military_service_end_date${k + 1}]`, {
                    rules: [{ required: true, message: 'Please input date!', whitespace: true }],
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
                label={(<span>Add another Military Serivce</span>)}
            >
                {getFieldDecorator(`another_service`, {
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
