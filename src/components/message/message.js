import React, { Component } from 'react';
import Datatable from '../datatable/datatable';
import { Form, Icon, Input } from 'antd';
const FormItem = Form.Item;

class Message extends Component {
    state = {
        data: [],
        pagination: {},
        loading: false,
    }

    // Search handler
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    // Table change handler
    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
          pagination: pager,
        });
        this.fetchData({
          results: pagination.pageSize,
          page: pagination.current,
          sortField: sorter.field,
          sortOrder: sorter.order,
          ...filters,
        });
      }
    //   Fetch data from api
    fetchData = (params = {}) => {
        console.log('params:', params);
        this.setState({ loading: true });
        fetch(
          'https://jsonplaceholder.typicode.com/users'
          // method: 'Get',
          // data: {
          //   results: 10,
          //   ...params,
          // },
          // type: 'json',
        ).then(response => response.json()).then((data) => {
          const pagination = { ...this.state.pagination };
          // Read total count from server
          // pagination.total = data.totalCount;
          pagination.total = 200;
          this.setState({
            loading: false,
            data: data,
            pagination,
          });
        });
      }
      componentDidMount() {
        this.fetchData();
      }

      columns = [{
        title: 'Name',
        dataIndex: 'name',
        sorter: true,
        render: title => `${title}`,
        width: '20%',
      },{
        title: 'Username',
        dataIndex: 'username',
        width: '20%',
      },{
        title: 'Email',
        dataIndex: 'email',
        width: '20%',
      },{
        title: 'Company Name',
        dataIndex: 'company.name',
        width: '20%',
      }];
    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div id="search-user">
                <Form onSubmit={this.handleSubmit} className="search-user-form">
                <span className="ant-form-text" style={{marginBottom:'10px'}}><b>Messages</b></span>                    
                    <FormItem>
                        {getFieldDecorator('Name', {
                            rules: [{ required: true, message: 'Please input user name!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Search by Name" />
                        )}
                    </FormItem>
                </Form>

                <Datatable 
                    tableData={this.state} 
                    tableChangeHandler={this.handleTableChange.bind(this)}
                    tableColumns={this.columns} />
            </div>
        );
    }
}

export default Form.create()(Message);