import React, { PropTypes } from 'react';
import { Table, message, Popconfirm ,Pagination} from 'antd';
import 'antd/dist/antd.css';

const SupplierList = ({
	total,
	current,
	delAll,
	selectedRowKeys,
	onSelectChange,
	loading,
	dataSource,
	onPageChange,
	onEditItem,
	onDeleteItem,
	refresh,
}) => {
	const columns = [
	{ title: '公司名称', dataIndex: 'name', key: 'name'},
  	{ title: '联系地址', dataIndex: 'address', key: 'address'},
  	{ title: '联系人',  dataIndex: 'contact', key: 'contact'},
  	{ title: '办公电话', dataIndex: 'phone',  key: 'phone'},
  	{ title: '传真号码', dataIndex: 'faxNumber', key: 'faxNumber'},
  	{ title: '电子邮件', dataIndex: 'email', key: 'email'},
	{ title: '操作', key: 'operation',
	    render: (text, record) => (
	      <p>
	        <a onClick={() => onEditItem(record)} style={{marginRight:10}}>详情</a>
	        <Popconfirm title="确定要删除吗？" onConfirm={() => {onDeleteItem(record.id)}}>
	          <a>删除</a>
	        </Popconfirm>
	      </p>
	    ),
  	}
	];
	var rowSelection = undefined;
	if(delAll) {
		rowSelection = {
      	  onChange:onSelectChange,
	    };
	}
  return (
    <div>
        <Table
	        columns={columns}
	        dataSource={dataSource}
	        loading={loading}
	        rowKey={record => record.id}
	        pagination={false}
	        rowSelection={rowSelection}
      	/>
	    <Pagination
	        showTotal={total => `共 ${total} 条`}
            total={total}
	        current={current}
	        pageSize={10}
	        onChange={onPageChange}
	    />
    </div>
  );
}

SupplierList.propTypes = {
  onPageChange: PropTypes.func,
  onEditItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onSelectChange: PropTypes.func,
  refresh: PropTypes.func,
  rowSelection: PropTypes.object,
  dataSource: PropTypes.array,
  loading: PropTypes.any,
  total: PropTypes.any,
  current: PropTypes.any,
};

export default SupplierList


