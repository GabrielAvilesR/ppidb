import React from 'react';
class Row extends React.Component {
	render(){
		return(
			<tr>
				<td>{this.props["nombre"]}</td>
				<td>{this.props["cantidad"]}</td>
			</tr>

		);
	}
}


export default Row;
