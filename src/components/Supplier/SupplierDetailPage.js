import React from 'react';
import {Form,Modal,Input,Tooltip,Icon,Cascader,Select,Row,Col,Checkbox,Button,notification,InputNumber,Upload,message} from 'antd';
import reqwest from 'reqwest';
import ImageFileUpload from '../Common/ImageFileUpload'; 
const FormItem = Form.Item;

const SupplierDetailForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form, supplier, onDone } = props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      	labelCol: { span: 6 },
      	wrapperCol: { span: 18 }
    };
    const summaryFormItemLayout = {
    	labelCol: { span: 1},
      	wrapperCol: { span: 23}
    };
    return (
      <Modal
        visible={visible}
        title="供应商详细信息"
        okText="提交"
        onCancel={onCancel}
        onOk={onCreate} 
        width="50%"
      >
        <Form horizontal>
	        <Row>
	        	<Col span = {6}>
	        		<Col offset={2} span = {24}>
	        			<ImageFileUpload width="280" height="280" onDone={onDone}/>
	        		</Col>
	        	</Col>
	        	<Col span = {18}>
					<Col span = {24}>
						<FormItem {...formItemLayout} label = "公司名称" > {getFieldDecorator('name', {
          					rules: [{required: true, message: '请输入公司名称' }],initialValue:supplier.name
          				})(<Input placeholder="请填写公司名称"/>)} </FormItem> 
					</Col> 
					<Col span = {24}>
						<FormItem {...formItemLayout} label = "联系人" > {getFieldDecorator('contact', {
							rules: [{required: true, message: '请输入联系人' }],initialValue:supplier.contact
						})(<Input placeholder="请填写主要联系人"/>)} </FormItem>
					</Col> 
					<Col span = {24}>
						<FormItem {...formItemLayout} label = "办公电话" > {getFieldDecorator('phone', {initialValue:supplier.phone})(<Input placeholder="请填写办公电话"/>)} </FormItem> 
					</Col> 
					<Col span = {24}>
						<FormItem {...formItemLayout} label = "传真号码" > {getFieldDecorator('faxNumber', {initialValue:supplier.faxNumber})(<Input placeholder="请填写传真号码"/>)} </FormItem> 
					</Col> 
					<Col span = {24}>
						<FormItem {...formItemLayout} label = "电子邮箱" > {getFieldDecorator('email', {initialValue:supplier.email})(<Input placeholder="请填写电子邮箱"/>)} </FormItem> 
					</Col> 
					<Col span = {24}>
						<FormItem {...formItemLayout} label = "地址" > {getFieldDecorator('address', {initialValue:supplier.address})(<Input placeholder="请填写公司地址"/>)} </FormItem> 
					</Col> 
				</Col>
	        </Row>
	        <Row>
				<Col span = {24}>
					<FormItem {...summaryFormItemLayout} label = "简介" > 
						{getFieldDecorator('summary', {initialValue:supplier.summary})
							(<Input type="textarea" placeholder="请填写公司简介" autosize={{minRows: 6, maxRows: 12}} />)
						}
					</FormItem> 
				</Col> 
			</Row>
        </Form>
      </Modal>
    );
  }
);

const SupplierDetailPage = React.createClass({
	getInitialState() {
	  return { 
	  	visible: false,
	  	supplier : this.props.supplier
	  };
	},
	showModal() {
	  this.setState({ visible: true });
	},
	handleCancel() {
	  this.setState({ visible: false });
	},
	handleUpload(imageInfo){
		console.log(...imageInfo);
		this.setState({...imageInfo});
	},
	handleCreate() {
    const form = this.form;
    const refresh = this.props.onChange;
    const pagination = this.props.pagination;
    const id = this.state.supplier.id;
    form.validateFields((err, values) => {
	    if (err) {
	    	return;
	    }
	    console.log(values);
	    Modal.confirm({
		    title: '是否修改该供应商数据?',
		    content: '修改成功后，数据无法回退，请确认',
		    onOk() {
		      reqwest({
		       	url:'http://192.168.1.66:8081/supplier/' + id,
		      	crossOrigin:true,
		      	method: 'PUT',
		      	contentType: "application/x-www-form-urlencoded;charset=utf-8", 
		      	data: values, 
		      	error: function (err) {
		      		notification.open({
								type:'error',
						    message: '操作失败',
						    description: '您对该条供应商数据的修改失败，错误信息:' + err
							});
		      	},
			      success: function (data) {
							notification.open({
								type:'success',
							    message: '操作成功',
							    description: '您已成功修改了该供应商数据'
							});
						}
			    }).then((data) => {
			      	form.resetFields();
			      	this.setState({ visible: false });
			      	refresh(pagination);
		    	});
		    },
		    onCancel() {}
		  });
	    
    });
	},
	saveFormRef(form) {
	  this.form = form;
	},
	render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>详情</Button>
        <SupplierDetailForm
        	supplier={this.state.supplier}
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          onDone={this.handleUpload}
        />
      </div>
    );
	}
});

export default SupplierDetailPage;