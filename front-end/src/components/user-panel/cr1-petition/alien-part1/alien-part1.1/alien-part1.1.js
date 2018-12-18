import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Tooltip, Icon, Row, Col, Checkbox, Button, Radio } from 'antd';
import './alien-part1.1.css';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class AlienPart1 extends Component {
    state = {
        gender: '',
        maidenName: false,
        middleName:false
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
        this.setState({
            [name]: e.target.value,
        });
    }

    onChangeCheckBox = (name,e) => {
        console.log('chekedmark!', e.target.checked)
        console.log('chekedmark!', name)
        this.setState({ [name]: e.target.checked })
    }

    // onChangeEvents for sub form 1
    remove = (k) => {
        console.log("kkkkkk", k)
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    add = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(keys.length);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    componentDidMount() {
        this.add();
    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const { autoCompleteResult } = this.state;

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
        const formItems = keys.map((k, index) => {
            return (
                <div key={k}>
                    <h5>Prior Name #{k + 1}</h5>
                    <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={'First Name'}
                        required={false}

                    >
                        {getFieldDecorator(`names[alien_firstName${k + 1}]`, {
                            validateTrigger: ['onChange', 'onBlur'],
                            rules: [{
                                required: false,
                                whitespace: true,
                                message: "",
                            }],
                        })(
                            <Input style={{ maxWidth: '300px' }} />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={'Last Name'}
                        required={false}
                    >
                        {getFieldDecorator(`names[alien_lastName${k + 1}]`, {
                            validateTrigger: ['onChange', 'onBlur'],
                            rules: [{
                                required: false,
                                whitespace: true,
                                message: "",
                            }],
                        })(
                            <Input style={{ maxWidth: '300px' }} />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={(<span>Is this your maiden name?</span>)}
                    >
                        {getFieldDecorator(`names[alien_maidenName${k + 1}]`, {
                            validateTrigger: ['onChange', 'onBlur'],
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16}>
                                    <RadioGroup onChange={(val) => val.target.value == 'Yes' ? this.add() : this.remove(k + 1)}>
                                        <Radio value={'No'}>No</Radio>
                                        <Radio value={"Yes"}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                </div>
            );
        });

        return (
            <div id="alien-part-name">
                <h3>Alien Part 1.1 Name</h3>

                <p>Alien's Name and Gender</p>
                <p>Do not write your answers in all capital letters and never use any type of non-English characters.</p>
                <p>The alien is the non - U.S. citizen who is seeking a U.S. Visa. If married use the full married name.</p>
                <Form onSubmit={this.handleSubmit.bind(this)} className="alien-part-name-form">
                    <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={(
                            <span>
                                Alien's First Name&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('alien_firstName', {
                            rules: [{ required: true, message: 'Please input your First Name!', whitespace: true }],
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
                                Alien's Middle Name&nbsp;
                                </span>
                        )}
                    >
                        <Row gutter={16}>
                            <Col span={16} >
                                {getFieldDecorator('alien_middleName', {
                                    rules: [{ required: true, message: 'Please input your Middle Name!', whitespace: true }],
                                })(
                                    <div>
                                    {(this.state.middleName)?
                                    (
                                        <Input disabled={true} defaultValue={'N/A'} style={{ maxWidth: '300px' }} />
                                    ):(
                                        <Input disabled={false} defaultValue={''} style={{ maxWidth: '300px' }} />
                                    )}
                                    </div>
                                )}
                            </Col>
                            <Col span={8}>
                                <FormItem>
                                    <Checkbox onChange={this.onChangeCheckBox.bind(this, 'middleName')}>Does not apply </Checkbox>
                                    <Tooltip title="If your birth certificate shows that you have a middle name you MUST put it here. Only put N/A if your birth certificate shows that you have no middle name.">
                                        <Icon type="question-circle-o" />
                                    </Tooltip>
                                </FormItem>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={(
                            <span>
                                Alien's Last Name&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('lastName', {
                            rules: [{ required: true, message: 'Please input your Last Name!', whitespace: true }],
                        })(
                            <Row gutter={16}>
                                <Col span={16}>
                                    <Input style={{ maxWidth: '300px' }} />
                                </Col>

                                <Col span={8}>
                                    <FormItem>
                                        <Tooltip placement="right" title="(Family name).  If there is a suffix after the name such as Jr. or III, put that here after the last name.">
                                            <Icon type="question-circle-o" />
                                        </Tooltip>
                                    </FormItem>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout}
                        colon={false}
                        label={(<span>Alien's Gender?</span>)}
                    >
                        {getFieldDecorator('alien_gender', {
                            rules: [{ required: false, message: 'Please Select Gender!', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16}>
                                    <RadioGroup>
                                        <Radio value={'Male'}>Male</Radio>
                                        <Radio value={"Female"}>Female</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    <FormItem 
                        colon={false}
                        label={(
                            <span>
                                Have you ever used another name including a maiden name but not including nick names?&nbsp;
                                <Tooltip title={`Normally this field is used for a maiden name.  However, if the alien's name has ever changed for any reason select Yes here.  Only put legal name changes here, not nicknames or shortened versions of your name. For previous names that were not maiden names you will be required to provide documentation to support the name change.`}>
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>)}
                    >
                        {getFieldDecorator('alien_maidenName', {
                            rules: [{ required: false, message: 'Please choose any one!', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this,'maidenName')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>

                    {(this.state.maidenName)?
                        (
                            <div>
                            <FormItem 
                                className="radio-center"
                                colon={false}
                                label={(
                                <span>Were any of your name changes for reasons other than marriage or divorce, such as adoption or court order?</span>)}
                            >
                                {getFieldDecorator('alien_name_change_reason', {
                                    rules: [{ required: false, message: '', whitespace: true }],
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
                            {formItems}
                        </div>
                        )
                        :(null)}

                    <Button type="primary" htmlType="submit">Save and Continue</Button>
                </Form>
            </div>


        );
    }
}

const AlienOne = Form.create()(AlienPart1);

export default AlienOne;
