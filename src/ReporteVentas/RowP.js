import React from 'react';

class RowP extends React.Component {
	render(){
		let publico = this.props["importe"] * (1 - this.props["descuento"]) * (1 + this.props["iva"]);
		let n = this.props["mesAnterior"] / publico;
		let descuento, iva;
		descuento = this.props["descuento"] !== 0 ? n * (this.props["importe"] * this.props["descuento"]):0;
		iva = this.props["iva"] !== 0 ? n * (this.props["importe"] * (1 - this.props["descuento"]) * this.props["iva"]): 0;
		let importe = n * this.props["importe"];
		return(
			<tr>
				<td>{this.props["amecop"]}</td>
				<td>{this.props["nombre"]}</td>
				<td>{this.props["cSector"]}</td>
				<td>{this.props["sectorN"]}</td>
				<td>{this.props["piezas"]} </td>
				<td>{importe.toFixed(2)}</td>
				<td>{iva.toFixed(2)}</td>
				<td>{descuento.toFixed(2)}</td>
				<td>{this.props["mesAnterior"].toFixed(2)}</td>
			</tr>

		);
	}
}


export default RowP;
