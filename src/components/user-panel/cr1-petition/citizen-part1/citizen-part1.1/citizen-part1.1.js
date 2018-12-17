import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Tooltip, Icon, Row, Col, Checkbox, Button, Radio } from 'antd';
import './citizen-part1.1.css';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class CitizenPart1 extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        gender: '',
        // maiden: "No",
        // divorce: 'No',
        maidenName: "No",
        disable: false
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    onChangeGender = (e) => {
        console.log('checked on gender', e.target.value);
        this.setState({
            gender: e.target.value,
        });
    }
    onChangeName = (e) => {
        console.log('checked on name', e.target.value);
        this.setState({
            gender: e.target.value,
        });
    }
    onChangeMaidenName = (e) => {
        console.log('checked on maiden1', e.target.value);
        this.setState({
            maidenName: e.target.value,
        });
    }
    onChangeCheckBox = (e) => {
        console.log('chekedmark!', e.target.checked)
        this.setState({ disable: e.target.checked, fieldRequired: e.target.checked })

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
                        {getFieldDecorator(`names[firstName${k + 1}]`, {
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
                        {getFieldDecorator(`names[lastName${k + 1}]`, {
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
                        {getFieldDecorator(`names[maidenName${k + 1}]`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16}>
                                    <RadioGroup>
                                        <Radio value={'No'}>No</Radio>
                                        <Radio value={"Yes"}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={(<span>Is this your maiden name?</span>)}
                    >
                        {getFieldDecorator(`names[maidenName${k + 1}]`, {
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
            <div id="citizen-part-name">
                <h3>Citizen Part 1.1 Name</h3>

                <p>Sponsor's name and gender</p>
                <p>The sponsor is the U.S. citizen or permanent resident.</p>
                <Form onSubmit={this.handleSubmit.bind(this)} className="citizen-part-name-form">
                    <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={(
                            <span>
                                First Name&nbsp;
                        </span>
                        )}
                    >
                        {getFieldDecorator('firstName', {
                            rules: [{ required: true, message: 'Please input your First Name!', whitespace: true }],
                        })(
                            <Row gutter={16}>
                                <Col span={16} >
                                    <Input style={{ maxWidth: '300px' }} />
                                </Col>

                                <Col span={8} >
                                    <FormItem >
                                        <Tooltip title="Fill This">
                                            <Icon type="question-circle-o" />
                                        </Tooltip>
                                    </FormItem>
                                </Col>
                            </Row>
                        )}
                    </FormItem>


                    {(this.state.disable === false) ?
                        (


                            <FormItem
                                {...formItemLayout}
                                colon={false}
                                label={(
                                    <span>
                                        Middle Name&nbsp;
                                </span>
                                )}
                            >
                                <Row gutter={16}>

                                    <Col span={16} >
                                        {getFieldDecorator('middleName', {
                                            rules: [{ required: true, message: 'Please input your Middle Name!', whitespace: true }],
                                        })(
                                            <Input disabled={false} style={{ maxWidth: '300px' }} />

                                        )}
                                    </Col>
                                    <Col span={8}>

                                        <FormItem
                                        //  {...tailFormItemLayout}
                                        >
                                            <Checkbox onChange={this.onChangeCheckBox}>Does not apply </Checkbox>
                                            <Tooltip title="Fill This">
                                                <Icon type="question-circle-o" />
                                            </Tooltip>
                                        </FormItem>
                                    </Col>

                                </Row>


                            </FormItem>


                        )
                        :
                        (



                            <FormItem
                                {...formItemLayout}
                                colon={false}
                                label={(
                                    <span>
                                        Middle Name&nbsp;
                            </span>
                                )}
                            >
                                {getFieldDecorator('middleName', {
                                    rules: [{ required: false, message: 'Please input your Middle Name!', whitespace: true }],
                                })(
                                    <Row gutter={16}>

                                        <Col span={16} >
                                            <Input disabled={true} value='N/A' style={{ maxWidth: '300px' }} />
                                        </Col>

                                        <Col span={8}>

                                            <FormItem
                                            //  {...tailFormItemLayout}
                                            >
                                                <Checkbox onChange={this.onChangeCheckBox}>Does not apply </Checkbox>
                                                <Tooltip title="Fill This">
                                                    <Icon type="question-circle-o" />
                                                </Tooltip>
                                            </FormItem>
                                        </Col>

                                    </Row>


                                )}
                            </FormItem>

                        )
                    }




                    <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={(
                            <span>
                                Last Name&nbsp;
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
                                    <FormItem
                                    // {...tailFormItemLayout}
                                    >
                                        <Tooltip placement="right" title="Fill This">
                                            <Icon type="question-circle-o" />
                                        </Tooltip>
                                    </FormItem>
                                </Col>
                            </Row>
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout}
                        colon={false}
                        label={(<span>Sponsor's Gender?</span>)}
                    >
                        {getFieldDecorator('gender', {
                            rules: [{ required: false, message: 'Please Select Gender!', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16}>
                                    <RadioGroup onChange={this.onChangeGender} value={this.state.gender}>
                                        <Radio value={'Male'}>Male</Radio>
                                        <Radio value={"Female"}>Female</Radio>

                                    </RadioGroup>
                                </Col>

                                <Col span={8}>
                                    <FormItem
                                    // {...tailFormItemLayout}
                                    >
                                        <Tooltip title="Fill This">
                                            <Icon type="question-circle-o" />
                                        </Tooltip>
                                    </FormItem>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout}
                        colon={false}
                        label={(
                            <span style={{ maxWidth: '300px' }}>
                                Have you ever used another name
                                including a maiden name?
                        </span>)}
                    >
                        {getFieldDecorator('maidenName', {
                            rules: [{ required: false, message: 'Please choose any one!', whitespace: true }],
                        })(
                            <Row style={{marginLeft:'5px'}}>
                                <Col span={16}>
                                    <RadioGroup onChange={this.onChangeMaidenName} value={this.state.maidenName}>
                                        <Radio value={'No'}>No</Radio>
                                        <Radio value={"Yes"}>Yes</Radio>

                                    </RadioGroup>
                                </Col>

                                <Col span={8}>
                                    <FormItem
                                    // {...tailFormItemLayout}
                                    >
                                        <Tooltip title="Fill This">
                                            <Icon type="question-circle-o" />
                                        </Tooltip>
                                    </FormItem>
                                </Col>
                            </Row>
                        )}

                    </FormItem>



                    {(this.state.maidenName === 'No')
                        ?
                        (
                            null
                        )
                        :
                        (
                            <div>
                                <FormItem {...formItemLayout}
                                    colon={false}
                                    label={(<span>Were any of your name changes for reasons other than marriage or divorce?</span>)}
                                >
                                    {getFieldDecorator('gender', {
                                        rules: [{ required: false, message: '', whitespace: true }],
                                    })(
                                        <Row style={{marginLeft:'5px'}}>
                                            <Col span={16}>
                                                <RadioGroup onChange={this.onChangeName}>
                                                    <Radio value={'No'}>No</Radio>
                                                    <Radio value={"Yes"}>Yes</Radio>

                                                </RadioGroup>
                                            </Col>
                                        </Row>
                                    )}
                                </FormItem>
                                {/* <DynamicNameFields prop={this.props.form} formItemLayout={formItemLayout} index={1}/> */}
                                {formItems}
                            </div>
                        )

                    }

                    <Button type="primary" htmlType="submit">Save and Continue</Button>
                    {/* <Radio onChange={this.handleSubmit} >get values</Radio> */}
                </Form>
            </div>


        );
    }
}

const CitizenOne = Form.create()(CitizenPart1);

export default CitizenOne;
