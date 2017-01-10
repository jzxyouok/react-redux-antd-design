import React, { PropTypes } from 'react';
import { Form, Input, Button, Popconfirm,Select,Cascader} from 'antd';
import styles from './CeramicSearch.less';

const CeramicSearch = ({
  field, 
  keyword,
  onSearch,
  onAdd,
  selectedRowKeys,
  handleRowSelectionChange,
  onDeleteAll,
  onInit,
  types,
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
            {getFieldDecorator('types', {
            })(
              <Cascader options={types} style={{verticalAlign:'top'}}/>
            )}
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator('keyword', {
              initialValue: keyword || '',
            })(
              <Input placeholder="主材名称"/>
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
        <Button type="primary" onClick={onInit}>初始化</Button>
      </div>
    </div>
  );
};

CeramicSearch.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
  onAdd: PropTypes.func,
  handleRowSelectionChange:PropTypes.func,
  onDeleteAll:PropTypes.func,
  onInit: PropTypes.func,
  field: PropTypes.string,
  keyword: PropTypes.string,
  types: PropTypes.array,
};

export default Form.create()(CeramicSearch);
