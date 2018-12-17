import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { Icon, Form, Input, Button,Modal } from 'antd';
import './dynamic-modal.css';

const FormItem = Form.Item;

class DynamicModal extends Component {
    state = {
        modalVisible: false
    }


    setModalVisible(modalVisible) {
        this.setState({ modalVisible });
    }

    okModal() {
        this.handleSubmit();
    }
    

    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.saveEvent(values)

            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { headerText,modalState,closeModal } = this.props;
        return (
            <div id="dynamic-modal-container">
            {/* { isError ? (
                <span className="ant-form-text" style={{marginBottom:'10px',color:'red'}}>Error:something went error</span>        
                ) : (null)
            } */}           
             <div>
        <Modal
          title={<span>{headerText} Number</span>}
          style={{ top: 20 }}
          maskClosable={false}
          visible={modalState}
          okText={'Save'}
          onOk={() => this.handleSubmit()}
          onCancel={() => closeModal()}
        >
          <Form className="add-form">
                <FormItem>
                    {getFieldDecorator(`${headerText}_number`, {
                        rules: [{ required: true, message: `Please input ${headerText} No.` }],
                    })(
                        <Input />
                    )}
                </FormItem>
            </Form>
        </Modal>
        <br />
      </div>

            </div>
        );
    }
}

export default 
connect(
    state =>{
       return {
            userState:state.user
        }
    },
    {}
  )(Form.create()(DynamicModal));