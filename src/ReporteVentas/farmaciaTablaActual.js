import React from 'react';
import PropTypes from 'prop-types';
import RowA from './RowA';

class FarmaciaTablaActual extends React.Component {

	render(){
		return (
				<tbody className="FarmaciaTabla">
					{Object.keys(this.props).map(key => 
						<RowA key={this.props[key]["amecop"]} {...this.props[key]}/>		
					)}		
				</tbody>
			);
	}
}

export default FarmaciaTablaActual;