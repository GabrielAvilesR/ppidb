import React from 'react';
import * as api from '../api';

import ContenidoTabla from './ContenidoTabla';

class ReporteInventarioSector extends React.Component {
	state = {
			articulos:{}
	};

	sortArray(array){
		let keys = [];
		Object.keys(array).map(key => {
			keys.push(key);
		});
		keys.sort();
		let resArray = {};
		keys.forEach(key => {
			resArray[key] = array[key];
		});
		return resArray;
	}

	componentDidMount() {
		api.reporteInventarioSectorFarmacia("villa")
				.then(farmacia => {
					let articulos = this.state.articulos;
					farmacia.forEach(producto => {
						if(!articulos[producto["sector"]]){
							articulos[producto["sector"]] = {};
						}if(!articulos[producto["sector"]]["sector"]){
							articulos[producto["sector"]]["sector"] = producto["sector"];
						}
						if(!articulos[producto["sector"]]["amecop"]){
							articulos[producto["sector"]]["amecop"] = producto["amecop"];
						}
						articulos[producto["sector"]]["villa"] = producto["inventario"];
					});
					articulos = this.sortArray(articulos);
					this.setState({articulos});
					api.reporteInventarioSectorFarmacia("sanpedro")
						.then(farmacia => {
							let articulos = this.state.articulos;
							farmacia.forEach(producto => {
								if(!articulos[producto["sector"]]){
									articulos[producto["sector"]] = {};
								}if(!articulos[producto["sector"]]["sector"]){
									articulos[producto["sector"]]["sector"] = producto["sector"];
								}
								if(!articulos[producto["sector"]]["amecop"]){
									articulos[producto["sector"]]["amecop"] = producto["amecop"];
								}
								articulos[producto["sector"]]["sanpedro"] = producto["inventario"];
							});
							articulos = this.sortArray(articulos);
							this.setState({articulos});
							api.reporteInventarioSectorFarmacia("arcos")
								.then(farmacia => {
									let articulos = this.state.articulos;
									farmacia.forEach(producto => {
										if(!articulos[producto["sector"]]){
											articulos[producto["sector"]] = {};
										}if(!articulos[producto["sector"]]["sector"]){
											articulos[producto["sector"]]["sector"] = producto["sector"];
										}
										if(!articulos[producto["sector"]]["amecop"]){
											articulos[producto["sector"]]["amecop"] = producto["amecop"];
										}
										articulos[producto["sector"]]["arcos"] = producto["inventario"];
									});
									articulos = this.sortArray(articulos);
									this.setState({articulos});
									api.reporteInventarioSectorFarmacia("empaques")
									.then(farmacia => {
										let articulos = this.state.articulos;
										farmacia.forEach(producto => {
											if(!articulos[producto["sector"]]){
												articulos[producto["sector"]] = {};
											}if(!articulos[producto["sector"]]["sector"]){
												articulos[producto["sector"]]["sector"] = producto["sector"];
											}
											if(!articulos[producto["sector"]]["amecop"]){
												articulos[producto["sector"]]["amecop"] = producto["amecop"];
											}
											articulos[producto["sector"]]["empaques"] = producto["inventario"];
										});
										articulos = this.sortArray(articulos);
										this.setState({articulos});
										api.reporteInventarioSectorFarmacia("villajuarez")
										.then(farmacia => {
											let articulos = this.state.articulos;
											farmacia.forEach(producto => {
												if(!articulos[producto["sector"]]){
													articulos[producto["sector"]] = {};
												}if(!articulos[producto["sector"]]["sector"]){
													articulos[producto["sector"]]["sector"] = producto["sector"];
												}
												if(!articulos[producto["sector"]]["amecop"]){
													articulos[producto["sector"]]["amecop"] = producto["amecop"];
												}
												articulos[producto["sector"]]["villajuarez"] = producto["inventario"];
											});
											articulos = this.sortArray(articulos);
											this.setState({articulos});
											api.reporteInventarioSectorFarmacia("huertos")
											.then(farmacia => {
												let articulos = this.state.articulos;
												farmacia.forEach(producto => {
													if(!articulos[producto["sector"]]){
														articulos[producto["sector"]] = {};
													}if(!articulos[producto["sector"]]["sector"]){
														articulos[producto["sector"]]["sector"] = producto["sector"];
													}
													if(!articulos[producto["sector"]]["amecop"]){
														articulos[producto["sector"]]["amecop"] = producto["amecop"];
													}
													articulos[producto["sector"]]["huertos"] = producto["inventario"];
												});
												articulos = this.sortArray(articulos);
												this.setState({articulos});
												api.reporteInventarioSectorFarmacia("torres")
												.then(farmacia => {
													let articulos = this.state.articulos;
													farmacia.forEach(producto => {
														if(!articulos[producto["sector"]]){
															articulos[producto["sector"]] = {};
														}if(!articulos[producto["sector"]]["sector"]){
															articulos[producto["sector"]]["sector"] = producto["sector"];
														}
														if(!articulos[producto["sector"]]["amecop"]){
															articulos[producto["sector"]]["amecop"] = producto["amecop"];
														}
														articulos[producto["sector"]]["torres"] = producto["inventario"];
													});
													articulos = this.sortArray(articulos);
													this.setState({articulos});
												})
												.catch(err => console.log(err));
											})
											.catch(err => console.log(err));
										})
										.catch(err => console.log(err));
									})
									.catch(err => console.log(err));
								})
								.catch(err => console.log(err));
						})
						.catch(err => console.log(err));
				}).catch(err => console.log(err));

	}


	render() {
		return (
        <div className="container content">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <h1 className="text-center">Reporte de Inventario por Sector </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="tabla">
                <table className="table table-bordered">
                  <thead>
										<tr>
											<th>cSector</th>
	                    <th>Sector</th>
	                    <th>Villa Colonial</th>
	                    <th>San Pedro</th>
	                    <th>Arcos</th>
	                    <th>Empaques</th>
	                    <th>Villa Juarez</th>
	                    <th>Huertos</th>
	                    <th>Torres</th>
										</tr>
                  </thead>
                  <ContenidoTabla {...this.state.articulos}/>
                </table>
              </div>
            </div>
          </div>
					<div className="row">
						<div className="col-md-2 col-md-offset-10">
							<form className="form-horizontal" method="post" target="_blank" action="/maestro/inventarioSector/descargarTabla">
								 <div className="form-group">
										<input type="hidden" name="data" value={JSON.stringify(this.state.articulos)} />
									</div>
									<div className="form-group">
										<button type="submit" className="btn btn-default">Descargar Reporte</button>
									</div>
							</form>
						</div>
					</div>
        </div>
			);
	}
}

export default ReporteInventarioSector;
