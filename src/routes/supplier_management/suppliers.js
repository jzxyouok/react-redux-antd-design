import React, { PropTypes} from 'react';
// 引入 connect 工具函数
import {connect} from 'dva';
import { routerRedux } from 'dva/router';

import SupplierList from '../../components/suppliers/supplierList';
import SupplierModal from '../../components/suppliers/supplierModal';
import SupplierSearch from '../../components/suppliers/supplierSearch';

function Suppliers({location,dispatch,suppliers}) {
	const {loading,list,total,current,field,keyword,currentItem,modalVisible,
		   modalType,delAll,selectedRowKeys,
	      } = suppliers;
	const supplierModalProps = {
	    item: modalType === 'create' ? {} : currentItem,
	    modalType: modalType,
	    visible: modalVisible,
	    onOk(data) {
	      dispatch({
	        type: 'suppliers/'+modalType,
	        payload: data,
	      });
	    },
	    refresh() {
	    	dispatch({
				type: 'suppliers/query',
			});
	    },
	    onCancel() {
	      dispatch({
	        type: 'suppliers/hideModal',
	      });
	    },
	    
  	};
	const supplierListProps = {
		dataSource: list,
		total,
		loading,
		current,
		delAll,
		onPageChange(pageNum) {
			dispatch(routerRedux.push({
				pathname: '/supplier_management/suppliers',
				query: {field,keyword,pageNum},
			}));
		},
		onEditItem(item) {
	      	dispatch({
		        type: 'suppliers/showModal',
		        payload: {
		          modalType: 'update',
		          currentItem: item,
		        }
	      });
    	},
    	onDeleteItem(id) {
    		dispatch({
    			type:'suppliers/delete',
    			payload:id
    		});
    	},
    	refresh() {
	    	dispatch({
				type: 'suppliers/query',
			});
	    },
    	onSelectChange(selectedRowKeys) {
    		dispatch({
    			type: 'suppliers/showSelection',
    			payload: {
    				selectedRowKeys
    			},
    		});
    	}
	};
	const supplierSearchProps = {
	    field,
	    keyword,
	    delAll,
	    selectedRowKeys,
	    onSearch(fieldsValue) {
	      dispatch({
	        type: 'suppliers/query',
	        payload: {
	        	condition:fieldsValue.keyword,
	        }
	      });
	    },
	    handleRowSelectionChange() {
	    	console.log(selectedRowKeys.length);
	    	if(!delAll){
		    	dispatch({
		    		type:'suppliers/showSelection',
		    	});
	    	}else {
	    		if(!(selectedRowKeys.length > 0)){
	    			dispatch({
			    		type:'suppliers/hideSelection',
			    	});
	    		}
	    	}
	    },
	    onDeleteAll(selectedRowKeys)  {
	    	dispatch({
	    		type:'suppliers/delete',
	    		payload:selectedRowKeys,
	    	});
	    },
	    onAdd() {
	      dispatch({
	        type: 'suppliers/showModal',
	        payload: {
	          modalType: 'create',
	        },
	      });
	    },
	};
  return (
      <div>
        <SupplierSearch {...supplierSearchProps} />
      	<SupplierList {...supplierListProps }/> 
      	<SupplierModal {...supplierModalProps} />
      </div>
  );
}

Suppliers.propTypes = {
	suppliers: PropTypes.object,
	dispatch: PropTypes.func
};

// 指定订阅数据，这里关联了 products
function mapStateToProps({suppliers}) {
	return {suppliers};
}

export default connect(mapStateToProps)(Suppliers);