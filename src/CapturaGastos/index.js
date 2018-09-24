import React from 'react';
import * as api from '../api';

class CapturaGastos extends React.Component {
  state = {

  }

  componentDidMount() {

  }

  render(){
    return (
      <div className="container content">
        <div className="row">
          <h1 className="text-center"> Captura de Gastos </h1>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-6">
                <label>Seleccionar Cuenta:
                <input list="cuentas" className="form-control" /></label>
                <datalist id="cuentas">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </datalist>
              </div>
              <div className="col-md-6">

              </div>
            </div>
          </div>
          <div className="col-md-6">
            <p className="text-center"> pepe pecas </p>
          </div>
        </div>
      </div>
    );
  }
}

export default CapturaGastos;
