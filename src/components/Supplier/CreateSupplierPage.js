import React from 'react';
import {Form,Modal,Input,Tooltip,Icon,Cascader,Select,Row,Col,Checkbox,Button,notification,InputNumber,Upload,message} from 'antd';
import reqwest from 'reqwest';
import ImageFileUpload from '../Common/ImageFileUpload'; 
const FormItem = Form.Item;


const CreateSupplierForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form, onDone } = props;
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
        title="添加一个新的供应商"
        okText="提交"
        onCancel={onCancel}
        onOk={onCreate} 
        width="50%">
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
			      					rules: [{required: true, message: '请输入公司名称' }]
			      				})(<Input placeholder="请填写公司名称"/>)} </FormItem> 
							</Col> 
							<Col span = {24}>
								<FormItem {...formItemLayout} label = "联系人" > {getFieldDecorator('contact', {
									rules: [{required: true, message: '请输入联系人' }]
								})(<Input placeholder="请填写主要联系人"/>)} </FormItem>
							</Col> 
							<Col span = {24}>
								<FormItem {...formItemLayout} label = "办公电话" > {getFieldDecorator('phone', {})(<Input placeholder="请填写办公电话"/>)} </FormItem> 
							</Col> 
							<Col span = {24}>
								<FormItem {...formItemLayout} label = "传真号码" > {getFieldDecorator('faxNumber', {})(<Input placeholder="请填写传真号码"/>)} </FormItem> 
							</Col> 
							<Col span = {24}>
								<FormItem {...formItemLayout} label = "电子邮箱" > {getFieldDecorator('email', {})(<Input placeholder="请填写电子邮箱"/>)} </FormItem> 
							</Col> 
							<Col span = {24}>
								<FormItem {...formItemLayout} label = "地址" > {getFieldDecorator('address', {})(<Input placeholder="请填写公司地址"/>)} </FormItem> 
							</Col> 
						</Col>
	        </Row>
		      <Row>
						<Col span = {24}>
							<FormItem {...summaryFormItemLayout} label = "简介" > 
								{getFieldDecorator('summary', {})
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

const CreateSupplierPage = React.createClass({
	getInitialState() {
    return { 
    	visible: false,
    	thumb:'',
    	lowQuality:'',
    	imageUrl:''
    };
	},
	showModal() {
    this.setState({ visible: true });
	},
	handleCancel() {
    this.setState({ visible: false });
	},
	handleUpload(data){
		this.setState({...data});
	},
	handleCreate() {
    const form = this.form;
    const refresh = this.props.onChange;
    form.validateFields((err, values) => {
	    if (err) {
	    	return;
	    }
	    reqwest({
       	url:'http://192.168.1.66:8081/supplier',
      	crossOrigin:true,
      	method: 'post',
      	data: values, 
      	error: function (err) {
      	notification.open({
					type:'error',
				    message: '操作失败',
				    description: '您添加的供应商数据提交失败，错误信息:' + err
					});
	      },
	      success: function (data) {
					notification.open({
						type:'success',
					    message: '操作成功',
					    description: '您已成功添加一条供应商数据'
					});
				}
	    }).then((data) => {
      	form.resetFields();
      	this.setState({ visible: false });
      	refresh({});
	    });
    });
	},
	saveFormRef(form) {
	  this.form = form;
	},
	render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>新增</Button>
        <CreateSupplierForm
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

export default CreateSupplierPage;