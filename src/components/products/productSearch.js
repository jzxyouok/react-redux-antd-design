import React, { PropTypes } from 'react';
import { Form, Input, Button, Popconfirm,Select,Cascader} from 'antd';
import styles from './ProductSearch.less';

const ProductSearch = ({
  field, 
  keyword,
  onSearch,
  onAdd,
  selectedRowKeys,
  handleRowSelectionChange,
  onDeleteAll,
  type,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    },
  }) => {
  function handleSubmit(e) {
    e.preventDefault();
    validateFields((errors) => {
      if (!!errors) {
        return;
      }
      onSearch(getFieldsValue());
    });
  }
  return (
    <div className={styles.normal}>
      <div className={styles.search}>
        <Form inline onSubmit={handleSubmit}>
          <Form.Item>
            {getFieldDecorator('type1', {
            })(
              <Cascader options={type} style={{verticalAlign:'top'}}/>
            )}
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator('keyword', {
              initialValue: keyword || '',
            })(
              <Input placeholder="产品名称"/>
            )}
          </Form.Item>
          <Button style={{ marginRight: '10px',marginTop:'2px' }} type="primary" htmlType="submit">搜索</Button>
        </Form>
      </div>
      <div className={styles.create}>
        <Button type="primary" onClick={onAdd}>新增</Button>
        {
        	selectedRowKeys.length>0?<Popconfirm title="确定要删除吗？" onConfirm={() => {onDeleteAll(selectedRowKeys)}}>
	        	<Button type="primary" style={{marginLeft:20,marginRight:20}} onClick={handleRowSelectionChange}>删除</Button>
	        </Popconfirm>
        	:<Button type="primary" style={{marginLeft:20,marginRight:20}} onClick={handleRowSelectionChange}>删除</Button>
        }
      </div>
    </div>
  );
};

ProductSearch.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
  handleRowSelectionChange:PropTypes.func,
  onDeleteAll:PropTypes.func,
  onInit: PropTypes.func,
  field: PropTypes.string,
  keyword: PropTypes.string,
  types: PropTypes.array,
};

export default Form.create()(ProductSearch);
