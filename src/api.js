import axios from 'axios';

export const reporteVentasFarmacia = farmacia => {
	return axios.get(`/api/reporteVenta/${farmacia}`)
				.then(resp => resp.data)
				.catch(err => console.log(err));
}

export const reportePromocionesArticulos = () => {
	return axios.get("/api/reportePromociones/articulos")
			.then(resp=>resp.data)
			.catch(err => console.log(err));
}

export const reportePromocionesConsulta = (consulta, farmacia) => {
	return axios.get(`/api/reportePromociones/${consulta}/${farmacia}`)
					.then(resp => resp.data)
						.catch(err => console.log(err));
}

export const reporteVentasHistorialMesesDisponibles = () => {
	return axios.get('/api/reporteVenta/historial/mesesDisponibles')
					.then(resp => resp.data)
						.catch(err => console.log(err));
}

export const reporteVentasArticulosFarmacia = farmacia => {
	return axios.get(`/api/maestro/balance/reporteVentasArticulos/${farmacia}`)
						.then(resp=>resp.data)
						.catch(err => console.log(err));
}

export const reporteVentasSectorFarmacia = farmacia => {
	return axios.get(`/api/maestro/balance/reporteVentasSector/${farmacia}`)
						.then(resp=>resp.data)
						.catch(err => console.log(err));
}

export const reporteInventarioArticuloFarmacia = farmacia => {
	return axios.get(`/api/maestro/balance/reporteInventarioArticulo/${farmacia}`)
						.then(resp=>resp.data)
						.catch(err => console.log(err));
}

export const reporteInventarioSectorFarmacia = farmacia => {
	return axios.get(`/api/maestro/balance/reporteInventarioSector/${farmacia}`)
						.then(resp=>resp.data)
						.catch(err => console.log(err));
}

export const reporteUtilidadArticuloFarmacia = farmacia => {
	return axios.get(`/api/maestro/balance/reporteUtilidadArticulo/${farmacia}`)
						.then(resp=>resp.data)
						.catch(err => console.log(err));
}

export const reporteUtilidadSectorFarmacia = farmacia => {
	return axios.get(`/api/maestro/balance/reporteUtilidadSector/${farmacia}`)
						.then(resp=>resp.data)
						.catch(err => console.log(err));
}
