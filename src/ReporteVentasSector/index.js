import React from 'react';
import * as api from '../api';

import ContenidoTabla from './ContenidoTabla';

class ReporteVentasSector extends React.Component {
	state = {
			sector:{}
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
		api.reporteVentasSectorFarmacia("villa")
				.then(farmacia => {
					let sector = this.state.sector;
					farmacia.forEach(producto => {
						if(!sector[producto["sector"]]){
							sector[producto["sector"]] = {};
						}
						if(!sector[producto["nombre"]]["sector"]){
							sector[producto["nombre"]]["sector"] = producto["sector"];
						}
						if(!sector[producto["nombre"]]["amecop"]){
							sector[producto["nombre"]]["amecop"] = producto["amecop"];
						}
						sector[producto["sector"]]["villa"] = producto["venta"];
					});
					sector = this.sortArray(sector);
					this.setState({sector});
					api.reporteVentasSectorFarmacia("sanpedro")
						.then(farmacia => {
							let sector = this.state.sector;
							farmacia.forEach(producto => {
								if(!sector[producto["sector"]]){
									sector[producto["sector"]] = {};
								}if(!sector[producto["nombre"]]["sector"]){
									sector[producto["nombre"]]["sector"] = producto["sector"];
								}
								if(!sector[producto["nombre"]]["amecop"]){
									sector[producto["nombre"]]["amecop"] = producto["amecop"];
								}
								sector[producto["sector"]]["sanpedro"] = producto["venta"];
							});
							sector = this.sortArray(sector);
							this.setState({sector});
							api.reporteVentasSectorFarmacia("arcos")
								.then(farmacia => {
									let sector = this.state.sector;
									farmacia.forEach(producto => {
										if(!sector[producto["sector"]]){
											sector[producto["sector"]] = {};
										}if(!sector[producto["nombre"]]["sector"]){
											sector[producto["nombre"]]["sector"] = producto["sector"];
										}
										if(!sector[producto["nombre"]]["amecop"]){
											sector[producto["nombre"]]["amecop"] = producto["amecop"];
										}
										sector[producto["sector"]]["arcos"] = producto["venta"];
									});
									sector = this.sortArray(sector);
									this.setState({sector});
									api.reporteVentasSectorFarmacia("empaques")
									.then(farmacia => {
										let sector = this.state.sector;
										farmacia.forEach(producto => {
											if(!sector[producto["sector"]]){
												sector[producto["sector"]] = {};
											}if(!sector[producto["nombre"]]["sector"]){
												sector[producto["nombre"]]["sector"] = producto["sector"];
											}
											if(!sector[producto["nombre"]]["amecop"]){
												sector[producto["nombre"]]["amecop"] = producto["amecop"];
											}
											sector[producto["sector"]]["empaques"] = producto["venta"];
										});
										sector = this.sortArray(sector);
										this.setState({sector});
										api.reporteVentasSectorFarmacia("villajuarez")
										.then(farmacia => {
											let sector = this.state.sector;
											farmacia.forEach(producto => {
												if(!sector[producto["sector"]]){
													sector[producto["sector"]] = {};
												}if(!sector[producto["nombre"]]["sector"]){
													sector[producto["nombre"]]["sector"] = producto["sector"];
												}
												if(!sector[producto["nombre"]]["amecop"]){
													sector[producto["nombre"]]["amecop"] = producto["amecop"];
												}
												sector[producto["sector"]]["villajuarez"] = producto["venta"];
											});
											sector = this.sortArray(sector);
											this.setState({sector});
											api.reporteVentasSectorFarmacia("huertos")
											.then(farmacia => {
												let sector = this.state.sector;
												farmacia.forEach(producto => {
													if(!sector[producto["sector"]]){
														sector[producto["sector"]] = {};
													}if(!sector[producto["nombre"]]["sector"]){
														sector[producto["nombre"]]["sector"] = producto["sector"];
													}
													if(!sector[producto["nombre"]]["amecop"]){
														sector[producto["nombre"]]["amecop"] = producto["amecop"];
													}
													sector[producto["sector"]]["huertos"] = producto["venta"];
												});
												sector = this.sortArray(sector);
												this.setState({sector});
												api.reporteVentasSectorFarmacia("torres")
												.then(farmacia => {
													let sector = this.state.sector;
													farmacia.forEach(producto => {
														if(!sector[producto["sector"]]){
															sector[producto["sector"]] = {};
														}if(!sector[producto["nombre"]]["sector"]){
															sector[producto["nombre"]]["sector"] = producto["sector"];
														}
														if(!sector[producto["nombre"]]["amecop"]){
															sector[producto["nombre"]]["amecop"] = producto["amecop"];
														}
														sector[producto["sector"]]["torres"] = producto["venta"];
													});
													sector = this.sortArray(sector);
													this.setState({sector});
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
              <h1 className="text-center">Reporte de Ventas por Sector </h1>
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
                  <ContenidoTabla {...this.state.sector}/>
                </table>
              </div>
            </div>
          </div>
					<div className="row">
						<div className="col-md-2 col-md-offset-10">
							<form className="form-horizontal" method="post" target="_blank" action="/maestro/ventaSector/descargarTabla">
								 <div className="form-group">
										<input type="hidden" name="data" value={JSON.stringify(this.state.sector)} />
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

export default ReporteVentasSector;
