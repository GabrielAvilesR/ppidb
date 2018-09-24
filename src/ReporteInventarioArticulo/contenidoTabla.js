import React from 'react';
import PropTypes from 'prop-types';


class ContenidoTabla extends React.Component {

	render(){
		let rows = [];
		let totales = {"villa":0, "sanpedro":0, "arcos":0, "empaques":0, "villajuarez":0, "huertos":0, "torres":0};
		Object.keys(this.props).map(key => {
			let villa, sanpedro, arcos, empaques, villajuarez, huertos, torres;
			villa = this.props[key]["villa"] ? this.props[key]["villa"] : 0;
			totales["villa"] += villa;
			sanpedro = this.props[key]["sanpedro"] ? this.props[key]["sanpedro"] : 0;
			totales["sanpedro"] += sanpedro;
			arcos = this.props[key]["arcos"] ? this.props[key]["arcos"] : 0;
			totales["arcos"] += arcos;
			empaques = this.props[key]["empaques"] ? this.props[key]["empaques"] : 0;
			totales["empaques"] += empaques;
			villajuarez = this.props[key]["villajuarez"] ? this.props[key]["villajuarez"] : 0;
			totales["villajuarez"] += villajuarez;
			huertos = this.props[key]["huertos"] ? this.props[key]["huertos"] : 0;
			totales["huertos"] += huertos;
			torres = this.props[key]["torres"] ? this.props[key]["torres"] : 0;
			totales["torres"] += torres;

			rows.push(
				<tr key={key}>
					<td>{this.props[key]["sector"]}</td>
					<td>{this.props[key]["amecop"]}</td>
					<td>{key}</td>
					<td>{villa.toFixed(2)}</td>
					<td>{sanpedro.toFixed(2)}</td>
					<td>{arcos.toFixed(2)}</td>
					<td>{empaques.toFixed(2)}</td>
					<td>{villajuarez.toFixed(2)}</td>
					<td>{huertos.toFixed(2)}</td>
					<td>{torres.toFixed(2)}</td>
				</tr>
			);
		});
		return (
				<tbody className="ContenidoTabla">
					{rows}

					<tr>
						<td>TOTALES</td>
						<td>{totales["villa"].toFixed(2)}</td>
						<td>{totales["sanpedro"].toFixed(2)}</td>
						<td>{totales["arcos"].toFixed(2)}</td>
						<td>{totales["empaques"].toFixed(2)}</td>
						<td>{totales["villajuarez"].toFixed(2)}</td>
						<td>{totales["huertos"].toFixed(2)}</td>
						<td>{totales["torres"].toFixed(2)}</td>
					</tr>
				</tbody>
			);
	}
}

export default ContenidoTabla;
