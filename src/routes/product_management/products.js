import React, { PropTypes} from 'react';
// 引入 connect 工具函数
import {connect} from 'dva';
import { routerRedux } from 'dva/router';

import ProductList from '../../components/products/productList';
import ProductModal from '../../components/products/productModal';
import ProductSearch from '../../components/products/productSearch';

function Products({location,dispatch,products}) {
	const {loading,list,total,current,field,keyword,currentItem,modalVisible,
		   modalType,type,unit,status,modelStatus,suppliers,brands,
	       types,delAll,selectedRowKeys,
	       modalVisibleInit,
	      } = products;
	const productModalProps = {
	    item: modalType === 'create' ? {} : currentItem,
	    modalType: modalType,
	    visible: modalVisible,
	    type,
	    unit,
	    status,
	    modelStatus,
	    suppliers,
	    brands,
	    onOk(data) {
	      dispatch({
	        type: 'products/'+modalType,
	        payload: data,
	      });
	    },
	    onCancel() {
	      dispatch({
	        type: 'products/hideModal',
	      });
	    },
	    onSupplierChange(data,selectedOptions){
	    	dispatch({
	    		type:'products/onSupplierChange',
	    		payload:{data}
	    	});
	    },
  	};
	const productListProps = {
		dataSource: list,
		total,
		loading,
		current,
		delAll,
		onPageChange(pageNum) {
			dispatch(routerRedux.push({
				pathname: '/product_management/products',
				query: {field,keyword,pageNum},
			}));
		},
		onEditItem(item) {
	      	dispatch({
		        type: 'products/showModal',
		        payload: {
		          modalType: 'update',
		          currentItem: item,
		        }
	      });
    	},
    	onDeleteItem(id) {
    		dispatch({
    			type:'products/delete',
    			payload:id
    		});
    	},
    	onSelectChange(selectedRowKeys) {
    		dispatch({
    			type: 'products/showSelection',
    			payload: {
    				selectedRowKeys
    			},
    		});
    	}
	};
	const productSearchProps = {
	    field,
	    keyword,
	    type,
	    delAll,
	    selectedRowKeys,
	    onSearch(fieldsValue) {
	      dispatch({
	        type: 'products/query',
	        payload: {
	        	condition:fieldsValue.keyword,
	        }
	      });
	    },
	    handleRowSelectionChange() {
	    	if(!delAll){
		    	dispatch({
		    		type:'products/showSelection',
		    	});
	    	}else {
	    		if(!(selectedRowKeys.length > 0)){
	    			dispatch({
			    		type:'products/hideSelection',
			    	});
	    		}
	    	}
	    },
	    onDeleteAll(selectedRowKeys)  {
	    	dispatch({
	    		type:'products/delete',
	    		payload:selectedRowKeys,
	    	})
	    },
	    onAdd() {
	      dispatch({
	        type: 'products/showModal',
	        payload: {
	          modalType: 'create',
	        },
	      });
	    },
	    onInit() {
    	  dispatch({
	        type: 'products/showModalInit',
	        payload: {
	          modalType: 'create',
	        },
	      })
	    }
	};
  return (
      <div>
        <ProductSearch {...productSearchProps} />
      	<ProductList {...productListProps }/> 
        <ProductModal {...productModalProps} />
      </div>
  );
}

Products.propTypes = {
	products: PropTypes.object,
	dispatch: PropTypes.func
};

// 指定订阅数据，这里关联了 products
function mapStateToProps({products}) {
	return {products};
}

export default connect(mapStateToProps)(Products);