import React from 'react';
import {Form, Input, Icon, Button,Row,Col,Radio} from 'antd';


const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class DynamicFieldSet extends React.Component {
  remove = (k) => {
      console.log("kkkkkk",k)
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

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      return (
          <div key={k}>
                  <h5>Prior Name #{k+1}</h5>
        <FormItem
          {...formItemLayout}
          colon={false}
          label={'First Name'}
          required={false}
          
        >
          {getFieldDecorator(`names[firstName${k+1}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: false,
              whitespace: true,
              message: "",
            }],
          })(
            <Input style={{ maxWidth: '300px'}}  />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          colon={false}
          label={'Last Name'}
          required={false}
        >
          {getFieldDecorator(`names[lastName${k+1}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: false,
              whitespace: true,
              message: "",
            }],
          })(
            <Input style={{ maxWidth: '300px'}} />
          )}
        </FormItem>
        <FormItem 
        {...formItemLayout}
            colon={false}
            label={(<span>Is this your maiden name?</span>)}
    >
        {getFieldDecorator(`names[maidenName${k+1}]`, {
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
        {getFieldDecorator(`names[maidenName${k+1}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{ required: false, message: '', whitespace: true }],
        })(
            <Row>
                <Col span={16}>
                    <RadioGroup onChange={(val) => val.target.value == 'Yes' ? this.add() : this.remove(k) }>
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
      <Form onSubmit={this.handleSubmit}>
        {formItems}
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> Add field
          </Button>
        </FormItem>
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="primary" htmlType="submit">Submit</Button>
        </FormItem>
      </Form>
    );
  }
}

const DynamicFields = Form.create()(DynamicFieldSet);


export default DynamicFields;
