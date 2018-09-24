import React from 'react';
import PropTypes from 'prop-types';
import RowA from './RowP';

class FarmaciaTablaAnterior extends React.Component {

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

export default FarmaciaTablaAnterior;