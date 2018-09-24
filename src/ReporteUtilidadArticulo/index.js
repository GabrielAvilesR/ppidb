import React from 'react';
import * as api from '../api';

import ContenidoTabla from './ContenidoTabla';

class ReporteUtilidadArticulo extends React.Component {
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
		api.reporteUtilidadArticuloFarmacia("villa")
				.then(farmacia => {
					let articulos = this.state.articulos;
					farmacia.forEach(producto => {
						if(!articulos[producto["nombre"]]){
							articulos[producto["nombre"]] = {};
						}
						if(!articulos[producto["nombre"]]["sector"]){
							articulos[producto["nombre"]]["sector"] = producto["sector"];
						}
						if(!articulos[producto["nombre"]]["amecop"]){
							articulos[producto["nombre"]]["amecop"] = producto["amecop"];
						}
						articulos[producto["nombre"]]["villa"] = producto["utilidad"];
					});
					articulos = this.sortArray(articulos);
					this.setState({articulos});
					api.reporteUtilidadArticuloFarmacia("sanpedro")
						.then(farmacia => {
							let articulos = this.state.articulos;
							farmacia.forEach(producto => {
								if(!articulos[producto["nombre"]]){
									articulos[producto["nombre"]] = {};
								}
								if(!articulos[producto["nombre"]]["sector"]){
									articulos[producto["nombre"]]["sector"] = producto["sector"];
								}
								if(!articulos[producto["nombre"]]["amecop"]){
									articulos[producto["nombre"]]["amecop"] = producto["amecop"];
								}
								articulos[producto["nombre"]]["sanpedro"] = producto["utilidad"];
							});
							articulos = this.sortArray(articulos);
							this.setState({articulos});
							api.reporteUtilidadArticuloFarmacia("arcos")
								.then(farmacia => {
									let articulos = this.state.articulos;
									farmacia.forEach(producto => {
										if(!articulos[producto["nombre"]]){
											articulos[producto["nombre"]] = {};
										}
										if(!articulos[producto["nombre"]]["sector"]){
											articulos[producto["nombre"]]["sector"] = producto["sector"];
										}
										if(!articulos[producto["nombre"]]["amecop"]){
											articulos[producto["nombre"]]["amecop"] = producto["amecop"];
										}
										articulos[producto["nombre"]]["arcos"] = producto["utilidad"];
									});
									articulos = this.sortArray(articulos);
									this.setState({articulos});
									api.reporteUtilidadArticuloFarmacia("empaques")
									.then(farmacia => {
										let articulos = this.state.articulos;
										farmacia.forEach(producto => {
											if(!articulos[producto["nombre"]]){
												articulos[producto["nombre"]] = {};
											}
											if(!articulos[producto["nombre"]]["sector"]){
												articulos[producto["nombre"]]["sector"] = producto["sector"];
											}
											if(!articulos[producto["nombre"]]["amecop"]){
												articulos[producto["nombre"]]["amecop"] = producto["amecop"];
											}
											articulos[producto["nombre"]]["empaques"] = producto["utilidad"];
										});
										articulos = this.sortArray(articulos);
										this.setState({articulos});
										api.reporteUtilidadArticuloFarmacia("villajuarez")
										.then(farmacia => {
											let articulos = this.state.articulos;
											farmacia.forEach(producto => {
												if(!articulos[producto["nombre"]]){
													articulos[producto["nombre"]] = {};
												}
												if(!articulos[producto["nombre"]]["sector"]){
													articulos[producto["nombre"]]["sector"] = producto["sector"];
												}
												if(!articulos[producto["nombre"]]["amecop"]){
													articulos[producto["nombre"]]["amecop"] = producto["amecop"];
												}
												articulos[producto["nombre"]]["villajuarez"] = producto["utilidad"];
											});
											articulos = this.sortArray(articulos);
											this.setState({articulos});
											api.reporteUtilidadArticuloFarmacia("huertos")
											.then(farmacia => {
												let articulos = this.state.articulos;
												farmacia.forEach(producto => {
													if(!articulos[producto["nombre"]]){
														articulos[producto["nombre"]] = {};
													}
													if(!articulos[producto["nombre"]]["sector"]){
														articulos[producto["nombre"]]["sector"] = producto["sector"];
													}
													if(!articulos[producto["nombre"]]["amecop"]){
														articulos[producto["nombre"]]["amecop"] = producto["amecop"];
													}
													articulos[producto["nombre"]]["huertos"] = producto["utilidad"];
												});
												articulos = this.sortArray(articulos);
												this.setState({articulos});
												api.reporteUtilidadArticuloFarmacia("torres")
												.then(farmacia => {
													let articulos = this.state.articulos;
													farmacia.forEach(producto => {
														if(!articulos[producto["nombre"]]){
															articulos[producto["nombre"]] = {};
														}
														if(!articulos[producto["nombre"]]["sector"]){
															articulos[producto["nombre"]]["sector"] = producto["sector"];
														}
														if(!articulos[producto["nombre"]]["amecop"]){
															articulos[producto["nombre"]]["amecop"] = producto["amecop"];
														}
														articulos[producto["nombre"]]["torres"] = producto["utilidad"];
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
              <h1 className="text-center">Reporte de Utilidad por Articulo</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="tabla">
                <table className="table table-bordered">
                  <thead>
										<tr>
											<th>Sector</th>
											<th>Amecop</th>
	                    <th>Producto</th>
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
							<form className="form-horizontal" method="post" target="_blank" action="/maestro/utilidadArticulo/descargarTabla">
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

export default ReporteUtilidadArticulo;
