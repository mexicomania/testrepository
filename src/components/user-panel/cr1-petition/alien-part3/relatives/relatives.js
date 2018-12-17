import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Row, Col, Button, Radio, Select, Tooltip, Icon } from 'antd';
import './relatives.css';


const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const relation = [
    {value:"",name:"(Select One)"},
    {value:"Son",name:"Son"},
    {value:"Daughter",name:"Daughter"},
    {value:"Brother",name:"Brother"},
    {value:"Sister",name:"Sister"}
]

const status = [
     {value:"",name:"(Select One)"},
     {value:"U.S. Citizen",name:"U.S. Citizen"},
     {value:"U.S. Legal Permanent Resident (LPR)",name:"U.S. Legal Permanent Resident (LPR)"},
     {value:"NonImmigrant",name:"NonImmigrant"},
     {value:"Other - Don't Know",name:"Other - Don't Know"},
]

class Relatives extends Component {
    state = {
        is_alien_have_relatives: undefined,
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
        console.log("to remove",k)
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        console.log("all",keys)
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
        console.log("all add",keys)
        const nextKeys = keys.concat(keys.length);
        console.log("add",nextKeys)
        form.setFieldsValue({
            keys: nextKeys
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
        console.log("render",keys)
        return (
            <div id="alien-part3-relatives">
                <h3>Alien Part 3.9 Relatives</h3>

                <p>Alien Relatives</p>
                <Form onSubmit={this.handleSubmit.bind(this)} className="alien-part3-relatives-form">

                    <FormItem
                        colon={false}
                        label={(<span>Do you, the Alien, have a Child, Brother or Sister living in the United States? Do not include step children.</span>)}
                    >
                        {getFieldDecorator(`is_alien_have_relatives`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{ textAlign: 'center' }}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_have_relatives')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>

                    {(this.state.is_alien_have_relatives) ?
                        (
                            <div className="field-items">
                                {keys.map((val, index) =>
                                    {
                                        {console.log(val)}
                                    return (<RelativesFields
                                        key={index}
                                        k={val}
                                        data={this.state}
                                        getFieldDecorator={getFieldDecorator}
                                        formItemLayout={formItemLayout}
                                        addEvent={this.add.bind(this)}
                                        removeEvent={this.remove.bind(this)} />)}
                                )}                                              
                            </div>
                        ) : (this.state.is_alien_have_relatives == false)?(
                            <FormItem
                                colon={false}
                                label={(<span>Do you, the Alien, have any other relatives in the United States? Not counting parents, siblings, children or in-laws.</span>)}
                            >
                                {getFieldDecorator(`is_alien_other_relatives`, {
                                    rules: [{ required: false, message: '', whitespace: true }],
                                })(
                                    <Row>
                                        <Col span={16} style={{ textAlign: 'center' }}>
                                            <RadioGroup>
                                                <Radio value={false}>No</Radio>
                                                <Radio value={true}>Yes</Radio>
                                            </RadioGroup>
                                        </Col>
                                    </Row>
                                )}
                            </FormItem>
                        ):(null)}

                    <Button type="primary" htmlType="submit">SaveandContinue</Button>
                </Form>
            </div >


        );
    }
}

export default Form.create()(Relatives);


const RelativesFields = ({ k, data, getFieldDecorator, formItemLayout, addEvent, removeEvent }) => {
    return (
        <div>
            <span className="ant-form-text" style={{ marginBottom: '10px', width: '100%', textAlign: 'center' }}>
                <b>Relative #{k + 1}</b>
            </span>
            <FormItem
                {...formItemLayout}
                colon={false}
                label="Relative's First and Middle Names">
                <Row gutter={16}>
                    <Col span={16}>
                        {getFieldDecorator(`dynamic[alien_relative_first_and_middle_names${k + 1}]`, {
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
                label="Relative's Last Name (family name)">
                <Row gutter={16}>
                    <Col span={16}>
                        {getFieldDecorator(`dynamic[alien_relative_last_name${k + 1}]`, {
                            rules: [{ required: false, message: 'Please input name!', whitespace: true }],
                        })(
                            <Input style={{ maxWidth: '300px' }} />
                        )}
                    </Col>
                    <Col span={8}>
                            <Tooltip title={'If there is a suffix after the name such as Jr. or III, put that here after the last name.'}>
                                <Icon type="question-circle-o"/>
                            </Tooltip>
                    </Col>
                </Row>
            </FormItem>
            <FormItem
                {...formItemLayout}
                colon={false}
                label={(
                    <span>
                        Alien's relationship to this person&nbsp;
                    </span>
                )}
            >
                <Row gutter={16}>
                    <Col span={16} >
                        {getFieldDecorator(`dynamic[alien_relationship_to_person${k + 1}]`, {
                            rules: [{ required: false, message: 'Please select your Relationship!', whitespace: true }],
                        })(
                            <Select
                                style={{ maxWidth: '300px' }}
                                placeholder="Select Relationship"
                                showSearch={true}
                            >
                                {
                                    relation.map((val, index) => {
                                        return (
                                            <Option key={index} value={val.value}>{val.name}</Option>
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
                label={(
                    <span>
                        Relative's Status&nbsp;
                    </span>
                )}
            >
                <Row gutter={16}>
                    <Col span={16} >
                        {getFieldDecorator(`dynamic[alien_relative_status${k + 1}]`, {
                            rules: [{ required: false, message: 'Please select Relative status!', whitespace: true }],
                        })(
                            <Select
                                style={{ maxWidth: '300px' }}
                                placeholder="Select Status"
                                showSearch={true}
                            >
                                {
                                    status.map((val, index) => {
                                        return (
                                            <Option key={index} value={val.value}>{val.name}</Option>
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
                label={(<span>Add another relative?</span>)}
            >
                {getFieldDecorator(`another_relative`, {
                    rules: [{ required: false, message: '', whitespace: true }],
                })(
                    <Row>
                        <Col span={16}>
                            <RadioGroup onChange={(e) => e.target.value ? addEvent() : removeEvent(k+1)}>
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
