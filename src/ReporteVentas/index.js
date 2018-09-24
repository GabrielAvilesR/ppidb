import React from 'react';
import * as api from '../api';
import FarmaciaTablaActual from './farmaciaTablaActual';
import FarmaciaTablaAnterior from './farmaciaTablaAnterior';
import TablaTotalAnterior from './tablaTotalAnterior';
import TablaTotalActual from './tablaTotalActual';

class ReporteVentas extends React.Component {
	state = {
		avilla:[],asanpedro:[],aarcos:[],aempaques:[],avillajuarez:[],ahuertos:[],atorres:[],
		pvilla:[],psanpedro:[],parcos:[],pempaques:[],pvillajuarez:[],phuertos:[],ptorres:[],
		progresoAnterior:"0%", progresoActual:"0%"
	};
	componentDidMount() {
		api.reporteVentasFarmacia("pvilla").then(farmacia => {
			if(farmacia) this.setState({pvilla:farmacia});
			this.setState({progresoAnterior: (1/7*100).toFixed(0) + "%"});
			api.reporteVentasFarmacia("psanpedro").then(farmacia => {
				if(farmacia) this.setState({psanpedro:farmacia});
				this.setState({progresoAnterior: (2/7*100).toFixed(0) + "%"});
				api.reporteVentasFarmacia("parcos").then(farmacia => {
					if(farmacia) this.setState({parcos:farmacia});
					this.setState({progresoAnterior: (3/7*100).toFixed(0) + "%"});
					api.reporteVentasFarmacia("pempaques").then(farmacia => {
						if(farmacia) this.setState({pempaques:farmacia});
						this.setState({progresoAnterior: (4/7*100).toFixed(0) + "%"});
						api.reporteVentasFarmacia("pvillajuarez").then(farmacia => {
							if(farmacia) this.setState({pvillajuarez:farmacia});
							this.setState({progresoAnterior: (5/7*100).toFixed(0) + "%"});
							api.reporteVentasFarmacia("phuertos").then(farmacia => {
								if(farmacia) this.setState({phuertos:farmacia});
								this.setState({progresoAnterior: (6/7*100).toFixed(0) + "%"});
								api.reporteVentasFarmacia("ptorres").then(farmacia => {
									if(farmacia) this.setState({ptorres:farmacia});
									this.setState({progresoAnterior: "Terminado"});
									api.reporteVentasFarmacia("avilla").then(farmacia => {
										if(farmacia) this.setState({avilla:farmacia});
										this.setState({progresoActual: (1/7*100).toFixed(0) + "%"});
										api.reporteVentasFarmacia("asanpedro").then(farmacia => {
											if(farmacia) this.setState({asanpedro:farmacia});
											this.setState({progresoActual: (2/7*100).toFixed(0) + "%"});
											api.reporteVentasFarmacia("aarcos").then(farmacia => {
												if(farmacia) this.setState({aarcos:farmacia});
												this.setState({progresoActual: (3/7*100).toFixed(0) + "%"});
												api.reporteVentasFarmacia("aempaques").then(farmacia => {
													if(farmacia) this.setState({aempaques:farmacia});
													this.setState({progresoActual: (4/7*100).toFixed(0) + "%"});
													api.reporteVentasFarmacia("avillajuarez").then(farmacia => {
														if(farmacia) this.setState({avillajuarez:farmacia});
														this.setState({progresoActual: (5/7*100).toFixed(0) + "%"});
														api.reporteVentasFarmacia("ahuertos").then(farmacia => {
															if(farmacia) this.setState({ahuertos:farmacia});
															this.setState({progresoActual: (6/7*100).toFixed(0) + "%"});
															api.reporteVentasFarmacia("atorres").then(farmacia => {
																if(farmacia) this.setState({atorres:farmacia});
																this.setState({progresoActual: "Terminado"});
															}).catch(err => console.log(err));
														}).catch(err => console.log(err));
													}).catch(err => console.log(err));
												}).catch(err => console.log(err));
											}).catch(err => console.log(err));
										}).catch(err => console.log(err));
									}).catch(err => console.log(err));
								}).catch(err => console.log(err));
							}).catch(err => console.log(err));
						}).catch(err => console.log(err));
					}).catch(err => console.log(err));
				}).catch(err => console.log(err));
			}).catch(err => console.log(err));
		}).catch(err => console.log(err));


	}
	render() {
		return (
			<div className="ReporteVentas">
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
					        <li className="dropdown">
					          <a href="#" className="dropdown-toggle active" data-toggle="dropdown" role="submit" aria-haspopup="true" aria-expanded="false">Reporte de Ventas<span className="caret"></span></a>
					          <ul className="dropdown-menu">
					            <li role="presentation"><a href="#previousMonth" aria-controls="home" role="tab" data-toggle="tab">Mes Anterior</a></li>
					            <li role="presentation"><a href="#actualMonth" aria-controls="home" role="tab" data-toggle="tab">Mes Actual</a></li>
					          </ul>
					        </li>
									<li><a href="/general/capturaGastos"> Captura de Gastos</a></li>
					      </ul>
					      <ul className="nav navbar-nav navbar-right">
					        <li><a href="/logout">Cerrar Sesión</a></li>
					      </ul>
					    </div>
					  </div>
					</nav>
					<div className="container content">
					  <div className="tab-content" id="reporteVentasRoot">
					      <div role="tabpanel" className="tab-pane active" id="previousMonth">
								<div className="row">
									<div className="col-md-8">
										<h1 className="text-center"> Reporte de Ventas del Mes Anterior </h1>
									</div>
									<div className="col-md-2">
										<h4 className="text-center"> Progreso: {this.state.progresoAnterior} </h4>
									</div>
								</div>
					      <div className="row">
					        <div>
					          <ul className="nav nav-tabs" role="tablist">
					            <li role="presentation" className="active"><a href="#pvilla" aria-controls="pvilla" role="tab" data-toggle="tab">Villa Colonial</a></li>
					            <li role="presentation"><a href="#psanpedro" aria-controls="psanpedro" role="tab" data-toggle="tab">San Pedro</a></li>
					            <li role="presentation"><a href="#parcos" aria-controls="parcos" role="tab" data-toggle="tab">Arcos</a></li>
					            <li role="presentation"><a href="#pempaques" aria-controls="pempaques" role="tab" data-toggle="tab">Empaques</a></li>
					            <li role="presentation"><a href="#pvjuarez" aria-controls="pvjuarez" role="tab" data-toggle="tab">Villa Juarez</a></li>
					            <li role="presentation"><a href="#phuertos" aria-controls="phuertos" role="tab" data-toggle="tab">Huertos</a></li>
					            <li role="presentation"><a href="#ptorres" aria-controls="ptorres" role="tab" data-toggle="tab">Torres</a></li>
					            <li role="presentation"><a href="#ptotales" aria-controls="ptotales" role="tab" data-toggle="tab">Totales</a></li>
					          </ul>

					          <div className="tab-content">
					            <div role="tabpanel" className="tab-pane active" id="pvilla">
					              <div className="row">
					                <div className="col-md-12">
					                  <div id="ventasTable">
					                    <table className="table table-bordered">
					                      <thead>
					                        <tr>
					                          <th>Amecop</th>
					                          <th>Nombre</th>
					                          <th>Sector</th>
					                          <th> nSector</th>
																		<th>Piezas </th>
					                          <th>Importe</th>
					                          <th>Iva</th>
					                          <th>Descuento</th>
					                          <th>Total</th>
					                        </tr>
					                      </thead>
					                      <FarmaciaTablaAnterior {...this.state.pvilla} />
					                    </table>
					                  </div>
					                </div>
					              </div>
					              <div className="row">
					                <div className="col-md-2 col-md-offset-8">
									  <form className="form-horizontal" method="post" target="_blank" action="/general/descargarVentaFarmacia">
									     <div className="form-group">
									        <input type="hidden" name="data" value={JSON.stringify(this.state.pvilla)}/>
									      </div>
									      <div className="form-group">
									        <input type="hidden" name="mes" value="previo"/>
									      </div>
									      <div className="form-group">
									        <button type="submit" className="btn btn-default">Descargar Farmacia</button>
									      </div>
									  </form>
									</div>
					              </div>
					            </div>
					            <div role="tabpanel" className="tab-pane" id="psanpedro">
					              <div className="row">
					                <div className="col-md-12">
					                  <div id="ventasTable">
					                    <table className="table table-bordered">
					                      <thead>
					                        <tr>
					                          <th>Amecop</th>
					                          <th>Nombre</th>
					                          <th>Sector</th>
					                          <th> nSector</th>
																		<th>Piezas </th>
					                          <th>Importe</th>
					                          <th>Iva</th>
					                          <th>Descuento</th>
					                          <th>Total</th>
					                        </tr>
					                      </thead>
					                      <FarmaciaTablaAnterior {...this.state.psanpedro} />
					                    </table>
					                  </div>
					                </div>
					              </div>
					              <div className="row">
					                <div className="col-md-2 col-md-offset-8">
									  <form className="form-horizontal" method="post" target="_blank" action="/general/descargarVentaFarmacia">
									     <div className="form-group">
									        <input type="hidden" name="data" value={JSON.stringify(this.state.psanpedro)}/>
									      </div>
									      <div className="form-group">
									        <input type="hidden" name="mes" value="previo"/>
									      </div>
									      <div className="form-group">
									        <button type="submit" className="btn btn-default">Descargar Farmacia</button>
									      </div>
									  </form>
									</div>

					              </div>
					            </div>
					            <div role="tabpanel" className="tab-pane" id="parcos">
					              <div className="row">
					                <div className="col-md-12">
					                  <div id="ventasTable">
					                    <table className="table table-bordered">
					                      <thead>
					                        <tr>
					                          <th>Amecop</th>
					                          <th>Nombre</th>
					                          <th>Sector</th>
					                          <th> nSector</th>
																		<th>Piezas </th>
					                          <th>Importe</th>
					                          <th>Iva</th>
					                          <th>Descuento</th>
					                          <th>Total</th>
					                        </tr>
					                      </thead>
					                      <FarmaciaTablaAnterior {...this.state.parcos} />
					                    </table>
					                  </div>
					                </div>
					              </div>
					              <div className="row">
					                <div className="col-md-2 col-md-offset-8">
									  <form className="form-horizontal" method="post" target="_blank" action="/general/descargarVentaFarmacia">
									     <div className="form-group">
									        <input type="hidden" name="data" value={JSON.stringify(this.state.parcos)}/>
									      </div>
									      <div className="form-group">
									        <input type="hidden" name="mes" value="previo"/>
									      </div>
									      <div className="form-group">
									        <button type="submit" className="btn btn-default">Descargar Farmacia</button>
									      </div>
									  </form>
									</div>

					              </div>
					            </div>
					            <div role="tabpanel" className="tab-pane" id="pempaques">
					              <div className="row">
					                <div className="col-md-12">
					                  <div id="ventasTable">
					                    <table className="table table-bordered">
					                      <thead>
					                        <tr>
					                          <th>Amecop</th>
					                          <th>Nombre</th>
					                          <th>Sector</th>
					                          <th> nSector</th>
																		<th>Piezas </th>
					                          <th>Importe</th>
					                          <th>Iva</th>
					                          <th>Descuento</th>
					                          <th>Total</th>
					                        </tr>
					                      </thead>
					                      <FarmaciaTablaAnterior {...this.state.pempaques} />
					                    </table>
					                  </div>
					                </div>
					              </div>
					              <div className="row">
					                <div className="col-md-2 col-md-offset-8">
									  <form className="form-horizontal" method="post" target="_blank" action="/general/descargarVentaFarmacia">
									     <div className="form-group">
									        <input type="hidden" name="data" value={JSON.stringify(this.state.pempaques)}/>
									      </div>
									      <div className="form-group">
									        <input type="hidden" name="mes" value="previo"/>
									      </div>
									      <div className="form-group">
									        <button type="submit" className="btn btn-default">Descargar Farmacia</button>
									      </div>
									  </form>
									</div>

					              </div>
					            </div>
					            <div role="tabpanel" className="tab-pane" id="pvjuarez">
					              <div className="row">
					                <div className="col-md-12">
					                  <div id="ventasTable">
					                    <table className="table table-bordered">
					                      <thead>
					                        <tr>
					                          <th>Amecop</th>
					                          <th>Nombre</th>
					                          <th>Sector</th>
					                          <th> nSector</th>
																		<th>Piezas </th>
					                          <th>Importe</th>
					                          <th>Iva</th>
					                          <th>Descuento</th>
					                          <th>Total</th>
					                        </tr>
					                      </thead>
					                      <FarmaciaTablaAnterior {...this.state.pvillajuarez} />
					                    </table>
					                  </div>
					                </div>
					              </div>
					              <div className="row">
					                <div className="col-md-2 col-md-offset-8">
									  <form className="form-horizontal" method="post" target="_blank" action="/general/descargarVentaFarmacia">
									     <div className="form-group">
									        <input type="hidden" name="data" value={JSON.stringify(this.state.pvillajuarez)}/>
									      </div>
									      <div className="form-group">
									        <input type="hidden" name="mes" value="previo"/>
									      </div>
									      <div className="form-group">
									        <button type="submit" className="btn btn-default">Descargar Farmacia</button>
									      </div>
									  </form>
									</div>

					              </div>
					            </div>
					            <div role="tabpanel" className="tab-pane" id="phuertos">
					              <div className="row">
					                <div className="col-md-12">
					                  <div id="ventasTable">
					                    <table className="table table-bordered">
					                      <thead>
					                        <tr>
					                          <th>Amecop</th>
					                          <th>Nombre</th>
					                          <th>Sector</th>
					                          <th> nSector</th>
																		<th>Piezas </th>
					                          <th>Importe</th>
					                          <th>Iva</th>
					                          <th>Descuento</th>
					                          <th>Total</th>
					                        </tr>
					                      </thead>
					                      <FarmaciaTablaAnterior {...this.state.phuertos} />
					                    </table>
					                  </div>
					                </div>
					              </div>
					              <div className="row">
					                <div className="col-md-2 col-md-offset-8">
									  <form className="form-horizontal" method="post" target="_blank" action="/general/descargarVentaFarmacia">
									     <div className="form-group">
									        <input type="hidden" name="data" value={JSON.stringify(this.state.phuertos)}/>
									      </div>
									      <div className="form-group">
									        <input type="hidden" name="mes" value="previo"/>
									      </div>
									      <div className="form-group">
									        <button type="submit" className="btn btn-default">Descargar Farmacia</button>
									      </div>
									  </form>
									</div>

					              </div>
					            </div>
					            <div role="tabpanel" className="tab-pane" id="ptorres">
					              <div className="row">
					                <div className="col-md-12">
					                  <div id="ventasTable">
					                    <table className="table table-bordered">
					                      <thead>
					                        <tr>
					                          <th>Amecop</th>
					                          <th>Nombre</th>
					                          <th>Sector</th>
					                          <th> nSector</th>
																		<th>Piezas </th>
					                          <th>Importe</th>
					                          <th>Iva</th>
					                          <th>Descuento</th>
					                          <th>Total</th>
					                        </tr>
					                      </thead>
					                      <FarmaciaTablaAnterior {...this.state.ptorres} />
					                    </table>
					                  </div>
					                </div>
					              </div>
					              <div className="row">
					                <div className="col-md-2 col-md-offset-8">
									  <form className="form-horizontal" method="post" target="_blank" action="/general/descargarVentaFarmacia">
									     <div className="form-group">
									        <input type="hidden" name="data" value={JSON.stringify(this.state.ptorres)}/>
									      </div>
									      <div className="form-group">
									        <input type="hidden" name="mes" value="previo"/>
									      </div>
									      <div className="form-group">
									        <button type="submit" className="btn btn-default">Descargar Farmacia</button>
									      </div>
									  </form>
									</div>

					              </div>
					            </div>
					            <div role="tabpanel" className="tab-pane" id="ptotales">
					              <div className="row">
					                <div className="col-md-12">
					                  <div className="totalTable">
					                    <table className="table table-bordered">
					                      <thead>
					                        <tr>
					                          <th>Farmacia</th>
					                          <th>Importe</th>
					                          <th>Iva</th>
					                          <th>Descuento</th>
					                          <th>Total</th>
					                        </tr>
					                      </thead>
					                      <TablaTotalAnterior {...[this.state.pvilla,this.state.psanpedro,this.state.parcos,
					                      	this.state.pempaques,this.state.pvillajuarez,this.state.phuertos,this.state.ptorres]} />
					                    </table>
					                  </div>
					                </div>
					              </div>
					              <div className="row">
					              	<div className="col-md-2 col-md-offset-10">
									  <form className="form-horizontal" method="post" target="_blank" action="/general/descargarVentaTotal">
									     <div className="form-group">
									        <input type="hidden" name="data" value={JSON.stringify({villa:this.state.pvilla,sanpedro:this.state.psanpedro,arcos:this.state.parcos,
					                      	empaques:this.state.pempaques,villajuarez:this.state.pvillajuarez,huertos:this.state.phuertos,torres:this.state.ptorres})}/>
									      </div>
									      <div className="form-group">
									        <input type="hidden" name="mes" value="previo"/>
									      </div>
									      <div className="form-group">
									        <button type="submit" className="btn btn-default">Descargar Todo</button>
									      </div>
									  </form>
									</div>
					              </div>
					            </div>
					          </div>

					        </div>
					      </div>
					    </div>
					    <div role="tabpanel" className="tab-pane" id="actualMonth">
							<div className="row">
								<div className="col-md-8 col-md-offset-2">
									<h1 className="text-center"> Reporte de Ventas del Mes Actual </h1>
								</div>
								<div className="col-md-2">
									<h4 className="text-center"> Progreso: {this.state.progresoActual} </h4>
								</div>
							</div>
					      <div className="row">
					        <div>
					          <ul className="nav nav-tabs" role="tablist">
					            <li role="presentation" className="active"><a href="#avilla" aria-controls="avilla" role="tab" data-toggle="tab">Villa Colonial</a></li>
					            <li role="presentation"><a href="#asanpedro" aria-controls="asanpedro" role="tab" data-toggle="tab">San Pedro</a></li>
					            <li role="presentation"><a href="#aarcos" aria-controls="aarcos" role="tab" data-toggle="tab">Arcos</a></li>
					            <li role="presentation"><a href="#aempaques" aria-controls="aempaques" role="tab" data-toggle="tab">Empaques</a></li>
					            <li role="presentation"><a href="#avjuarez" aria-controls="avjuarez" role="tab" data-toggle="tab">Villa Juarez</a></li>
					            <li role="presentation"><a href="#ahuertos" aria-controls="ahuertos" role="tab" data-toggle="tab">Huertos</a></li>
					            <li role="presentation"><a href="#atorres" aria-controls="atorres" role="tab" data-toggle="tab">Torres</a></li>
					            <li role="presentation"><a href="#atotales" aria-controls="atotales" role="tab" data-toggle="tab">Totales</a></li>
					          </ul>

					          <div className="tab-content">
					            <div role="tabpanel" className="tab-pane active" id="avilla">
					              <div className="row">
					                <div className="col-md-12">
					                  <div id="ventasTable">
					                    <table className="table table-bordered">
					                      <thead>
					                        <tr>
					                          <th>Amecop</th>
					                          <th>Nombre</th>
					                          <th>Sector</th>
					                          <th> nSector</th>
																		<th>Piezas </th>
					                          <th>Importe</th>
					                          <th>Iva</th>
					                          <th>Descuento</th>
					                          <th>Total</th>
					                        </tr>
					                      </thead>
					                      <FarmaciaTablaActual {...this.state.avilla}/>
					                    </table>
					                  </div>
					                </div>
					              </div>
					              <div className="row">
					                <div className="col-md-2 col-md-offset-8">
									  <form className="form-horizontal" method="post" target="_blank" action="/general/descargarVentaFarmacia">
									     <div className="form-group">
									        <input type="hidden" name="data" value={JSON.stringify(this.state.avilla)}/>
									      </div>
									      <div className="form-group">
									        <input type="hidden" name="mes" value="actual"/>
									      </div>
									      <div className="form-group">
									        <button type="submit" className="btn btn-default">Descargar Farmacia</button>
									      </div>
									  </form>
									</div>

					              </div>
					            </div>
					            <div role="tabpanel" className="tab-pane" id="asanpedro">
					              <div className="row">
					                <div className="col-md-12">
					                  <div id="ventasTable">
					                    <table className="table table-bordered">
					                      <thead>
					                        <tr>
					                          <th>Amecop</th>
					                          <th>Nombre</th>
					                          <th>Sector</th>
					                          <th> nSector</th>
																		<th>Piezas </th>
					                          <th>Importe</th>
					                          <th>Iva</th>
					                          <th>Descuento</th>
					                          <th>Total</th>
					                        </tr>
					                      </thead>
					                      <FarmaciaTablaActual {...this.state.asanpedro}/>
					                    </table>
					                  </div>
					                </div>
					              </div>
					              <div className="row">
					                <div className="col-md-2 col-md-offset-8">
									  <form className="form-horizontal" method="post" target="_blank" action="/general/descargarVentaFarmacia">
									     <div className="form-group">
									        <input type="hidden" name="data" value={JSON.stringify(this.state.asanpedro)}/>
									      </div>
									      <div className="form-group">
									        <input type="hidden" name="mes" value="actual"/>
									      </div>
									      <div className="form-group">
									        <button type="submit" className="btn btn-default">Descargar Farmacia</button>
									      </div>
									  </form>
									</div>

					              </div>
					            </div>
					            <div role="tabpanel" className="tab-pane" id="aarcos">
					              <div className="row">
					                <div className="col-md-12">
					                  <div id="ventasTable">
					                    <table className="table table-bordered">
					                      <thead>
					                        <tr>
					                          <th>Amecop</th>
					                          <th>Nombre</th>
					                          <th>Sector</th>
					                          <th> nSector</th>
																		<th>Piezas </th>
					                          <th>Importe</th>
					                          <th>Iva</th>
					                          <th>Descuento</th>
					                          <th>Total</th>
					                        </tr>
					                      </thead>
					                      <FarmaciaTablaActual {...this.state.aarcos}/>
					                    </table>
					                  </div>
					                </div>
					              </div>
					              <div className="row">
					                <div className="col-md-2 col-md-offset-8">
									  <form className="form-horizontal" method="post" target="_blank" action="/general/descargarVentaFarmacia">
									     <div className="form-group">
									        <input type="hidden" name="data" value={JSON.stringify(this.state.aarcos)}/>
									      </div>
									      <div className="form-group">
									        <input type="hidden" name="mes" value="actual"/>
									      </div>
									      <div className="form-group">
									        <button type="submit" className="btn btn-default">Descargar Farmacia</button>
									      </div>
									  </form>
									</div>

					              </div>
					            </div>
					            <div role="tabpanel" className="tab-pane" id="aempaques">
					              <div className="row">
					                <div className="col-md-12">
					                  <div id="ventasTable">
					                    <table className="table table-bordered">
					                      <thead>
					                        <tr>
					                          <th>Amecop</th>
					                          <th>Nombre</th>
					                          <th>Sector</th>
					                          <th> nSector</th>
																		<th>Piezas </th>
					                          <th>Importe</th>
					                          <th>Iva</th>
					                          <th>Descuento</th>
					                          <th>Total</th>
					                        </tr>
					                      </thead>
					                      <FarmaciaTablaActual {...this.state.aempaques}/>
					                    </table>
					                  </div>
					                </div>
					              </div>
					              <div className="row">
					                <div className="col-md-2 col-md-offset-8">
									  <form className="form-horizontal" method="post" target="_blank" action="/general/descargarVentaFarmacia">
									     <div className="form-group">
									        <input type="hidden" name="data" value={JSON.stringify(this.state.aempaques)}/>
									      </div>
									      <div className="form-group">
									        <input type="hidden" name="mes" value="actual"/>
									      </div>
									      <div className="form-group">
									        <button type="submit" className="btn btn-default">Descargar Farmacia</button>
									      </div>
									  </form>
									</div>

					              </div>
					            </div>
					            <div role="tabpanel" className="tab-pane" id="avjuarez">
					              <div className="row">
					                <div className="col-md-12">
					                  <div id="ventasTable">
					                    <table className="table table-bordered">
					                      <thead>
					                        <tr>
					                          <th>Amecop</th>
					                          <th>Nombre</th>
					                          <th>Sector</th>
					                          <th> nSector</th>
																		<th>Piezas </th>
					                          <th>Importe</th>
					                          <th>Iva</th>
					                          <th>Descuento</th>
					                          <th>Total</th>
					                        </tr>
					                      </thead>
					                      <FarmaciaTablaActual {...this.state.avillajuarez}/>
					                    </table>
					                  </div>
					                </div>
					              </div>
					              <div className="row">
					                <div className="col-md-2 col-md-offset-8">
									  <form className="form-horizontal" method="post" target="_blank" action="/general/descargarVentaFarmacia">
									     <div className="form-group">
									        <input type="hidden" name="data" value={JSON.stringify(this.state.avillajuarez)}/>
									      </div>
									      <div className="form-group">
									        <input type="hidden" name="mes" value="actual"/>
									      </div>
									      <div className="form-group">
									        <button type="submit" className="btn btn-default">Descargar Farmacia</button>
									      </div>
									  </form>
									</div>

					              </div>
					            </div>
					            <div role="tabpanel" className="tab-pane" id="ahuertos">
					              <div className="row">
					                <div className="col-md-12">
					                  <div id="ventasTable">
					                    <table className="table table-bordered">
					                      <thead>
					                        <tr>
					                          <th>Amecop</th>
					                          <th>Nombre</th>
					                          <th>Sector</th>
					                          <th> nSector</th>
																		<th>Piezas </th>
					                          <th>Importe</th>
					                          <th>Iva</th>
					                          <th>Descuento</th>
					                          <th>Total</th>
					                        </tr>
					                      </thead>
					                      <FarmaciaTablaActual {...this.state.ahuertos}/>
					                    </table>
					                  </div>
					                </div>
					              </div>
					              <div className="row">
					                <div className="col-md-2 col-md-offset-8">
									  <form className="form-horizontal" method="post" target="_blank" action="/general/descargarVentaFarmacia">
									     <div className="form-group">
									        <input type="hidden" name="data" value={JSON.stringify(this.state.ahuertos)}/>
									      </div>
									      <div className="form-group">
									        <input type="hidden" name="mes" value="actual"/>
									      </div>
									      <div className="form-group">
									        <button type="submit" className="btn btn-default">Descargar Farmacia</button>
									      </div>
									  </form>
									</div>

					              </div>
					            </div>
					            <div role="tabpanel" className="tab-pane" id="atorres">
					              <div className="row">
					                <div className="col-md-12">
					                  <div id="ventasTable">
					                    <table className="table table-bordered">
					                      <thead>
					                        <tr>
					                          <th>Amecop</th>
					                          <th>Nombre</th>
					                          <th>Sector</th>
					                          <th> nSector</th>
																		<th>Piezas </th>
					                          <th>Importe</th>
					                          <th>Iva</th>
					                          <th>Descuento</th>
					                          <th>Total</th>
					                        </tr>
					                      </thead>
					                      <FarmaciaTablaActual {...this.state.atorres}/>
					                    </table>
					                  </div>
					                </div>
					              </div>
					              <div className="row">
					                <div className="col-md-2 col-md-offset-8">
									  <form className="form-horizontal" method="post" target="_blank" action="/general/descargarVentaFarmacia">
									     <div className="form-group">
									        <input type="hidden" name="data" value={JSON.stringify(this.state.atorres)}/>
									      </div>
									      <div className="form-group">
									        <input type="hidden" name="mes" value="actual"/>
									      </div>
									      <div className="form-group">
									        <button type="submit" className="btn btn-default">Descargar Farmacia</button>
									      </div>
									  </form>
									</div>

					              </div>
					            </div>
					            <div role="tabpanel" className="tab-pane" id="atotales">
					              <div className="row">
					                <div className="col-md-12">
					                  <div className="totalTable">
					                    <table className="table table-bordered">
					                      <thead>
					                        <tr>
					                          <th>Farmacia</th>
					                          <th>Importe</th>
					                          <th>Iva</th>
					                          <th>Descuento</th>
					                          <th>Total</th>
					                        </tr>
					                      </thead>
					                      <TablaTotalActual {...[this.state.avilla,this.state.asanpedro,this.state.aarcos,
					                      	this.state.aempaques,this.state.avillajuarez,this.state.ahuertos,this.state.atorres]} />
					                    </table>
					                  </div>
					                </div>
					              </div>
					              <div className="row">
					              	<div className="col-md-2 col-md-offset-10">
									  <form className="form-horizontal" method="post" target="_blank" action="/general/descargarVentaTotal">
									     <div className="form-group">
									        <input type="hidden" name="data" value={JSON.stringify({villa:this.state.avilla,sanpedro:this.state.asanpedro,arcos:this.state.aarcos,
					                      	empaques:this.state.aempaques,villajuarez:this.state.avillajuarez,huertos:this.state.ahuertos,torres:this.state.atorres})}/>
									      </div>
									      <div className="form-group">
									        <input type="hidden" name="mes" value="actual"/>
									      </div>
									      <div className="form-group">
									        <button type="submit" className="btn btn-default">Descargar Todo</button>
									      </div>
									  </form>
									</div>
					              </div>
					            </div>
					          </div>

					        </div>
					      </div>
					    </div>
					  </div>
					</div>
			</div>
			);
	}
}

export default ReporteVentas;
