import React from 'react';

import Row from './row';

class FarmaciaTabla extends React.Component {

	render(){

		return (
				<tbody className="FarmaciaTabla">
        {Object.keys(this.props).map(key =>
          <Row key={this.props[key]["nombre"]} {...this.props[key]}/>
        )}
				</tbody>
			);
	}
}

export default FarmaciaTabla;
