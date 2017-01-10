import React, { PropTypes } from 'react';
import { Form, Input, Modal,Row, Col,Select,option,Cascader,notification,Tabs} from 'antd';
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
const CeramicModal = ({
  item,
	unit,
	status,
	materialTexture,
	types,
	suppliers,
	brands,
	onChangeSupplier,
  visible,
  onOk,
  refresh,
  onCancel,
  current,
  type,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    },
  }) => {
  function handleOk() {
    validateFields((errors) => {
      if (errors) {
        notification['error']({
    			message: '消息提示：',
			    description: '请按照正确格式把内容填写完成',
			    duration: 2,
			  });
			  return;
      }
      const data = { ...getFieldsValue(), key: item.key };
      onOk(data);
      refresh(current);
      notification['success']({
				message: '消息提示：',
		    description: '修改成功',
		    duration: 1,
		  });
    });
  }
  function checkNumber(rule, value, callback) {
    if (!value) {
      callback(new Error('数据未填写'));
    }
    if (!/^\d+(\.{0,1}\d+){0,1}$/.test(value)) {
      callback(new Error('数据不合法'));
    } else {
      callback();
    }
  }
  const modalOpts = {
    visible,
    onOk: handleOk,
    onCancel,
    width:'50%',
  };
  return (
    <Modal {...modalOpts}>
     <Tabs animated = {false}>
      <TabPane tab={type == 'update'?'编辑产品':'新增产品'} key="1">
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
					       	<FormItem {...formItemLayout} label="主材名称" hasFeedback>
					          {getFieldDecorator('name', {
					          	initialValue: item.name,
					          	rules: [{required: true, message: '请输入主材编号' }]
					          })(
					          	<Input type="text"/>
					          	)}
					        </FormItem>
					        <FormItem {...formItemLayout} label="主材编号" hasFeedback>
				          	{getFieldDecorator('code', {
				          		initialValue: item.code,
				          		rules: [{required: true, message: '请输入主材编号' }]
				          	})(
				          		<Input type="text"/>
				          		)}
				        	</FormItem>
					      	<FormItem {...formItemLayout} label="主材类别" hasFeedback>
					          {getFieldDecorator('typeToString', {
					          	initialValue: [item.type1,item.type2,item.type3],
					          })(
					          		<Cascader options={types}/>
					          	)}
					        </FormItem>
					        <FormItem {...formItemLayout} label="主材型号"  hasFeedback>
				          	{getFieldDecorator('model', {
				          		initialValue: item.model,
				          		})(
				          			<Input type="text"/>
				          		)}
				        	</FormItem>
				      </Col>
			      </Row>
				    <Row> 
				      <Col span={12}>
				        <FormItem {...formItemLayout} label="长" hasFeedback>
				          {getFieldDecorator('length', {
				          	initialValue: item.length,
				          	rules: [{ validator: checkNumber },]
				          })(
				            <Input type="text"/>
				           )}
				        </FormItem>
				       </Col>
				       <Col span={12}>
				        <FormItem {...formItemLayout} label="宽" hasFeedback>
				          {getFieldDecorator('width', {
				          	initialValue: item.width,
				          	rules: [{ validator: checkNumber },]
				          })(
				            <Input type="text"/>
				          )}
				        </FormItem>
				       </Col>
				    </Row>
				    <Row>
				       <Col span={12}>
				        <FormItem {...formItemLayout} label="材质" hasFeedback>
				          {getFieldDecorator('material', {
				          	initialValue: [item.material],
				          })(
							  		<Cascader options={materialTexture}/>
							  	)}
				        </FormItem>
				       </Col>
				       <Col span={12}>
				        <FormItem {...formItemLayout} label="主材系列" hasFeedback>
				          {getFieldDecorator('series', {
				          	initialValue: item.series,
				          })(
				          	<Input type="text"/>
				          	)}
				        </FormItem>
				       </Col>
				    </Row>
				    <Row>
					    <Col span={12}>
					        <FormItem {...formItemLayout} label="单位" hasFeedback>
					          {getFieldDecorator('unit', {
					          	initialValue: [item.unit],
					          })(
					          	<Cascader options={unit}/>
					          )}
					        </FormItem>
					    </Col>
					    <Col span={12}>
				        <FormItem {...formItemLayout} label="进价" hasFeedback>
				          {getFieldDecorator('buyingPrice', {
				          	initialValue: item.buyingPrice,
				          	rules: [{ validator: checkNumber },]
				          })(
				            <Input type="text"/>
				           )}
				        </FormItem>
				       </Col>
				    </Row>
			        <Row>
			        <Col span={12}>
				        <FormItem {...formItemLayout} label="供应商" hasFeedback>
				          {getFieldDecorator('supplier', {
				          	initialValue: [item.supplier],
				          })(
				          	<Cascader	
				          		showSearch
				          		options={suppliers}
				          		onChange={onChangeSupplier}
									    placeholder="Please select"
				          	/>
						        )}
				        </FormItem>
				       </Col>
					    <Col span={12}>
					        <FormItem {...formItemLayout} label="售价" hasFeedback>
					          {getFieldDecorator('sellingPrice', {
					          	initialValue: item.sellingPrice,
					          	rules: [{ validator: checkNumber },]
					          })(
					            <Input type="text"/>
					            )}
					        </FormItem>
					    </Col>
				    </Row>
			        <Row>
					    <Col span={12}>
					        <FormItem {...formItemLayout} label="品牌" hasFeedback>
					          {getFieldDecorator('brand', {
					          	initialValue: [item.brand],
					          })(
					          	<Cascader options={brands}/>
							      )}
					        </FormItem>
					    </Col>
					    <Col span={12}>
				        <FormItem {...formItemLayout} label="主材状态" hasFeedback>
				          {getFieldDecorator('materialStatus', {
				          	initialValue: [String(item.materialStatus)],
				          })(
										<Cascader options={status}/>
									)}
				        </FormItem>
				       </Col>
				    </Row>
				    <Row>
			        <Col span={20}>
				        <FormItem {...formItemLayout} label="">
					        {getFieldDecorator('id', {
					        	initialValue: item.id,
					        })(
					        	<Input  type="hidden"/>
					        )}
					      </FormItem>
				      </Col>
			      </Row>
			      </Form>
			    </TabPane>
			    {type == 'update'?<TabPane tab="关联编辑" key="2">关联编辑</TabPane>: ''}
			    {type == 'update'?<TabPane tab="已传模型" key="3"><ImageFileUpload width="200" height="200"/></TabPane>:''}
			</Tabs>
    </Modal>
  );
};
CeramicModal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  unit: PropTypes.array,
  status: PropTypes.array,
  materialTexture: PropTypes.array,
  types: PropTypes.array,
  suppliers: PropTypes.array,
  brands: PropTypes.array,
  onChangeSupplier: PropTypes.func,
  onOk: PropTypes.func,
  refresh: PropTypes.func,
  onCancel: PropTypes.func,
};
export default Form.create()(CeramicModal);
