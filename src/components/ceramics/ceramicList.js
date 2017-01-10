import React, { PropTypes } from 'react';
import { Table, message, Popconfirm ,Pagination} from 'antd';
import styles from './list.less'
const CeramicList = ({
	total,
	current,
	loading,
	selectedRowKeys,
	delAll,
	dataSource,
	onPageChange,
	onDeleteItem,
	onEditItem,
	onSelectChange,
}) => {
	const columns = [
	{ title: '序号', dataIndex: '', key: '1', width:40, fixed:'left',render: (text, record, index) => {return <span>{index + 1}</span>}},
	{title: '主材类别',dataIndex: 'typeToString',      key: 'typeToString'},
  	{title: '主材名称',dataIndex: 'name',              key: 'name'},
  	{title: '主材型号',dataIndex: 'model',             key: 'model'},
  	{title: '长',    dataIndex: 'length',            key: 'length'},
  	{title: '宽',    dataIndex: 'width',             key: 'height'},
	{title: '进价',   dataIndex: 'buyingPrice',       key: 'buyingPrice',}, 
	{title: '售价',   dataIndex: 'sellingPrice',      key: 'sellingPrice',}, 
	{title: '主材系列',dataIndex: 'series',            key: 'series',}, 
	{title: '主材状态',dataIndex: 'materialStatusLabel',key: 'materialStatusLabel',}, 
	{title: '操作',key: 'operation',render: (text, record, index) => 
	(
	      <p>
	        <a onClick={() => onEditItem(record)} style={{marginRight:10}}>详情</a>
	        <Popconfirm title="确定要删除吗？" onConfirm={() => {onDeleteItem(record.floorId)}}>
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
	    className={styles.table}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey={record => record.floorId}
        pagination={false}
        scroll={{ x: 1600 }}
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
CeramicList.propTypes = {
  onPageChange: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  onSelectChange: PropTypes.func,
  dataSource: PropTypes.array,
  loading: PropTypes.any,
  rowSelection: PropTypes.object,
  total: PropTypes.any,
  current: PropTypes.any,
};

export default CeramicList


