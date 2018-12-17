import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Table, Divider, Tag } from 'antd';


class List extends Component {

    render() {

        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        }, {
            title: 'Date Uploaded',
            dataIndex: 'dateUploaded',
            key: 'dateUploaded',
        },{
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
        },
        //  {
        //     title: 'Tags',
        //     key: 'tags',
        //     dataIndex: 'tags',
        //     render: tags => (
        //         <span>
        //             {tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
        //         </span>
        //     ),
        // }, 
        // {
        //     title: 'Action',
        //     key: 'action',
        //     render: (text, record) => (
        //         <span>
        //             <a href="javascript:;">Invite {record.name}</a>
        //             <Divider type="vertical" />
        //             <a href="javascript:;">Delete</a>
        //         </span>
        //     ),
        // }
    ];

        const data = [{
            key: '1',
            name: 'John Brown',
            type: "PDF",
            dateUploaded: '11/04/2018 11:48:53 PM',
            size: '5MB'
        }, {
            key: '2',
            name: 'Jim Green',
            type: "PDF",
            dateUploaded: '09/07/2018 1:50:17 AM',
            size: '5MB'
        }, {
            key: '3',
            name: 'Joe Black',
            type: "PDF",
            dateUploaded: '1/02/2018 11:54:40 PM',
            size: '5MB'
        },
    ];

        return (
            <Table columns={columns} dataSource={data} />
        )

    }
}
            function mapStateToProp(state) {
                return ({
                    // allStudents: state.root.allStudents
                })
            }
            function mapDispatchToProp(dispatch) {
                return ({
                    // fetchAllStudents: () => { dispatch(fetchAllStudentsAction()) },
                    // signout: (key) => { dispatch(signoutAction(key)) }
                })
            }

    export default connect(mapStateToProp, mapDispatchToProp)(List)
