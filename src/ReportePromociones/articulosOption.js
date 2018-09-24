import React from 'react';

class ArticulosOption extends React.Component {
	render(){
		return(
			<option> {this.props["nombre"]} </option>			
		);
	}
}


export default ArticulosOption;