import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Tooltip, Button, Select, Row, Col } from 'antd';
import './embassy.css';

import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';

const FormItem = Form.Item;


class Embassy extends Component {
    state = {
        confirmDirty: false,
        country:'',
        city:''
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    selectValue = ({state,value})  => {
        this.setState({ [state]: value });
      }

    render() {
        const { country, city } = this.state;
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
            <div id="alien-part2-embassy">
                <h3>Alien Part 2.3 Embassy</h3>
                <p>United States Embassy Overseas</p>
                <Form onSubmit={this.handleSubmit.bind(this)} className="alien-part2-embassy-form">
                    <span className="ant-form-text" style={{ marginBottom: '10px' }}>
                        <b>You do not necessarily have to use the U.S. embassy in your home country if you do not live there. You can request any U.S. embassy but your request for an embassy outside the country of citizenship or residence may be rejected. Persons working in a country outside their home country typically request an interview at the U.S. embassy in the country where they work if you are also using that as your residence address. If your country does not have a U.S. embassy (such as Iran) you must choose a U.S. embassy elsewhere. Any children of the beneficiary included in the petition must also attend the interview with the parent if they are also seeking a visa. Except in rare circumstances the U.S. citizen sponsor is not required to attend the embassy interview but may be allowed to attend in some countries. Fiancée and Spousal Visa interviews must be done outside the United States. If, after you are assigned an embassy for the interview, you would like to change embassies you should expect a delay of approximately two months to make the change.</b>
                    </span>
                    <span className="ant-form-text" style={{ marginBottom: '10px' }}>
                        <b>What United States Embassy abroad are you requesting for the visa interview?</b>
                    </span>
                    <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={(
                            <span>
                                Embassy Country&nbsp;
                            </span>
                        )}
                    >
                        {getFieldDecorator('embassy_country', {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row gutter={16}>
                                <Col span={16} >
                                    <CountryDropdown
                                    style={style}
                                    value={country}
                                    onChange={(val) => this.selectValue({state:'country',value:val})}/>
                                </Col>
                            </Row>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        colon={false}
                        label={(
                            <span>
                                Embassy City&nbsp;
                            </span>
                        )}
                    >
                        {getFieldDecorator('embassy_city', {
                            rules: [{ required: false, message: '', whitespace: true }],
                        })(
                            <Row gutter={16}>
                                <Col span={16} >
                                <RegionDropdown
                                style={style}
                                country={country}
                                value={city}
                                blankOptionLabel='Select City'
                                onChange={(val) => this.selectValue({state:'city',value:val})}/>
                                </Col>
                            </Row>
                        )}
                    </FormItem>

                    <span className="ant-form-text" style={{ marginBottom: '10px' }}>
                        <b>Normally the State Department will assign you to interview in the country where you live, as determined by the address you (the alien) listed as your current residence. While you can request a different embassy this request may not be granted. Hover over the blue question mark above for more information.</b>
                    </span>
                    <Button type="primary" htmlType="submit">SaveandContinue</Button>
                </Form>
            </div>
        );
    }
}



export default Form.create()(Embassy);



const style = {
    padding: '4px 11px',
    height: '32px',
    fontSize:'14px',
    border:' 1px solid #d9d9d9',
    borderRadius: '4px',
    transition: 'all .3s'
}