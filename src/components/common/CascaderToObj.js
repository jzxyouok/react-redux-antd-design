import React from 'react';
import {
	Cascader
} from 'antd';

export default class CascaderToObj extends React.Component {
	constructor(props){
	    super(props);
	    this.state = {
	        options : this.props.options,
	        placeholder : this.props.placeholder,
	    };
	}
	
	onChange(value, selectedOptions){
		this.setState({
			selectedOptions
		});
	}
	
	render() {
		return( 
			<Cascader
				options = {this.state.options}
				placeholder = {this.state.placeholder}
				onChange = {onChange}
			>
			</Cascader>
		);
	}
}		