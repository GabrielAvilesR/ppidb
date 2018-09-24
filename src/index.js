import React from 'react';
import ReactDom from 'react-dom';

import ReporteVentas from './ReporteVentas';
import CapturaGastos from './CapturaGastos';

import HistorialReporteVentas from './HistorialReporteVentas';
import ReportePromociones from './ReportePromociones';
import ReporteRecargas from './ReporteRecargas';

import ReporteVentasArticulos from './ReporteVentasArticulos';
import ReporteVentasSector from './ReporteVentasSector';
import ReporteInventarioArticulo from './ReporteInventarioArticulo';
import ReporteInventarioSector from './ReporteInventarioSector';
import ReporteUtilidadArticulo from './ReporteUtilidadArticulo';
import ReporteUtilidadSector from './ReporteUtilidadSector';

//general
//reporteVentas
try{
	ReactDom.render(
	<ReporteVentas />,
	document.getElementById('reporteVentasRoot')
	);
}catch(err){
	//console.log(err);d
}

try{
	ReactDom.render(
	<CapturaGastos />,
	document.getElementById('generalCapturaGastosRoot')
	);
}catch(err){
	//console.log(err);d
}

//historial reporte ventas
/*try{
	ReactDom.render(
	<HistorialReporteVentas />,
	document.getElementById('reporteVentasHistorialRoot')
	);
}catch(err){
	//console.log(err);
}
*/
//inventario
//reportePromociones

try{
	ReactDom.render(
	<ReportePromociones />,
	document.getElementById('reportePromociones')
	);

}catch(err){
	//console.log(err);
}

//reporteRecargas  reporteRecargasRoot

try{
	ReactDom.render(
	<ReporteRecargas />,
	document.getElementById('reporteRecargasRoot')
	);

}catch(err){
	//console.log(err);
}

//maestro
//balance venta por articulos
try{
	ReactDom.render(
		<ReporteVentasArticulos />,
		document.getElementById('ReporteVentasArticuloRoot')
	);
}catch(err){

}

try{
	ReactDom.render(
		<ReporteVentasSector />,
		document.getElementById('ReporteVentasSectorRoot')
	);
}catch(err){

}

try{
	ReactDom.render(
		<ReporteInventarioArticulo />,
		document.getElementById('ReporteInventarioArticuloRoot')
	);
}catch(err){

}

try{
	ReactDom.render(
		<ReporteInventarioSector />,
		document.getElementById('ReporteInventarioSectorRoot')
	);
}catch(err){

}

try{
	ReactDom.render(
		<ReporteUtilidadArticulo />,
		document.getElementById('ReporteUtilidadArticuloRoot')
	);
}catch(err){

}

try{
	ReactDom.render(
		<ReporteUtilidadSector />,
		document.getElementById('ReporteUtilidadSectorRoot')
	);
}catch(err){

}
