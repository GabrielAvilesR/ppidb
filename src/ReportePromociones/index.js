import React from 'react';
import * as api from '../api';

import ArticulosOption from './articulosOption.js';
import FarmaciaTabla from './farmaciaTabla';

class ReportePromociones extends React.Component {
	state = {
		articulos:[],
		villa:[], sanpedro:[], arcos:[], empaques:[],villajuarez:[], huertos:[], torres:[]
	}


	componentDidMount(){
		api.reportePromocionesArticulos()
			.then(articulos => {
				articulos.sort();
				if(articulos) this.setState({articulos});
			})
			.catch();

			if(doReport){
					api.reportePromocionesConsulta(JSON.stringify(reporte),"villa")
						.then(resultado => {
							let prearray = [];
							let tmp;
							for(let i = 0; i < reporte.length -1; i++){
								tmp = {};
								tmp["nombre"] = reporte[i]["producto"];
								tmp["cantidad"] = 0;
								prearray.push(tmp);
							}
							let res;
							let index;
							for(let i = 0; i < resultado.length; i++){
								if(resultado[i]["piezas"] <= 0) continue;
								index = reporte.map(o => o.producto).indexOf(resultado[i]["nombre"]);
								res = Math.floor(resultado[i]["piezas"] / reporte[index]["number"]);
								index = prearray.map(o => o.nombre).indexOf(resultado[i]["nombre"]);
								prearray[index]["cantidad"] += res;
							}
							this.setState({villa:prearray});
						}).catch(err => console.log(err));
					api.reportePromocionesConsulta(JSON.stringify(reporte),"sanpedro")
							.then(resultado => {
								let prearray = [];
								let tmp;
								for(let i = 0; i < reporte.length -1; i++){
									tmp = {};
									tmp["nombre"] = reporte[i]["producto"];
									tmp["cantidad"] = 0;
									prearray.push(tmp);
								}
								let res;
								let index;
								for(let i = 0; i < resultado.length; i++){
									if(resultado[i]["piezas"] <= 0) continue;
									index = reporte.map(o => o.producto).indexOf(resultado[i]["nombre"]);

									res = Math.floor(resultado[i]["piezas"] / reporte[index]["number"]);
									index = prearray.map(o => o.nombre).indexOf(resultado[i]["nombre"]);
									prearray[index]["cantidad"] += res;
								}
								this.setState({sanpedro:prearray});
							}).catch(err => console.log(err));
					api.reportePromocionesConsulta(JSON.stringify(reporte),"empaques")
									.then(resultado => {
										let prearray = [];
										let tmp;
										for(let i = 0; i < reporte.length -1; i++){
											tmp = {};
											tmp["nombre"] = reporte[i]["producto"];
											tmp["cantidad"] = 0;
											prearray.push(tmp);
										}
										let res;
										let index;
										for(let i = 0; i < resultado.length; i++){
											if(resultado[i]["piezas"] <= 0) continue;
											index = reporte.map(o => o.producto).indexOf(resultado[i]["nombre"]);

											res = Math.floor(resultado[i]["piezas"] / reporte[index]["number"]);
											index = prearray.map(o => o.nombre).indexOf(resultado[i]["nombre"]);
											prearray[index]["cantidad"] += res;
										}
										this.setState({empaques:prearray});
									}).catch(err => console.log(err));
					api.reportePromocionesConsulta(JSON.stringify(reporte),"arcos")
									.then(resultado => {
										let prearray = [];
										let tmp;
										for(let i = 0; i < reporte.length -1; i++){
											tmp = {};
											tmp["nombre"] = reporte[i]["producto"];
											tmp["cantidad"] = 0;
											prearray.push(tmp);
										}
										let res;
										let index;
										for(let i = 0; i < resultado.length; i++){
											if(resultado[i]["piezas"] <= 0) continue;
											index = reporte.map(o => o.producto).indexOf(resultado[i]["nombre"]);

											res = Math.floor(resultado[i]["piezas"] / reporte[index]["number"]);
											index = prearray.map(o => o.nombre).indexOf(resultado[i]["nombre"]);
											prearray[index]["cantidad"] += res;
										}
										this.setState({arcos:prearray});
									}).catch(err => console.log(err));
					api.reportePromocionesConsulta(JSON.stringify(reporte),"villajuarez")
						.then(resultado => {
							let prearray = [];
							let tmp;
							for(let i = 0; i < reporte.length -1; i++){
								tmp = {};
								tmp["nombre"] = reporte[i]["producto"];
								tmp["cantidad"] = 0;
								prearray.push(tmp);
							}
							let res;
							let index;
							for(let i = 0; i < resultado.length; i++){
								if(resultado[i]["piezas"] <= 0) continue;
								index = reporte.map(o => o.producto).indexOf(resultado[i]["nombre"]);
								res = Math.floor(resultado[i]["piezas"] / reporte[index]["number"]);
								index = prearray.map(o => o.nombre).indexOf(resultado[i]["nombre"]);
								prearray[index]["cantidad"] += res;
							}
							this.setState({villajuarez:prearray});
						}).catch(err => console.log(err));
					api.reportePromocionesConsulta(JSON.stringify(reporte),"huertos")
						.then(resultado => {
							let prearray = [];
							let tmp;
							for(let i = 0; i < reporte.length -1; i++){
								tmp = {};
								tmp["nombre"] = reporte[i]["producto"];
								tmp["cantidad"] = 0;
								prearray.push(tmp);
							}
							let res;
							let index;
							for(let i = 0; i < resultado.length; i++){
								if(resultado[i]["piezas"] <= 0) continue;
								index = reporte.map(o => o.producto).indexOf(resultado[i]["nombre"]);
								res = Math.floor(resultado[i]["piezas"] / reporte[index]["number"]);
								index = prearray.map(o => o.nombre).indexOf(resultado[i]["nombre"]);
								prearray[index]["cantidad"] += res;
							}
							this.setState({huertos:prearray});
						}).catch(err => console.log(err));
					api.reportePromocionesConsulta(JSON.stringify(reporte),"torres")
						.then(resultado => {
							let prearray = [];
							let tmp;
							for(let i = 0; i < reporte.length -1; i++){
								tmp = {};
								tmp["nombre"] = reporte[i]["producto"];
								tmp["cantidad"] = 0;
								prearray.push(tmp);
							}
							let res;
							let index;
							for(let i = 0; i < resultado.length; i++){
								if(resultado[i]["piezas"] <= 0) continue;
								index = reporte.map(o => o.producto).indexOf(resultado[i]["nombre"]);
								res = Math.floor(resultado[i]["piezas"] / reporte[index]["number"]);
								index = prearray.map(o => o.nombre).indexOf(resultado[i]["nombre"]);
								prearray[index]["cantidad"] += res;
							}
							this.setState({torres:prearray});
						}).catch(err => console.log(err));
			}
	}
	render(){
		return(
			<div className="ReportePromociones">
				<nav className="navbar navbar-default">
					  <div className="container-fluid">
					    <div className="navbar-header">
					      <button type="submit" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
					        <span className="sr-only">Toggle navigation</span>
					        <span className="icon-bar"></span>
					        <span className="icon-bar"></span>
					        <span className="icon-bar"></span>
					      </button>
					      <a className="navbar-brand" href="/">PPI</a>
					    </div>

					    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					      <ul className="nav navbar-nav" role="tablist">
					        <li className="active"><a href="#">Reporte de Promociones <span className="sr-only">(current)</span></a></li>
					      </ul>
					      <ul className="nav navbar-nav navbar-right">
					        <li><a href="/logout">Cerrar Sesión</a></li>
					      </ul>
					    </div>
					  </div>
					</nav>

					<div className="container content">
						<div className="row">
							<h1 className="text-center"> Reporte de Promociones </h1>
							<div className="col-md-6">
								<h4>Informacion de articulos para agregar al reporte </h4> <br/> <br/>
								<form id="reportePromocionesForm" className="form-horizontal" method="post" action="/inventario">
								<div className="form-group">
									<input type="hidden" id="articulosJSON" name="articulosJSON" value="nada"/>
								</div>
									<div className="form-group">
										<label>Seleccionar Producto:
										<input list="articulos" id="articuloSelect" className="form-control" /></label>
										<datalist id="articulos">
											{Object.keys(this.state.articulos).map(key =>
												<ArticulosOption key={key} {...this.state.articulos[key]} />
											)}
										</datalist>
									</div>
									<div className="form-group">
										<label> Cantidad:
										<input type="number" id="number" className="form-control datepickers" min ="1" step="1"/></label>
									</div>
									<div className="form-group">
										<label> Fecha de Inicio:
										<input type="text" id="datepickerFrom" readOnly className="form-control datepickers"/></label>
									</div>
									<div className="form-group">
										<label> Fecha Final:
										<input type="text" id="datepickerTo" readOnly className="form-control datepickers"/></label>
									</div>

									<div className="form-group">
										<button type="button" className="form-control buttons" id="addProduct"> Agregar </button>
									</div>
									<div className="form-group">
										<button type="button" className="form-control buttons" id="reporte"> Hacer Reporte </button>
									</div>

								</form>
							</div>
							<div className="col-md-6">
								<h4>Elementos que se buscaran en el reporte</h4>
								<h8>Doble click para borrar uno</h8>
								<br/>
								<div className="articuloTable">
									<table id="articulosSeleccionados" className="table table-hover text-center">
										<thead>
											<tr>
												<th>Nombre del Producto</th>
												<th>  #  </th>
											</tr>
										</thead>
									</table>
								</div>
							</div>
						</div>
						<div id ="reportePromocionesTable" style={{display:"none"}} className="row">
							<h1 className="text-center"> Resultado del Reporte </h1>
					        <div>
					          <ul className="nav nav-tabs" role="tablist">
					            <li role="presentation" className="active"><a href="#villa" aria-controls="villa" role="tab" data-toggle="tab">Villa Colonial</a></li>
					            <li role="presentation"><a href="#sanpedro" aria-controls="sanpedro" role="tab" data-toggle="tab">San Pedro</a></li>
					            <li role="presentation"><a href="#arcos" aria-controls="arcos" role="tab" data-toggle="tab">Arcos</a></li>
					            <li role="presentation"><a href="#empaques" aria-controls="empaques" role="tab" data-toggle="tab">Empaques</a></li>
					            <li role="presentation"><a href="#vjuarez" aria-controls="vjuarez" role="tab" data-toggle="tab">Villa Juarez</a></li>
					            <li role="presentation"><a href="#huertos" aria-controls="huertos" role="tab" data-toggle="tab">Huertos</a></li>
					            <li role="presentation"><a href="#torres" aria-controls="torres" role="tab" data-toggle="tab">Torres</a></li>
					          	</ul>

					          <div className="tab-content">
					            <div role="tabpanel" className="tab-pane active" id="villa">
					              <div className="row">
					                <div className="col-md-12">
					                  <div className="promoTable">
					                    <table className="table table-bordered text-center">
					                      <thead>
					                        <tr>
					                          <th>Producto</th>
					                          <th>Numero de Promociones</th>
					                        </tr>
					                      </thead>
																<FarmaciaTabla {...this.state.villa} />
					                    </table>
					                  </div>
					                </div>
					              </div>
					            </div>
					            <div role="tabpanel" className="tab-pane" id="sanpedro">
					              <div className="row">
					                <div className="col-md-12">
					                  <div className="promoTable">
					                    <table className="table table-bordered text-center">
					                      <thead>
					                        <tr>
					                          <th>Producto</th>
					                          <th>Numero de Promociones</th>
					                        </tr>
					                      </thead>
																<FarmaciaTabla {...this.state.sanpedro} />
					                    </table>
					                  </div>
					                </div>
					              </div>
					            </div>
					            <div role="tabpanel" className="tab-pane" id="arcos">
					              <div className="row">
					                <div className="col-md-12">
					                  <div className="promoTable">
					                    <table className="table table-bordered text-center">
					                      <thead>
					                        <tr>
					                          <th>Producto</th>
					                          <th>Numero de Promociones</th>
					                        </tr>
					                      </thead>
																<FarmaciaTabla {...this.state.arcos} />
					                    </table>
					                  </div>
					                </div>
					              </div>
					            </div>
					            <div role="tabpanel" className="tab-pane" id="empaques">
					              <div className="row">
					                <div className="col-md-12">
					                  <div className="promoTable">
					                    <table className="table table-bordered text-center">
					                      <thead>
					                        <tr>
					                          <th>Producto</th>
					                          <th>Numero de Promociones</th>
					                        </tr>
					                      </thead>
																<FarmaciaTabla {...this.state.empaques} />
					                    </table>
					                  </div>
					                </div>
					              </div>
					            </div>
					            <div role="tabpanel" className="tab-pane" id="vjuarez">
					              <div className="row">
					                <div className="col-md-12">
					                  <div className="promoTable">
					                    <table className="table table-bordered text-center">
					                      <thead>
					                        <tr>
					                          <th>Producto</th>
					                          <th>Numero de Promociones</th>
					                        </tr>
					                      </thead>
																<FarmaciaTabla {...this.state.villajuarez} />
					                    </table>
					                  </div>
					                </div>
					              </div>
					            </div>
					            <div role="tabpanel" className="tab-pane" id="huertos">
					              <div className="row">
					                <div className="col-md-12">
					                  <div className="promoTable">
					                    <table className="table table-bordered text-center">
					                      <thead>
					                        <tr>
					                          <th>Producto</th>
					                          <th>Numero de Promociones</th>
					                        </tr>
					                      </thead>
																<FarmaciaTabla {...this.state.huertos} />
					                    </table>
					                  </div>
					                </div>
					              </div>
					            </div>
					            <div role="tabpanel" className="tab-pane" id="torres">
					              <div className="row">
					                <div className="col-md-12">
					                  <div className="promoTable">
					                    <table className="table table-bordered text-center">
					                      <thead>
					                        <tr>
					                          <th>Producto</th>
					                          <th>Numero de Promociones</th>
					                        </tr>
					                      </thead>
																<FarmaciaTabla {...this.state.torres} />
					                    </table>
					                  </div>
					                </div>
					              </div>
					            </div>
					          </div>
										<div className="col-md-3 col-md-offset-9">
											<form className="form-horizontal" method="post" target="_blank" action="/inventario/descargarPromociones">
												 <div className="form-group">
														<input type="hidden" name="data" value={JSON.stringify({villa:this.state.villa,sanpedro:this.state.sanpedro,arcos:this.state.arcos,
						                      	empaques:this.state.empaques,villajuarez:this.state.villajuarez,huertos:this.state.huertos,torres:this.state.torres})} />
													</div>
													<div className="form-group">
														<button type="submit" className="btn btn-default">Descargar Reporte</button>
													</div>
											</form>
										</div>
					        </div>
						</div>
					</div>
			</div>
			);
	}
}

export default ReportePromociones;
