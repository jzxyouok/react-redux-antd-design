import React, { PropTypes } from 'react';
import { Form, Input, Button, Popconfirm,Select,Cascader} from 'antd';
import styles from './supplierSearch.less';

const SupplierSearch = ({
  field, 
  keyword,
  onSearch,
  onAdd,
  selectedRowKeys,
  handleRowSelectionChange,
  onDeleteAll,
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
          <Form.Item hasFeedback>
            {getFieldDecorator('keyword', {
              initialValue: keyword || '',
            })(
              <Input placeholder="公司名称" style={{width:300}}/>
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

SupplierSearch.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
  handleRowSelectionChange:PropTypes.func,
  onDeleteAll:PropTypes.func,
  onAdd: PropTypes.func,
  field: PropTypes.string,
  keyword: PropTypes.string,
};

export default Form.create()(SupplierSearch);
