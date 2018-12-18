import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Tooltip, Icon, Row, Col, Checkbox, Button, Radio } from 'antd';
import InputMask from 'react-input-mask';
import './bio.css';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;


const RaceOptions = [
    { label: 'White', value: 'White' },
    { label: 'Asian', value: 'Asian' },
    { label: 'Black or African American', value: 'Black or African American' },
    { label: 'American Indian or Alaska Native', value: 'American Indian or Alaska Native' },
    { label: 'Native Hawaiian or Other Pacific Islander', value: 'Native Hawaiian or Other Pacific Islander' }
  ];

const HairColorOptions = [
    { label: 'Black', value: 'Black' },
    { label: 'Brown', value: 'Brown' },
    { label: 'Blond', value: 'Blond' },
    { label: 'Gray', value: 'Gray' },
    { label: 'White', value: 'White' },
    { label: 'Red', value: 'Red' },
    { label: 'Sandy', value: 'Sandy' },
    { label: 'Bald (No Hair)', value: 'Bald' },
    { label: 'Unknown/Other', value: 'Other' },
  ];
  
const EyeColorOptions = [
    { label: 'Brown', value: 'Brown' },
    { label: 'Blue', value: 'Blue' },
    { label: 'Green', value: 'Green' },
    { label: 'Hazel', value: 'Hazel' },
    { label: 'Gray', value: 'Gray' },
    { label: 'Black', value: 'Black' },
    { label: 'Pink', value: 'Pink' },
    { label: 'Maroon', value: 'Maroon' },
    { label: 'Other', value: 'Other' },
  ];
class Bio extends Component {
    state = {
        race:[],
        hair_color:[],
        eye_color:[],
        confirmDirty: false,
        diffYear: 0,
        selectedDate:'',
        careName:false,
        apartmentNumber:false,
        province:false,
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                console.log("Checked Box Value",this.state)
            }
        });
    }

    onChangeName = (e) => {
        console.log('checked on name', e.target.value);
        this.setState({
            gender: e.target.value,
        });
    }

    onChangeCheckBox = (name, e) => {
        console.log('chekedmark!', e.target.checked)
        console.log('chekedmark name!', name)
        this.setState({ [name]: e.target.checked })
    }

    handleChange = (name,e) => {
        console.log(e)
        this.setState({[name]: e});
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
            <div id="citizen-part2-biographical">
                <h3>Citizen Part 1.2 Biographical</h3>

                <Form onSubmit={this.handleSubmit.bind(this)} className="citizen-part2-biographical-form">
                <FormItem
                style={{display:'flex',alignItems:'center'}}
                {...formItemLayout}
                colon={false}
                label={(
                    <span>
                        Feet&nbsp;
        </span>
                )}
            >
                {getFieldDecorator('feet', {
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
                style={{display:'flex',alignItems:'center'}}
                {...formItemLayout}
                colon={false}
                label={(
                    <span>
                        Inches&nbsp;
        </span>
                )}
            >
                {getFieldDecorator('inches', {
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
                style={{display:'flex',alignItems:'center'}}
                {...formItemLayout}
                colon={false}
                label={(
                    <span>
                        Pounds&nbsp;
        </span>
                )}
            >
                {getFieldDecorator('pounds', {
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
                label={(<span>Ethnicity</span>)}
            >
                {getFieldDecorator('ethnicity', {
                    rules: [{ required: false, message: 'Please Select!', whitespace: true }],
                })(
                    <Row>
                        <Col span={16}>
                            <RadioGroup>
                                <Radio value={false}>Not Hispanic or Latino</Radio>
                                <Radio value={true}>Hispanic or Latino</Radio>
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
                                Race(Select all that apply)&nbsp;
                                </span>
                        )}
                    >
                            <Row gutter={16}>
                                <Col span={16} >
                                    <CheckboxGroup options={RaceOptions} onChange={this.handleChange.bind(this,'race')} />
                                </Col>
                            </Row>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={(
                            <span>
                                Hair Color&nbsp;
                                </span>
                        )}
                    >
                        <Row gutter={16}>
                            <Col span={16} >
                                <CheckboxGroup options={HairColorOptions} onChange={this.handleChange.bind(this,'hair_color')} />
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={(
                            <span>
                                Eye Color&nbsp;
                                </span>
                        )}
                    >
                        <Row gutter={16}>
                            <Col span={16} >
                                <CheckboxGroup options={EyeColorOptions} onChange={this.handleChange.bind(this,'eye_color')}/>
                            </Col>
                        </Row>
                    </FormItem>
                   
                    <Button type="primary" htmlType="submit">SaveandContinue</Button>
                </Form>
            </div>


        );
    }
}

const CitizenTwo = Form.create()(Bio);

export default CitizenTwo;
