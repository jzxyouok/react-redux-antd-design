import React, { PropTypes} from 'react';
// 引入 connect 工具函数
import {connect} from 'dva';
import { routerRedux } from 'dva/router';

import FloorList from '../../components/floors/floorList';
import FloorModal from '../../components/floors/floorModal';
import FloorSearch from '../../components/floors/floorSearch';
import InitFloorModal from '../../components/floors/initFloorModal';

function Floors({ dispatch,floors }) {
	const {loading,selectedRowKeys,delAll,
		list,total,current,field,keyword,
		currentItem,modalVisible,modalType,
		unit,status,materialTexture,types,suppliers,brands,
		modalVisibleInit,
	} = floors;
	const floorModalProps = {
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
	        type: `floors/${modalType}`,
	        payload:data,
	      });
	    },
	   /*refresh(pageNum) {
	    	dispatch(routerRedux.push({
				pathname: '/material_management/floors',
				query: { field,keyword,pageNum },
			}));
	    },*/
	    onCancel() {
	      dispatch({
	        type: 'floors/hideModal',
	      });
	    },
	    onChangeSupplier(data) {
	    	dispatch({
	    		type: 'floors/onSupplierChange',
	    		payload: {data}
	    	});
	    },
  	};
  	const InitfloorModalProps = {
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
	        type: 'floors/' + modalType,
	        payload:data,
	      });
	    },
	    onCancel() {
	      dispatch({
	        type: 'floors/hideModalInit',
	      });
	    },
	    onChangeSupplier(value) {
	    	dispatch({
	    		type: 'floors/query',
	    		payload: {
	    			supplierId: value,
	    		}
	    	});
	    },
  	};
	const floorListProps = {
		dataSource: list,
		total,
		loading,
		delAll,
		current,
		onPageChange(pageNum) {
			dispatch(routerRedux.push({
				pathname: '/material_management/floors',
				query: { field,keyword,pageNum },
			}));
		},
		onDeleteItem(id) {
	      dispatch({
	        type: 'floors/delete',
	        payload: id,
	      });
	    },
		onEditItem(item) {
	      	dispatch({
		        type: 'floors/showModal',
		        payload: {
		          modalType: 'update',
		          currentItem: item,
		        }
	      });
    	},
    	onSelectChange(selectedRowKeys) {
    		dispatch({
    			type: 'floors/showSelection',
    			payload: {
    				selectedRowKeys
    			},
    		});
    	}
	};
	const floorSearchProps = {
	    field,
	    keyword,
	    types,
	    delAll,
	    selectedRowKeys,
	    onSearch(fieldsValue) {
	      dispatch({
	        type: 'floors/query',
	        payload: {
	        	condition:fieldsValue.keyword,
	        	type1:types[0] == undefined?undefined:types[0].id,
	        	type2:types[1] == undefined?undefined:types[1].id,
	        	type3:types[2] == undefined?undefined:types[2].id,
	        }
	      });
	    },
	    handleRowSelectionChange() {
	    	if(!delAll){
		    	dispatch({
		    		type:'floors/showSelection',
		    	});
	    	}else {
	    		if(!(selectedRowKeys.length > 0)){
	    			dispatch({
			    		type:'floors/hideSelection',
			    	});
	    		}
	    	}
	    },
	    onDeleteAll(selectedRowKeys)  {
	    	dispatch({
	    		type:'floors/delete',
	    		payload:selectedRowKeys,
	    	})
	    },
	    onAdd() {
	      dispatch({
	        type: 'floors/showModal',
	        payload: {
	          modalType: 'create',
	        },
	      });
	    },
	    onInit() {
    	  dispatch({
	        type: 'floors/showModalInit',
	        payload: {
	          modalType: 'create',
	        },
	      })
	    }
	};
	return ( 
		<div>
			<FloorSearch {...floorSearchProps} />
			<FloorList  {...floorListProps }/> 
			<FloorModal {...floorModalProps} />
			<InitFloorModal {...InitfloorModalProps} />
		</div>
	);
}
Floors.propTypes = {
	floors: PropTypes.object,
	dispatch: PropTypes.func
};
// 指定订阅数据，这里关联了 products
function mapStateToProps({floors}) {
	return {floors};
}

export default connect(mapStateToProps)(Floors);