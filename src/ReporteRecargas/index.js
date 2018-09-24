import React from 'react';
import * as api from '../api';


class ReporteRecargas extends React.Component {

	render(){
		return(
        <div className="ReporteRecargas">
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
                  <li className="active"><a href="#">Reporte de Recargas <span className="sr-only">(current)</span></a></li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                  <li><a href="/compras/actualizarArticulos" target="_blank">Actualizar Articulos </a></li>
                  <li><a href="/logout">Cerrar Sesión</a></li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
			);
	}
}

export default ReporteRecargas;
