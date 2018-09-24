import React from 'react';
import * as api from '../api';

import mesOption from "./MesOption";

class HistorialReporteVentas extends React.Component {
	state = {
    mesesdisponibles:[]
	};
	componentDidMount() {
    api.reporteVentasHistorialMesesDisponibles()
      .then(mesesdisponibles => {
        if(mesesdisponibles) this.setState({mesesdisponibles});
      })
      .catch();

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
					      <a className="navbar-brand" href="#">PPI</a>
					    </div>

					    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					      <ul className="nav navbar-nav" role="tablist">
					        <li className="dropdown">
					          <a href="/general" className="dropdown-toggle disabled" data-toggle="dropdown" role="submit" aria-haspopup="true" aria-expanded="false">Reporte de Ventas<span className="caret"></span></a>
					          <ul className="dropdown-menu">
					            <li role="presentation"><a href="#previousMonth" aria-controls="home" role="tab" data-toggle="tab">Mes Anterior</a></li>
					            <li role="presentation"><a href="#actualMonth" aria-controls="home" role="tab" data-toggle="tab">Mes Actual</a></li>
					          </ul>
					        </li>
					      </ul>
					      <ul className="nav navbar-nav navbar-right">
					        <li><a href="/logout">Cerrar Sesión</a></li>
					      </ul>
					    </div>
					  </div>
					</nav>

          <div className="container content">
            <div className="row">
              <div className="col-md-12">
                <h1 className="text-center"> Historial de Reportes de Venta </h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 col-md-offset-4">
                <form id="mesSelectFrom" className="form-horizontal" method="post" target="_blank" action="/general/historial/descargarMesVenta" >
                  <div className="form-group">
                    <label>Escoja mes:
                    <input list="meses" id="mesSelect" className="form-control" /></label>
                    <datalist id="meses">
                      <mesOption {...this.state.mesesdisponibles} />
                    </datalist>
                  </div>
                  <div className="form-group">
                    <button type="submit" className="form-control buttons"> Hacer Reporte </button>
                  </div>

                </form>
              </div>
            </div>
          </div>

				</div>
			);
	}
}

export default HistorialReporteVentas;
