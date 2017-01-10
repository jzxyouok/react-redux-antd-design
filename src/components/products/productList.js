import React, { PropTypes } from 'react';
import { Table, message, Popconfirm ,Pagination} from 'antd';
import 'antd/dist/antd.css';

const ProductList = ({
	total,
	current,
	loading,
	delAll,
	dataSource,
	onPageChange,
	onEditItem,
	onDeleteItem,
	selectedRowKeys,
	onSelectChange,
}) => {
	const columns = [
	{ title: '产品编号', dataIndex: 'code', key: 'code'},
  	{ title: '产品大类', dataIndex: 'parentDict.label', key: 'type1'},
  	{ title: '产品子类', dataIndex: 'childrenDict.label', key: 'type2'},
  	{ title: '产品名称', dataIndex: 'name',  key: 'name'},
  	{ title: '产品型号', dataIndex: 'model', key: 'model'},
  	{ title: '长', dataIndex: 'length', key: 'length'},
  	{ title: '宽', dataIndex: 'width', key: 'width'},
  	{ title: '高', dataIndex: 'height', key: 'height'},
  	{ title: '离地高度', dataIndex: 'up', key: 'up'},
  	{ title: '模型状态', dataIndex: 'modelStatusDict.label', key: 'modelStatusDict.label',}, 
	{ title: '材质', dataIndex: 'material', key: 'material',}, 
	{ title: '产品系列', dataIndex: 'series', key: 'series',}, 
	{ title: '单位', dataIndex: 'unitDict.label', key: 'unit',}, 
	{ title: '进价', dataIndex: 'buyingPrice',  key: 'buyingPrice',}, 
	{ title: '售价', dataIndex: 'sellingPrice', key: 'sellingPrice',}, 
	{ title: '供应商', dataIndex: 'toolsSupplier.name', key: 'toolsSupplier.name',}, 
	{ title: '品牌', dataIndex: 'toolsBrand.name',  key: 'toolsBrand.name',}, 
	{ title: '产品状态', dataIndex: 'productStatusDict.label', key: 'productStatusDict.label',}, 
	{ title: '操作', key: 'operation',
	    render: (text, record) => (
	      <p>
	        <a onClick={() => onEditItem(record)} style={{marginRight:10}}>详情</a>
	        <Popconfirm title="确定要删除吗？" onConfirm={() => onDeleteItem(record.id)}>
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

ProductList.propTypes = {
  onPageChange: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  onSelectChange: PropTypes.func,
  rowSelection: PropTypes.object,
  dataSource: PropTypes.array,
  loading: PropTypes.any,
  total: PropTypes.any,
  current: PropTypes.any,
};

export default ProductList


