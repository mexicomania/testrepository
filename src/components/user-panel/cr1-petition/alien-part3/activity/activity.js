import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Row, Col, Button, Radio, Select } from 'antd';
import './activity.css';

const FormItem = Form.Item;
const InputText = Input.TextArea;
const RadioGroup = Radio.Group;


class Activity extends Component {
    state = {
        is_alien_worked_for_organization:false,
        is_alien_arrested_for_crimes:false,
        is_alien_belong_clan_or_tribe:false
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
            <div id="alien-part3-activity">
                <h3>Alien Part 3.5 Activity</h3>

                <p>Alien Military</p>
                <p>All questions are about the Alien (foreign citizen).</p>
                <Form onSubmit={this.handleSubmit.bind(this)} className="alien-part3-activity-form">

                    <FormItem
                        colon={false}
                        label={(<span>Has the alien belonged to, contributed to or worked for any professional, social or charitable organizations?</span>)}
                    >
                        {getFieldDecorator(`is_alien_worked_for_organization`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_worked_for_organization')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>

                    {(this.state.is_alien_worked_for_organization) ?
                        (
                             <div className="field-items">
                                 <OrganizationFields
                                     data={this.state}
                                     getFieldDecorator={getFieldDecorator}
                                     formItemLayout={formItemLayout}/>
                             
                         </div>
                        ) : (null)}
                    
                    <FormItem
                        colon={false}
                        label={(<span>Has the alien ever been arrested or convicted for any offense or crime?</span>)}
                    >
                        {getFieldDecorator(`is_alien_arrested_for_crimes`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_arrested_for_crimes')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>

                    {(this.state.is_alien_arrested_for_crimes) ?
                        (
                            <div className="field-items">
                            <FormItem
                             {...formItemLayout}
                             colon={false}
                             label="Explain all arrests and/or convictions">
                             <Row gutter={16}>
                                 <Col span={16}>
                                     {getFieldDecorator(`alien_arrest_detail`, {
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
                        label={(<span>Do you belong to a clan or tribe?</span>)}
                    >
                        {getFieldDecorator(`is_alien_belong_clan_or_tribe`, {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row>
                                <Col span={16} style={{textAlign:'center'}}>
                                    <RadioGroup onChange={this.onChangeName.bind(this, 'is_alien_belong_clan_or_tribe')}>
                                        <Radio value={false}>No</Radio>
                                        <Radio value={true}>Yes</Radio>
                                    </RadioGroup>
                                </Col>
                            </Row>
                        )}
                    </FormItem>

                    {(this.state.is_alien_belong_clan_or_tribe) ?
                        (
                            <div className="field-items">
                            <FormItem
                                {...formItemLayout}
                                colon={false}
                                label="Clan or Tribe Name">
                                <Row gutter={16}>
                                    <Col span={16}>
                                        {getFieldDecorator(`alien_clan_or_tribe_name`, {
                                            rules: [{ required: false, message: 'Please input name!', whitespace: true }],
                                        })(
                                            <Input style={{ maxWidth: '300px' }} />
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

export default Form.create()(Activity);


const OrganizationFields = ({ data, getFieldDecorator, formItemLayout }) => {
    return (
        <div>
            <p>Add one or more organizations.</p>
            <FormItem
                {...formItemLayout}
                colon={false}
                label="Organization #1">
                <Row gutter={16}>
                    <Col span={16}>
                        {getFieldDecorator(`alien_worked_org_name_1`, {
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
                label="Organization #2">
                <Row gutter={16}>
                    <Col span={16}>
                        {getFieldDecorator(`alien_worked_org_name_2`, {
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
                label="Organization #3">
                <Row gutter={16}>
                    <Col span={16}>
                        {getFieldDecorator(`alien_worked_org_name_3`, {
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
                label="Organization #4">
                <Row gutter={16}>
                    <Col span={16}>
                        {getFieldDecorator(`alien_worked_org_name_4`, {
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
                label="Organization #5">
                <Row gutter={16}>
                    <Col span={16}>
                        {getFieldDecorator(`alien_worked_org_name_5`, {
                            rules: [{ required: false, message: 'Please input name!', whitespace: true }],
                        })(
                            <Input style={{ maxWidth: '300px' }} />
                        )}
                    </Col>
                </Row>
            </FormItem>
        </div>
    )
}
