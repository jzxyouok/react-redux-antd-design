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

const ProductModal = ({
	parentOptions,
  visible,
  item = {},
  type,
  modelStatus,
  unit,
  status,
  suppliers,
  brands,
  onOk,
  onCancel,
  modalType,
  onSupplierChange,
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
    });
  }
  const modalOpts = {
    visible,
    onOk: handleOk,
    onCancel,
    width:'50%',
  };
  return (
    <Modal {...modalOpts}>
    <Tabs animated = {false}  >
      <TabPane tab={modalType == 'update'?'编辑产品':'新增产品'} key="1">
	      <Form horizontal>
	      <Row>
	          <Col span={8} offset={4}>
	          	<Col offset={2} span = {22}>
		        			<img  src="../../src/assets/login-account-logo.gif"/>
		        		</Col>
		        		<Col offset={5} span = {17}>
									
								</Col>
		        </Col>
		        <Col span={12}>
			        <FormItem label="产品名称：" hasFeedback  {...formItemLayout} >
				          {getFieldDecorator('name', {
				            initialValue: item.name
				          	})(
				          		<Input type="text" />
				           )}
				      </FormItem>
			        <FormItem label="产品编号：" hasFeedback  {...formItemLayout} >
			          {getFieldDecorator('code', {
			            initialValue: item.code
			          })(
			          	<Input type="text" />
			          )}
			        </FormItem>
			        <FormItem label="产品类别：" hasFeedback {...formItemLayout}>
			          {getFieldDecorator('type1', {
			          	initialValue: [item.parentDict==null?'':item.parentDict.value, item.childrenDict==null?'':item.childrenDict.value],
			          })(
				          <Cascader options={type} placeholder="Please select" />
			          )}
			        </FormItem>
			        <FormItem label="产品型号：" hasFeedback  {...formItemLayout} >
			          {getFieldDecorator('model', {
			          	initialValue: item.model
			          })(
			          		<Input type="text" />
			          	)}
			        </FormItem>
	          </Col>
	        </Row>
	        <Row>
	          <Col span={12}>
			        <FormItem label="长：" hasFeedback {...formItemLayout}>
			          {getFieldDecorator('length', {
			            initialValue: item.length
			          })(
			            <Input type="text" />
			          )}
			        </FormItem>
			      </Col>
	          <Col span={12}>
			        <FormItem label="宽：" hasFeedback {...formItemLayout}>
			          {getFieldDecorator('width', {
			            initialValue: item.width
			          })(
			            <Input type="text" />
			          )}
			        </FormItem>
	          </Col>
	        </Row>
	        <Row>
	          <Col span={12}>
			        <FormItem label="高：" hasFeedback {...formItemLayout}>
			          {getFieldDecorator('height', {
			            initialValue: item.height
			          })(
			            <Input type="text" />
			          )}
			        </FormItem>
	          </Col>
	          <Col span={12}>
			        <FormItem label="离地高度：" hasFeedback {...formItemLayout}>
			          {getFieldDecorator('up', {
			            initialValue: item.up
			          })(
			            <Input type="text" />
			          )}
			        </FormItem>
	          </Col>
	        </Row>
	        <Row>
	          <Col span={12}>
			        <FormItem label="模型状态：" hasFeedback  {...formItemLayout} >
			          {
			          	getFieldDecorator('modelStatus', {
			            	initialValue: [item.modelStatusDict==null?'':item.modelStatusDict.id]
			          	})(
			          		<Cascader options={modelStatus} placeholder="Please select" />
			          	)}
			        </FormItem>
	          </Col>
	          <Col span={12}>
			        <FormItem label="材质：" hasFeedback  {...formItemLayout} >
			          {getFieldDecorator('material', {
			            initialValue: item.material
			          	})(
			          		<Input type="text" />
			          	)}
			        </FormItem>
	          </Col>
	        </Row>
	        <Row>
	          <Col span={12}>
			        <FormItem label="产品系列：" hasFeedback  {...formItemLayout} >
			          {getFieldDecorator('series', {
			            initialValue: item.series
			          	})(
			          		<Input type="text" />
			          	)}
			        </FormItem>
	          </Col>
	          <Col span={12}>
			        <FormItem label="单位：" hasFeedback  {...formItemLayout} >
			          {getFieldDecorator('unit', {
			            initialValue: [item.unitDict==null?'':item.unitDict.id]
			          	})(
			          		<Cascader options={unit} placeholder="Please select"  />
			          	)}
			        </FormItem>
	          </Col>
	        </Row>
	        <Row>
	          <Col span={12}>
		          <FormItem label="进价：" hasFeedback  {...formItemLayout} >
		          {getFieldDecorator('buyingPrice', {
		            initialValue: item.buyingPrice
		          	})(
		          		<Input type="text" />
		          	)}
		          </FormItem>
	          </Col>
	          <Col span={12}>
		          <FormItem label="售价：" hasFeedback  {...formItemLayout} >
		          {getFieldDecorator('sellingPrice', {
		            	initialValue: item.sellingPrice
		          	})(
		          		<Input type="text" />
		          	)}
		          </FormItem>
	          </Col>
	        </Row>
	        <Row>
	          <Col span={12}>
		          <FormItem label="供应商：" hasFeedback  {...formItemLayout} >
		          {getFieldDecorator('supplier', {
		            initialValue: [item.toolsSupplier==null?null:item.toolsSupplier.id]
		          	})( 
		          		<Cascader
									    options={suppliers}
									    onChange={onSupplierChange}
									    placeholder="Please select"
									    showSearch
		  						/>
		          	)}
		          </FormItem>
	          </Col>
	          <Col span={12}>
			        <FormItem label="产品状态：" hasFeedback  {...formItemLayout} >
			          {getFieldDecorator('productStatus', {
			          	initialValue: [item.productStatusDict==null?'':item.productStatusDict.id]
			          	})(
			          		<Cascader options={status} placeholder="Please select" />
			          	)}
			        </FormItem>
			      </Col>
	        </Row>
	        <Row>
	          <Col span={12}>
		          <FormItem label="品牌：" hasFeedback  {...formItemLayout} >
		          {getFieldDecorator('brand', {
		            initialValue: [item.toolsBrand?item.toolsBrand.id:null ]
		            /*initialValue: [item.brand],*/
		          	})(
		          		<Cascader options={brands}/>
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

ProductModal.propTypes = {
  visible: PropTypes.any,
  suppliers: PropTypes.array,
  brands: PropTypes.array,
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  onSupplierChange: PropTypes.func,
};

export default Form.create()(ProductModal);
