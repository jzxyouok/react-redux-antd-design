import React, { PropTypes } from 'react';
import { Form, Input, Modal,Row, Col,Select,Button,Icon,option,Cascader,Upload,message} from 'antd';
import ImageFileUpload from '../Common/ImageFileUpload';
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
const InitCeramicModal = ({
	unit,
	status,
	materialTexture,
	types,
	supplier,
	brand,
	onChangeSupplier,
  visible,
  item = {},
  onOk,
  onCancel,
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
    title: '初始化',
    visible,
    onOk: handleOk,
    onCancel,
    width:'50%',
  };
	
	const props = {
				name: 'file',
				action: '/upload.do', 
				headers: { authorization: 'authorization-text',},
				onChange(info) {
				    if (info.file.status !== 'uploading') {
				      console.log(info.file, info.fileList);
				    }
				    if (info.file.status === 'done') {
				      message.success(`${info.file.name} file uploaded successfully`);
				    } else if (info.file.status === 'error') {
				      message.error(`${info.file.name} file upload failed.`);
				    }
				},
			};
  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <Row>
	       	<Col span={12}>
		       	<FormItem {...formItemLayout} label="主材类别" hasFeedback>
		          {getFieldDecorator('typeToString', {
		          })(
		          	  <Cascader options={types}/>
		          )}
		        </FormItem>
		      </Col>
		      <Col span={12}>
		        <FormItem {...formItemLayout} label="材质" hasFeedback>
		          {getFieldDecorator('material', {
		          })(
					  		<Cascader options={materialTexture}/>
					  	)}
		        </FormItem>
		      </Col>	
		    </Row>
		    <Row>
		      <Col span={12}>
		        <FormItem {...formItemLayout} label="长" hasFeedback>
		          {getFieldDecorator('length', {
		          	rules: [{ validator: checkNumber },]
		          })(
		            <Input type="text"/>
		           )}
		        </FormItem>
	        </Col>
	        <Col span={12}>
		        <FormItem {...formItemLayout} label="宽" hasFeedback>
		          {getFieldDecorator('width', {
		          	rules: [{ validator: checkNumber },]
		          })(
		            <Input type="text"/>
		          )}
		        </FormItem>
	        </Col>
      </Row>
	    <Row> 
	       <Col span={12}>
        		<FormItem {...formItemLayout} label="售价" hasFeedback>
	          {getFieldDecorator('sellingPrice', {
	          	rules: [{ validator: checkNumber },]
	          })(
	            <Input type="text"/>
	            )}
		        </FormItem>
	       </Col>
	       <Col span={12}>
	         <FormItem {...formItemLayout} label="进价" hasFeedback>
	          {getFieldDecorator('buyingPrice', {
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
	          })(
	          	<Cascader	
	          		showSearch
	          		options={supplier}
	          		onChange={onChangeSupplier}
						    placeholder="Please select"
	          	/>
		          
			        )}
	        </FormItem>
	       </Col>
			    <Col span={12}>
			        <FormItem {...formItemLayout} label="单位" hasFeedback>
			          {getFieldDecorator('unit', {
			          })(
			          	<Cascader options={unit}/>
			          )}
			        </FormItem>
			    </Col>
	    </Row>
	    <Row>
		    <Col span={12}>
		        <FormItem {...formItemLayout} label="品牌" hasFeedback>
		          {getFieldDecorator('brand', {
		          })(
		          <Cascader options={brand}/>
				      )}
		        </FormItem>
	      </Col>
		    <Col span={12}>
	        <FormItem {...formItemLayout} label="主材状态" hasFeedback>
	          {getFieldDecorator('materialStatus', {
	          })(
							<Cascader options={status}/>
						)}
	        </FormItem>
	       </Col>
	    </Row>
	    <Row>
        <Col span={20}>
	        <FormItem {...formItemLayout} label="">
		        {getFieldDecorator('id', {})(<Input  type="hidden"/>)}
		      </FormItem>
	      </Col>
      </Row>
      </Form>
      <Row>
				    <Col offset = {3} span={21}>
				       <div style={{float:'left',marginRight:5}}>
			          	<Upload {...props} >
								    <Button type="primary">
								      <Icon type="plus-square-o" /> Add files
								    </Button>
								  </Upload>
							  </div>
							  <div style={{float:'left',marginRight:5}}>
								  <Upload {...props}>
								    <Button type="primary">
								      <Icon type="upload" /> Start upload
								    </Button>
								  </Upload>
							  </div>
							  <div>
								  <Upload {...props}>
								    <Button type="primary">
								      <Icon type="close-circle" /> cancel upload
								    </Button>
								  </Upload>
							  </div>
				    </Col>
			    </Row>
    </Modal>
  );
};
InitCeramicModal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  unit: PropTypes.array,
  status: PropTypes.array,
  materialTexture: PropTypes.array,
  types: PropTypes.array,
  supplier: PropTypes.array,
  brand: PropTypes.array,
  onChangeSupplier: PropTypes.func,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};
export default Form.create()(InitCeramicModal);
