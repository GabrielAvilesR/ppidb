import React from 'react';

class TablaTotalAnterior extends React.Component {
	render() {
		let totales = [
			{"importe":0, "iva":0, "descuento":0, "total":0},
			{"importe":0, "iva":0, "descuento":0, "total":0},
			{"importe":0, "iva":0, "descuento":0, "total":0},
			{"importe":0, "iva":0, "descuento":0, "total":0},
			{"importe":0, "iva":0, "descuento":0, "total":0},
			{"importe":0, "iva":0, "descuento":0, "total":0},
			{"importe":0, "iva":0, "descuento":0, "total":0}
		],
		totalTotales = {"importe":0, "iva":0, "descuento":0, "total":0};
		let iva, publico, descuento, n, importe;
		for(let i = 0; i < 7; i++){
			Object.keys(this.props[i]).map(key => {
				publico = this.props[i][key]["importe"] * (1 - this.props[i][key]["descuento"]) * (1 + this.props[i][key]["iva"]);
				n = this.props[i][key]["mesAnterior"] / publico;
				descuento = this.props[i][key]["descuento"] !== 0 ? n * (this.props[i][key]["importe"] * this.props[i][key]["descuento"]):0;
				iva = this.props[i][key]["iva"] !== 0 ? n * (this.props[i][key]["importe"] * (1 - this.props[i][key]["descuento"]) * this.props[i][key]["iva"]): 0;
				importe = n * this.props[i][key]["importe"];
				totales[i]["importe"] += importe;
				totalTotales["importe"] += importe;
				totales[i]["iva"] += iva;
				totalTotales["iva"] += iva;
				totales[i]["descuento"] += descuento;
				totalTotales["descuento"] +=descuento;
				totales[i]["total"] += this.props[i][key]["mesAnterior"];
				totalTotales["total"] += this.props[i][key]["mesAnterior"];
			});
		}
		
		return (
				<tbody>
					<tr>
						<td> Villa colonial </td>
						<td> {totales[0]["importe"].toFixed(2)} </td>
						<td> {totales[0]["iva"].toFixed(2)} </td>
						<td> {totales[0]["descuento"].toFixed(2)} </td>
						<td> {totales[0]["total"].toFixed(2)} </td>
					</tr>
					<tr>
						<td> San Pedro </td>
						<td> {totales[1]["importe"].toFixed(2)} </td>
						<td> {totales[1]["iva"].toFixed(2)} </td>
						<td> {totales[1]["descuento"].toFixed(2)} </td>
						<td> {totales[1]["total"].toFixed(2)} </td>
					</tr>
					<tr>
						<td> Arcos </td>
						<td> {totales[2]["importe"].toFixed(2)} </td>
						<td> {totales[2]["iva"].toFixed(2)} </td>
						<td> {totales[2]["descuento"].toFixed(2)} </td>
						<td> {totales[2]["total"].toFixed(2)} </td>
					</tr>
					<tr>
						<td> Empaques </td>
						<td> {totales[3]["importe"].toFixed(2)} </td>
						<td> {totales[3]["iva"].toFixed(2)} </td>
						<td> {totales[3]["descuento"].toFixed(2)} </td>
						<td> {totales[3]["total"].toFixed(2)} </td>
					</tr>
					<tr>
						<td> Villa Juarez </td>
						<td> {totales[4]["importe"].toFixed(2)} </td>
						<td> {totales[4]["iva"].toFixed(2)} </td>
						<td> {totales[4]["descuento"].toFixed(2)} </td>
						<td> {totales[4]["total"].toFixed(2)} </td>
					</tr>
					<tr>
						<td> Huertos </td>
						<td> {totales[5]["importe"].toFixed(2)} </td>
						<td> {totales[5]["iva"].toFixed(2)} </td>
						<td> {totales[5]["descuento"].toFixed(2)} </td>
						<td> {totales[5]["total"].toFixed(2)} </td>
					</tr>
					<tr>
						<td> Torres </td>
						<td> {totales[6]["importe"].toFixed(2)} </td>
						<td> {totales[6]["iva"].toFixed(2)} </td>
						<td> {totales[6]["descuento"].toFixed(2)} </td>
						<td> {totales[6]["total"].toFixed(2)} </td>
					</tr>
					<tr>
						<td> TOTAL </td>
						<td> {totalTotales["importe"].toFixed(2)} </td>
						<td> {totalTotales["iva"].toFixed(2)} </td>
						<td> {totalTotales["descuento"].toFixed(2)} </td>
						<td> {totalTotales["total"].toFixed(2)} </td>
					</tr>
				</tbody>
			);
	}
}

export default TablaTotalAnterior;