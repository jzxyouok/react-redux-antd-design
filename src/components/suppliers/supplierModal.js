import React, { PropTypes } from 'react';
import { Form, Input, Modal,Row, Col,Select,option,Cascader,notification,Tabs  } from 'antd';
import ImageFileUpload from '../Common/ImageFileUpload';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const SupplierModal = ({
  visible,
  item = {},
  type,
  onOk,
  onCancel,
  modalType,
  refresh,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    },
  }) => {
  function handleOk() {
    validateFields((errors) => {
      if (errors) {
        return;
      }
      const data = { ...getFieldsValue(), key: item.key };
      onOk(data);
      refresh();
    });
  }
  const modalOpts = {
    visible,
    onOk: handleOk,
    onCancel,
    width:'50%',
  };
  const formItemLayout = {labelCol: { span: 6 },wrapperCol: { span: 18 }};
  const summaryFormItemLayout = {labelCol: { span: 1},wrapperCol: { span: 23}};
  return (
    <Modal {...modalOpts}>
    <Tabs animated = {false}  >
      <TabPane tab={modalType == 'update'?'编辑产品':'新增产品'} key="1">
	      <Form horizontal>
	        <Row>
	        	<Col span = {6}>
	        		<Col offset={2} span = {24}>
	        			<ImageFileUpload width="280" height="280"/>
	        		</Col>
	        	</Col>
	        	<Col span = {18}>
					<Col span = {24}>
						<FormItem {...formItemLayout} label = "公司名称" > 
							{getFieldDecorator('name', {
	          					rules: [{required: true, message: '请输入公司名称' }],
	          					initialValue:item.name
	          				})(
	          					<Input placeholder="请填写公司名称"/>
	          				)} 
          				</FormItem>
					</Col> 
					<Col span = {24}>
						<FormItem {...formItemLayout} label = "联系人" > 
							{getFieldDecorator('contact', {
								rules: [{required: true, message: '请输入联系人' }],
								initialValue:item.contact
							})(
								<Input placeholder="请填写主要联系人"/>
								)} 
						</FormItem>
					</Col> 
					<Col span = {24}>
						<FormItem {...formItemLayout} label = "办公电话" > 
							{getFieldDecorator('phone', {
								initialValue:item.phone})(
							<Input placeholder="请填写办公电话"/>
							)} 
						</FormItem>
					</Col> 
					<Col span = {24}>
						<FormItem {...formItemLayout} label = "传真号码" > 
							{getFieldDecorator('faxNumber', {
							initialValue:item.faxNumber})(
								<Input placeholder="请填写传真号码"/>
							)} 
						</FormItem>
					</Col> 
					<Col span = {24}>
						<FormItem {...formItemLayout} label = "电子邮箱" > 
							{getFieldDecorator('email', {
							initialValue:item.email})(
								<Input placeholder="请填写电子邮箱"/>
							)} 
						</FormItem>
					</Col> 
					<Col span = {24}>
						<FormItem {...formItemLayout} label = "地址" > 
							{getFieldDecorator('address', {
							initialValue:item.address})(
								<Input placeholder="请填写公司地址"/>
							)} 
						</FormItem>
					</Col> 
				</Col>
	        </Row>
	        <Row>
				<Col span = {24}>
					<FormItem {...summaryFormItemLayout} label = "简介" > 
						{getFieldDecorator('summary', {
						initialValue:item.summary
						})(
							<Input type="textarea" placeholder="请填写公司简介" autosize={{minRows: 6, maxRows: 12}} />
						)} 
					</FormItem> 
				</Col> 
			</Row>
	      </Form>
	    </TabPane>
			  {modalType == 'update'?<TabPane tab="关联编辑" key="2">关联编辑</TabPane>: ''}
			  {modalType == 'update'?<TabPane tab="已传模型" key="3"><ImageFileUpload width="200" height="200"/></TabPane>:''}
	</Tabs>
    </Modal>
  );
};

SupplierModal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  refresh: PropTypes.func,
};

export default Form.create()(SupplierModal);
