import React, { PropTypes} from 'react';
// 引入 connect 工具函数
import {connect} from 'dva';
import { routerRedux } from 'dva/router';

import CeramicList from '../../components/ceramics/ceramicList';
import CeramicModal from '../../components/ceramics/ceramicModal';
import CeramicSearch from '../../components/ceramics/ceramicSearch';
import InitCeramicModal from '../../components/ceramics/initCeramicModal';

function Ceramics({ dispatch,ceramics }) {
	const {loading,selectedRowKeys,delAll,
		list,total,current,field,keyword,
		currentItem,modalVisible,modalType,
		unit,status,materialTexture,types,suppliers,brands,
		modalVisibleInit,
	} = ceramics;
	const ceramicModalProps = {
		unit,
		status,
		materialTexture,
		types,
		suppliers,
		brands,
	    item: modalType === 'create' ? {} : currentItem,
	    type: modalType,
	    visible: modalVisible,
	    current,
	    onOk(data) {
	      dispatch({
	        type: `ceramics/${modalType}`,
	        payload:data,
	      });
	    },
	   refresh(pageNum) {
	    	dispatch(routerRedux.push({
				pathname: '/material_management/ceramics',
				query: { field,keyword,pageNum },
			}));
	    },
	    onCancel() {
	      dispatch({
	        type: 'ceramics/hideModal',
	      });
	    },
	    onChangeSupplier(data) {
	    	dispatch({
	    		type: 'ceramics/onSupplierChange',
	    		payload: {data}
	    	});
	    },
  	};
  	const InitceramicModalProps = {
		unit,
		status,
		materialTexture,
		types,
		suppliers,
		brands,
	    item: modalType === 'create' ? {} : currentItem,
	    type: modalType,
	    visible: modalVisibleInit,
	    onOk(data) {
	      dispatch({
	        type: 'ceramics/' + modalType,
	        payload:data,
	      });
	    },
	    onCancel() {
	      dispatch({
	        type: 'ceramics/hideModalInit',
	      });
	    },
	    onChangeSupplier(value) {
	    	dispatch({
	    		type: 'ceramics/query',
	    		payload: {
	    			supplierId: value,
	    		}
	    	});
	    },
  	};
	const ceramicListProps = {
		dataSource: list,
		total,
		loading,
		delAll,
		current,
		onPageChange(pageNum) {
			dispatch(routerRedux.push({
				pathname: '/material_management/ceramics',
				query: { field,keyword,pageNum },
			}));
		},
		onDeleteItem(id) {
	      dispatch({
	        type: 'ceramics/delete',
	        payload: id,
	      });
	    },
		onEditItem(item) {
	      	dispatch({
		        type: 'ceramics/showModal',
		        payload: {
		          modalType: 'update',
		          currentItem: item,
		        }
	      });
    	},
    	onSelectChange(selectedRowKeys) {
    		dispatch({
    			type: 'ceramics/showSelection',
    			payload: {
    				selectedRowKeys
    			},
    		});
    	}
	};
	const ceramicSearchProps = {
	    field,
	    keyword,
	    types,
	    delAll,
	    selectedRowKeys,
	    onSearch(fieldsValue) {
	      dispatch({
	        type: 'ceramics/query',
	        payload: {
	        	condition:fieldsValue.keyword,
	        	type1:types[0]?types[0].id:null,
	        	type2:types[1]?types[1].id:null,
	        	type3:types[2]?types[2].id:null,
	        }
	      });
	    },
	    handleRowSelectionChange() {
	    	if(!delAll){
		    	dispatch({
		    		type:'ceramics/showSelection',
		    	});
	    	}else {
	    		if(!(selectedRowKeys.length > 0)){
	    			dispatch({
			    		type:'ceramics/hideSelection',
			    	});
	    		}
	    	}
	    },
	    onDeleteAll(selectedRowKeys)  {
	    	dispatch({
	    		type:'ceramics/delete',
	    		payload:selectedRowKeys,
	    	})
	    },
	    onAdd() {
	      dispatch({
	        type: 'ceramics/showModal',
	        payload: {
	          modalType: 'create',
	        },
	      });
	    },
	    onInit() {
    	  dispatch({
	        type: 'ceramics/showModalInit',
	        payload: {
	          modalType: 'create',
	        },
	      })
	    }
	};
	return ( 
		<div>
			<CeramicSearch {...ceramicSearchProps} />
			<CeramicList  {...ceramicListProps }/> 
			<CeramicModal {...ceramicModalProps} />
			<InitCeramicModal {...InitceramicModalProps} />
		</div>
	);
}
Ceramics.propTypes = {
	ceramics: PropTypes.object,
	dispatch: PropTypes.func
};
// 指定订阅数据，这里关联了 products
function mapStateToProps({ceramics}) {
	return {ceramics};
}

export default connect(mapStateToProps)(Ceramics);