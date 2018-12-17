import React, { Component } from 'react';
import { Table } from 'antd';

class Datatable extends Component {

  render() {
    const { tableData:{data,pagination,loading},tableChangeHandler,tableColumns,rowEvent } = this.props;
    return (
      <Table
        columns={tableColumns}
        rowKey={record => record.id }
        dataSource={data}
        pagination={pagination}
        loading={loading}
        onChange={tableChangeHandler}
        onRow={(record) => {
          return {
            onClick: () => rowEvent ?  rowEvent(record) : null,       // click row
          };
        }}
      />
    );
  }
}

export default Datatable;