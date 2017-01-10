import React from 'react';
import { Row, Col } from 'antd';
import { Cascader } from 'antd';
import { Button, Modal, Upload, Icon, Form, Radio } from 'antd';
import { Link } from 'dva/router';
import { Popconfirm, message } from 'antd';
import { Table, InputNumber, Input, Checkbox } from 'antd'; //引用了ant design中的组件需在这里引用，如：我用了table，DatePicker等组件便需要在这里引用一下，否则将会找不到组件。
import { Pagination, Select } from 'antd';

import reqwest from 'reqwest';
import SupplierDetailPage from './SupplierDetailPage';
import CreateSupplierPage from './CreateSupplierPage';
import styles from '../../routes/Main.less';

const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const Search = Input.Search;


const SupplierList = React.createClass({
	getInitialState() {
		return {
			selectedRowKeys: [], //初始化并未选中任何行
			data : [],
			pagination: {}
		};
	},
	handleFormChange(changedFields) {
		this.setState({
			fields: {...this.state.fields,
				...changedFields
			}
		});
	},
	//删除 全选
	onSelectChange(selectedRowKeys, selectedRows) {
		console.log(selectedRows);
		this.setState({
			selectedRowKeys
		});
		console.log('选中的条数:', selectedRowKeys.length);
	},
	//展示当前行信息
	showCurRowMessage(record) {
		alert(record.order + record.proType);
	},
	//远程获取Tabel数据
	handleTableChange(pagination) {
    const pager = this.state.pagination;
    //当前页数
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });
    this.fetch({
      pageSize: pagination.pageSize,
      pageNum: pagination.current
    });
	},
	fetch() {
	    const pagination = this.state.pagination;
	    this.setState({ loading: true });
	    reqwest({
	      url: 'http://192.168.1.16:8081/supplier',
	      crossOrigin:true,
	      method: 'get',
	      data: {
	      	pageSize: 10,
	      	pageNum: pagination.current
	      }
	    }).then((data) => {
	      const pagination = this.state.pagination;
	      var suppliers = data.data.result;
	      pagination.total = suppliers.total;
	      this.setState({
	        loading: false,
	        data: suppliers.list,
	        pagination
	      });
	      console.log('总页数：'+ pagination.total);
	    });
	},
	componentDidMount() {
    	this.fetch();
  	},
	render() {
		function onChange(value) {
			console.log(value);
		};
		//气泡层 删除
		function confirm() {
			let num = selectedRowKeys.length; //选中的数据条数
			for(var i = 0; i < num; i++) {
				for(var j = 0; j < data.length; j++) {
					if((selectedRowKeys[i] - 1) == j) {
						data.splice(i, 1);
						message.success('删除成功');
					}
				}
			};
			console.log('选中的数据条数:', num);
			console.log(selectedRowKeys);
			message.success('删除成功');
		};
		//table表
		const columns = [{ 
			title: '序号',
			Index: '',
			key: '1', 
			width:40, 
			fixed:'left',
			render: (text, record, index) => {return <span>{index + 1}</span>}
		}, {
			title: '公司名称',
			dataIndex: 'name',
			key: '2',
			fixed: 'left',
			width: 200
		}, {
			title: '联系地址',
			dataIndex: 'address',
			key: '4'
		}, {
			title: '联系人',
			dataIndex: 'contact',
			key: '5',
			width: 120
		}, {
			title: '办公电话',
			dataIndex: 'phone',
			key: '6',
			width: 120
		}, {
			title: '传真号码',
			dataIndex: 'faxNumber',
			key: '7',
			width: 120
		}, {
			title: '电子邮件',
			dataIndex: 'email',
			key: '8',
			width: 260
		}, {
			title: '操作',
			key: 'operation',
			width: 100,
			fixed: 'right',
			render: (text, record) => ( 
				<span>
					<SupplierDetailPage supplier = {record} onChange = {this.handleTableChange} pagination={this.state.pagination}/>
				</span>
			)
		}, ];

		// 全选与反选
		const { selectedRowKeys } = this.state;
		var rowSelection = { selectedRowKeys, onChange: this.onSelectChange };
		const hasSelected = selectedRowKeys.length > 0;

		return(
			<div>
				<div>
					<Row type = "flex" justify = "end" >
						<Col sm = { { span: 8 } } md = { { span: 14 } } lg = { { span: 14 } } >
							<Input placeholder="请至少输入2个字进行搜索" style={{ width: '30%',marginLeft:10,}}/>
							<Button type="primary" style={{marginLeft:10}}>搜索</Button>
						</Col>
						<Col sm = { { span: 16 } } md = { { span: 10 } } lg = { { span: 10 } } >
							<Row type = "flex" justify = "end" >
								<Col sm = { { span: 9 } } md = { { span: 12 } } lg = { { span: 15 } }></Col>
								<Col sm = { { span: 5 } } md = { { span: 4 } } lg = { { span: 3 } }>
									<CreateSupplierPage onChange = {this.handleTableChange}/>
								</Col>
								<Col sm = { { span: 5 } } md = { { span: 4 } } lg = { { span: 3 } }>
									<Button type="primary" style={{marginLeft:10}}>删除</Button>
								</Col>
								<Col sm = { { span: 5 } } md = { { span: 4 } } lg = { { span: 3 } }>
									<Button type="primary" style={{marginLeft:10}}>初始化</Button>
								</Col>
							</Row>
						</Col>
					</Row>
				</div>
				<div style = { { marginTop: 20 } }>
					<Table  
			  			columns={columns}  
			  			dataSource={this.state.data}
			  			rowSelection={rowSelection} 
	            pagination={this.state.pagination}
	            loading={this.state.loading}
	            onChange={this.handleTableChange}
			  			scroll={{ x: 1600 }} />
				</div>
			</div>
		);
	}
});

export default SupplierList;