import express from 'express';
const router = express.Router();
import mysql from 'mysql';
import config from '../config';

import fs from 'fs';
import jsonfile from 'jsonfile';

import mongo from 'mongodb';
let MongoClient = mongo.MongoClient;

//pools
const villaPool = mysql.createPool({
	connectionLimit:1000,
	host: config.mysqlInfo.hostname,
	user: config.mysqlInfo.user,
	password: config.mysqlInfo.pwd,
	database:config.mysqlInfo.dbs[0]
});
const sanpedroPool = mysql.createPool({
	connectionLimit:1000,
	host: config.mysqlInfo.hostname,
	user: config.mysqlInfo.user,
	password: config.mysqlInfo.pwd,
	database:config.mysqlInfo.dbs[1]
});
const arcosPool = mysql.createPool({
	connectionLimit:1000,
	host: config.mysqlInfo.hostname,
	user: config.mysqlInfo.user,
	password: config.mysqlInfo.pwd,
	database:config.mysqlInfo.dbs[2]
});
const empaquesPool = mysql.createPool({
	connectionLimit:1000,
	host: config.mysqlInfo.hostname,
	user: config.mysqlInfo.user,
	password: config.mysqlInfo.pwd,
	database:config.mysqlInfo.dbs[3]
});
const villajuarezPool = mysql.createPool({
	connectionLimit:1000,
	host: config.mysqlInfo.hostname,
	user: config.mysqlInfo.user,
	password: config.mysqlInfo.pwd,
	database:config.mysqlInfo.dbs[4]
});
const huertosPool = mysql.createPool({
	connectionLimit:1000,
	host: config.mysqlInfo.hostname,
	user: config.mysqlInfo.user,
	password: config.mysqlInfo.pwd,
	database:config.mysqlInfo.dbs[5]
});
const torresPool = mysql.createPool({
	connectionLimit:1000,
	host: config.mysqlInfo.hostname,
	user: config.mysqlInfo.user,
	password: config.mysqlInfo.pwd,
	database:config.mysqlInfo.dbs[6]
});


//queries
const reporteVentasActualSQL = "SELECT a_amecop AS amecop, a_nombre AS nombre, a_sector AS cSector, s_nombre AS sectorN, a_vta_mes AS piezas, a_publico AS importe, a_iva AS iva, a_desc AS descuento, a_vta_pes_mes AS mesActual " +
                "FROM (SELECT a_amecop, a_nombre, a_sector, s_nombre, a_publico, a_iva, a_desc " +
                      "FROM articulo " +
                      "JOIN sector " +
                      "ON articulo.a_sector = sector.s_sector) AS T1 " +
                "NATURAL JOIN acumuladoarticulo " +
                "WHERE a_vta_pes_mes > 0 " +
                "ORDER BY a_nombre";
const reporteVentasAnteriorSQL = "SELECT a_amecop AS amecop, a_nombre AS nombre, a_sector AS cSector, s_nombre AS sectorN, a_vta_mes_a AS piezas, a_publico AS importe, a_iva AS iva, a_desc AS descuento, a_vta_pes_mes_a AS mesAnterior " +
                "FROM (SELECT a_amecop, a_nombre, a_sector, s_nombre, a_publico, a_iva, a_desc " +
                      "FROM articulo " +
                      "JOIN sector " +
                      "ON articulo.a_sector = sector.s_sector) AS T1 " +
                "NATURAL JOIN acumuladoarticulo " +
                "WHERE a_vta_pes_mes_a > 0 " +
                "ORDER BY a_nombre";
const reporteVentasArticulosSQL = "SELECT a_sector AS sector, a_amecop AS amecop, a_nombre AS nombre, a_vta_pes_mes_a AS venta " +
																	"FROM acumuladoarticulo NATURAL JOIN articulo " +
																	"WHERE a_vta_pes_mes_a > 0 " +
																	"ORDER BY a_sector, a_nombre";
const reporteVentasSectorSQL = "SELECT s_sector AS cSector, s_nombre AS sector, SUM(a_vta_pes_mes_a) AS venta " +
																"FROM acumuladoarticulo " +
																"NATURAL JOIN ( SELECT * FROM articulo JOIN sector ON sector.s_sector = a_sector) AS T1 " +
																"WHERE a_vta_pes_mes_a > 0 " +
																"GROUP BY s_nombre ORDER BY s_sector";
const reporteInventarioArticuloSQL = "SELECT a_sector AS sector, a_amecop AS amecop, a_nombre AS nombre, a_existencia_inicial * (a_costo * (1 + a_iva)) AS inventario " +
																			"FROM acumuladoarticulo NATURAL JOIN articulo " +
																			"WHERE a_existencia_inicial != 0 AND a_nombre != \"\" ORDER BY a_sector, a_nombre";

const reporteInventarioSectorSQL = "SELECT s_sector AS cSector, s_nombre AS sector, SUM(a_existencia_inicial * (a_costo * (1 + a_iva))) AS inventario " +
																	"FROM acumuladoarticulo " +
																	"NATURAL JOIN ( SELECT * FROM articulo JOIN sector ON sector.s_sector = a_sector) AS T1 " +
																	"WHERE a_existencia_inicial != 0 AND a_nombre != \"\" " +
																	"GROUP BY s_nombre ORDER BY s_sector";

const reporteUtilidadArticuloSQL = "SELECT a_sector AS sector, a_amecop AS amecop, a_nombre AS nombre, a_vta_pes_mes_a - (a_costo * (1 + a_iva)) * a_vta_mes_a - a_mer_pes_mes_a AS utilidad " +
														"FROM acumuladoarticulo NATURAL JOIN articulo WHERE a_vta_pes_mes_a > 0 ORDER BY a_sector, a_nombre";

const reporteUtilidadSectorSQL = "SELECT s_sector AS cSector, s_nombre AS sector, SUM(a_vta_pes_mes_a - (a_costo * (1 + a_iva)) * a_vta_mes_a - a_mer_pes_mes_a) AS utilidad " +
																"FROM acumuladoarticulo " +
																"NATURAL JOIN ( SELECT * FROM articulo JOIN sector ON sector.s_sector = a_sector) AS T1 " +
																"WHERE a_vta_pes_mes_a > 0 " +
																"GROUP BY s_nombre ORDER BY s_sector";

process.on('uncaughtException', function (error) {
   console.log(error.stack);
});
const reporteVentaFolder = "./files/ReportesVenta/";
router.get('/reporteVenta/:farmacia', (req, res) => {
	const farmacia = req.params.farmacia;
	let filename;
	let date;
	switch(farmacia){
		case "avilla":
			villaPool.query(reporteVentasActualSQL, (err, result, fields) =>{
				if(err) throw err;
				console.log("Informacion de Villa Actual Recibida");
				res.send(result);
			});
			break;
		case "pvilla":
			date = new Date();
			filename = "villa" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
			if(fs.existsSync(reporteVentaFolder + filename)){
				jsonfile.readFile(reporteVentaFolder + filename, (err, obj) => {
					console.log("Reading villa file");
					if(err) throw err;
					res.send(obj);
				});
			}else{
				villaPool.query(reporteVentasAnteriorSQL, (err, result, fields) =>{
					if(err) throw err;
					console.log("Informacion de Villa Anterior Recibida");
					jsonfile.writeFile(reporteVentaFolder + filename, result, (err) => {
						if(err) throw err;
						console.log("archivo escrito");
						res.send(result);
					});
				});
			}
			break;
		case "asanpedro":
			sanpedroPool.query(reporteVentasActualSQL, (err, result, fields) =>{
				if(err) throw err;
				console.log("Informacion de San Pedro Actual Recibida");
				res.send(result);
			});
			break;
		case "psanpedro":
			date = new Date();
			filename = "sanpedro" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
			if(fs.existsSync(reporteVentaFolder + filename)){
				jsonfile.readFile(reporteVentaFolder + filename, (err, obj) => {
					console.log("Reading sanpedro file");
					if(err) throw err;
					res.send(obj);
				});
			}else{
				sanpedroPool.query(reporteVentasAnteriorSQL, (err, result, fields) =>{
					if(err) throw err;
					console.log("Informacion de sanpedro Anterior Recibida");
					jsonfile.writeFile(reporteVentaFolder + filename, result, (err) => {
						if(err) throw err;
						console.log("archivo escrito");
						res.send(result);
					});
				});
			}
			break;
		case "aarcos":
			arcosPool.query(reporteVentasActualSQL, (err, result, fields) =>{
				if(err) throw err;
				console.log("Informacion de Arcos Actual Recibida");
				res.send(result);
			});
			break;
		case "parcos":
			date = new Date();
			filename = "arcos" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
			if(fs.existsSync(reporteVentaFolder + filename)){
				jsonfile.readFile(reporteVentaFolder + filename, (err, obj) => {
					console.log("Reading arcos file");
					if(err) throw err;
					res.send(obj);
				});
			}else{
				arcosPool.query(reporteVentasAnteriorSQL, (err, result, fields) =>{
					if(err) throw err;
					console.log("Informacion de arcos Anterior Recibida");
					jsonfile.writeFile(reporteVentaFolder + filename, result, (err) => {
						if(err) throw err;
						console.log("archivo escrito");
						res.send(result);
					});
				});
			}
			break;
		case "aempaques":
			empaquesPool.query(reporteVentasActualSQL, (err, result, fields) =>{
				if(err) throw err;
				console.log("Informacion de Empaques Actual Recibida");
				res.send(result);
			});
			break;
		case "pempaques":
				date = new Date();
				filename = "empaques" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
				if(fs.existsSync(reporteVentaFolder + filename)){
					jsonfile.readFile(reporteVentaFolder + filename, (err, obj) => {
						console.log("Reading empaques file");
						if(err) throw err;
						res.send(obj);
					});
				}else{
					empaquesPool.query(reporteVentasAnteriorSQL, (err, result, fields) =>{
						if(err) throw err;
						console.log("Informacion de empaques Anterior Recibida");
						jsonfile.writeFile(reporteVentaFolder + filename, result, (err) => {
							if(err) throw err;
							console.log("archivo escrito");
							res.send(result);
						});
					});
				}
			break;
		case "avillajuarez":
			villajuarezPool.query(reporteVentasActualSQL, (err, result, fields) =>{
				if(err) throw err;
				console.log("Informacion de Villa Juarez Actual Recibida");
				res.send(result);
			});
			break;
		case "pvillajuarez":
			date = new Date();
			filename = "villajuarez" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
			if(fs.existsSync(reporteVentaFolder + filename)){
				jsonfile.readFile(reporteVentaFolder + filename, (err, obj) => {
					console.log("Reading villa juarez file");
					if(err) throw err;
					res.send(obj);
				});
			}else{
				villajuarezPool.query(reporteVentasAnteriorSQL, (err, result, fields) =>{
					if(err) throw err;
					console.log("Informacion de villa juarez Anterior Recibida");
					jsonfile.writeFile(reporteVentaFolder + filename, result, (err) => {
						if(err) throw err;
						console.log("archivo escrito");
						res.send(result);
					});
				});
			}
			break;
		case "ahuertos":
			huertosPool.query(reporteVentasActualSQL, (err, result, fields) =>{
				if(err) throw err;
				console.log("Informacion de Huertos Actual Recibida");
				res.send(result);
			});
			break;
		case "phuertos":
			date = new Date();
			filename = "huertos" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
			if(fs.existsSync(reporteVentaFolder + filename)){
				jsonfile.readFile(reporteVentaFolder + filename, (err, obj) => {
					console.log("Reading huertos file");
					if(err) throw err;
					res.send(obj);
				});
			}else{
				huertosPool.query(reporteVentasAnteriorSQL, (err, result, fields) =>{
					if(err) throw err;
					console.log("Informacion de huertos Anterior Recibida");
					jsonfile.writeFile(reporteVentaFolder + filename, result, (err) => {
						if(err) throw err;
						console.log("archivo escrito");
						res.send(result);
					});
				});
			}
			break;
		case "atorres":
			torresPool.query(reporteVentasActualSQL, (err, result, fields) =>{
				if(err) throw err;
				console.log("Informacion de Torres Actual Recibida");
				res.send(result);
			});
			break;
		case "ptorres":
			date = new Date();
			filename = "torres" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
			if(fs.existsSync(reporteVentaFolder + filename)){
				jsonfile.readFile(reporteVentaFolder + filename, (err, obj) => {
					console.log("Reading torres file");
					if(err) throw err;
					res.send(obj);
				});
			}else{
				torresPool.query(reporteVentasAnteriorSQL, (err, result, fields) =>{
					if(err) throw err;
					console.log("Informacion de torres Anterior Recibida");
					jsonfile.writeFile(reporteVentaFolder + filename, result, (err) => {
						if(err) throw err;
						console.log("archivo escrito");
						res.send(result);
					});
				});
			}
			break;
		default:
			res.status(404).end();
	}
});

router.get('/reportePromociones/articulos', (req, res) => {
	MongoClient.connect(config.ppidbUrl, (err, db) => {
	if(err) throw err;
	db.collection("articulos").find({}).toArray((err, result) =>{
		if(err) throw err;
		console.log("lista de articulos obtenida")
		res.send(result);
		db.close();
	});


});
});



router.get('/reportePromociones/:consulta/:farmacia', (req, res) => {
	const consulta = JSON.parse(req.params.consulta);
	const farmacia = req.params.farmacia;
	let articulos = "(";
	for(let i = 0; i < consulta.length - 1; i++){
		articulos += "\"" + consulta[i]["producto"] + "\"";
		if(i !== consulta.length - 2){
			articulos += ", ";
		}
	}
	articulos += ")";
	let dateFROM = consulta[consulta.length-1]["dateFROM"];
	let dateTO = consulta[consulta.length-1]["dateTO"];

	let sql = "SELECT a_nombre AS nombre, vta_piezas AS piezas " +
							"FROM (SELECT vta_amecop, vta_piezas "+
											"FROM (SELECT vta_caja, vta_tran " +
															" FROM venta "+
																"WHERE vta_fecha BETWEEN \"" + dateFROM +"\" AND \"" + dateTO + "\") AS T1 "+
											"JOIN detventa "+
											"ON T1.vta_caja = detventa.vta_caja AND T1.vta_tran = detventa.vta_tran) AS T2 " +
											"JOIN articulo " +
											"ON T2.vta_amecop = articulo.a_amecop "+
											"WHERE a_nombre IN " + articulos;


	switch(farmacia){
		case "villa":
			console.log("Recibiendo promociones de Villa");
			villaPool.query(sql, (err, result, fields) =>{
				if(err) throw err;
			 	res.send(result);
			});
	 		break;
		case "sanpedro":
			sanpedroPool.query(sql, (err, result, fields) =>{
				console.log("Recibiendo promociones de San pedro");
				if(err) throw err;
			 	res.send(result);
			});
			break;
		case "arcos":
			arcosPool.query(sql, (err, result, fields) =>{
				console.log("Recibiendo promociones de arcos");
				if(err) throw err;
				res.send(result);
			});
			break;
		case "empaques":
				empaquesPool.query(sql, (err, result, fields) =>{
				console.log("Recibiendo promociones de empaques");
				if(err) throw err;
				res.send(result);
			});
			break;
		case "villajuarez":
				villajuarezPool.query(sql, (err, result, fields) =>{
				console.log("Recibiendo promociones de villa juarez");
				if(err) throw err;
				res.send(result);
			});
			break;
		case "huertos":
				huertosPool.query(sql, (err, result, fields) =>{
				console.log("Recibiendo promociones de huertos");
				if(err) throw err;
				res.send(result);
			});
			break;
		case "torres":
			torresPool.query(sql, (err, result, fields) =>{
				console.log("Recibiendo promociones de torres");
				if(err) throw err;
				res.send(result);
			});
			break;
		default:
	 		res.status(404).end();
 }


});

router.get('/reporteVenta/historial/mesesDisponibles', (req, res) => {
	fs.readdir(reporteVentaFolder, (err, files) =>{
		if(err) throw err;
		let fileparsed = [];
		files.forEach(file => {
			let tmp = file.substring(0, file.length - 5).split("_");
			tmp.splice(0,1);
			for(let i = 0; i < fileparsed.length; i++){
				if(tmp[0] === fileparsed[i]["mes"] && tmp[1] === fileparsed[i]["año"]){
					break;
				}
				if(i === fileparsed.length-1){
					let newMonth = {};
					newMonth["mes"] = tmp[0];
					newMonth["año"] = tmp[1];
					fileparsed.push(newMonth);
				};
			}
			if(fileparsed.length === 0) {
				let newMonth = {};
				newMonth["mes"] = tmp[0];
				newMonth["año"] = tmp[1];
				fileparsed.push(newMonth);
			}
		});

		res.send(fileparsed);
	});
});

const reporteVentaArticuloFolder = "./files/ReporteVentaArticulo/";
router.get('/maestro/balance/reporteVentasArticulos/:farmacia', (req, res) => {
	const farmacia = req.params.farmacia;
	let filename;
	let date;
	switch(farmacia){
		case "villa":
			date = new Date();
			filename = "villa" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
			if(fs.existsSync(reporteVentaArticuloFolder + filename)){
				jsonfile.readFile(reporteVentaArticuloFolder + filename, (err, obj) => {
					console.log("Reading villa file");
					if(err) throw err;
					res.send(obj);
				});
			}else{
				villaPool.query(reporteVentasArticulosSQL, (err, result, fields) =>{
					if(err) throw err;
					console.log("Informacion de Villa Anterior Recibida");
					jsonfile.writeFile(reporteVentaArticuloFolder + filename, result, (err) => {
						if(err) throw err;
						console.log("archivo escrito");
						res.send(result);
					});
				});
			}
			break;
		case "sanpedro":
			date = new Date();
			filename = "sanpedro" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
			if(fs.existsSync(reporteVentaArticuloFolder + filename)){
				jsonfile.readFile(reporteVentaArticuloFolder + filename, (err, obj) => {
					console.log("Reading sanpedro file");
					if(err) throw err;
					res.send(obj);
				});
			}else{
				sanpedroPool.query(reporteVentasArticulosSQL, (err, result, fields) =>{
					if(err) throw err;
					console.log("Informacion de sanpedro Anterior Recibida");
					jsonfile.writeFile(reporteVentaArticuloFolder + filename, result, (err) => {
						if(err) throw err;
						console.log("archivo escrito");
						res.send(result);
					});
				});
			}
			break;
		case "arcos":
			date = new Date();
			filename = "arcos" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
			if(fs.existsSync(reporteVentaArticuloFolder + filename)){
				jsonfile.readFile(reporteVentaArticuloFolder + filename, (err, obj) => {
					console.log("Reading arcos file");
					if(err) throw err;
					res.send(obj);
				});
			}else{
				arcosPool.query(reporteVentasArticulosSQL, (err, result, fields) =>{
					if(err) throw err;
					console.log("Informacion de arcos Anterior Recibida");
					jsonfile.writeFile(reporteVentaArticuloFolder + filename, result, (err) => {
						if(err) throw err;
						console.log("archivo escrito");
						res.send(result);
					});
				});
			}
			break;
		case "empaques":
				date = new Date();
				filename = "empaques" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
				if(fs.existsSync(reporteVentaArticuloFolder + filename)){
					jsonfile.readFile(reporteVentaArticuloFolder + filename, (err, obj) => {
						console.log("Reading empaques file");
						if(err) throw err;
						res.send(obj);
					});
				}else{
					empaquesPool.query(reporteVentasArticulosSQL, (err, result, fields) =>{
						if(err) throw err;
						console.log("Informacion de empaques Anterior Recibida");
						jsonfile.writeFile(reporteVentaArticuloFolder + filename, result, (err) => {
							if(err) throw err;
							console.log("archivo escrito");
							res.send(result);
						});
					});
				}
			break;
		case "villajuarez":
			date = new Date();
			filename = "villajuarez" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
			if(fs.existsSync(reporteVentaArticuloFolder + filename)){
				jsonfile.readFile(reporteVentaArticuloFolder + filename, (err, obj) => {
					console.log("Reading villa juarez file");
					if(err) throw err;
					res.send(obj);
				});
			}else{
				villajuarezPool.query(reporteVentasArticulosSQL, (err, result, fields) =>{
					if(err) throw err;
					console.log("Informacion de villa juarez Anterior Recibida");
					jsonfile.writeFile(reporteVentaArticuloFolder + filename, result, (err) => {
						if(err) throw err;
						console.log("archivo escrito");
						res.send(result);
					});
				});
			}
			break;
		case "huertos":
			date = new Date();
			filename = "huertos" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
			if(fs.existsSync(reporteVentaArticuloFolder + filename)){
				jsonfile.readFile(reporteVentaArticuloFolder + filename, (err, obj) => {
					console.log("Reading huertos file");
					if(err) throw err;
					res.send(obj);
				});
			}else{
				huertosPool.query(reporteVentasArticulosSQL, (err, result, fields) =>{
					if(err) throw err;
					console.log("Informacion de huertos Anterior Recibida");
					jsonfile.writeFile(reporteVentaArticuloFolder + filename, result, (err) => {
						if(err) throw err;
						console.log("archivo escrito");
						res.send(result);
					});
				});
			}
			break;
		case "torres":
			date = new Date();
			filename = "torres" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
			if(fs.existsSync(reporteVentaArticuloFolder + filename)){
				jsonfile.readFile(reporteVentaArticuloFolder + filename, (err, obj) => {
					console.log("Reading torres file");
					if(err) throw err;
					res.send(obj);
				});
			}else{
				torresPool.query(reporteVentasArticulosSQL, (err, result, fields) =>{
					if(err) throw err;
					console.log("Informacion de torres Anterior Recibida");
					jsonfile.writeFile(reporteVentaArticuloFolder + filename, result, (err) => {
						if(err) throw err;
						console.log("archivo escrito");
						res.send(result);
					});
				});
			}
			break;
		default:
			res.status(404).end();
	}
});

const reporteVentaSectorFolder = "./files/ReporteVentaSector/";
router.get('/maestro/balance/reporteVentasSector/:farmacia', (req, res) => {
	const farmacia = req.params.farmacia;
	let filename;
	let date;
	switch(farmacia){
		case "villa":
			date = new Date();
			filename = "villa" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
			if(fs.existsSync(reporteVentaSectorFolder + filename)){
				jsonfile.readFile(reporteVentaSectorFolder + filename, (err, obj) => {
					console.log("Reading villa file");
					if(err) throw err;
					res.send(obj);
				});
			}else{
				villaPool.query(reporteVentasSectorSQL, (err, result, fields) =>{
					if(err) throw err;
					console.log("Informacion de Villa Anterior Recibida");
					jsonfile.writeFile(reporteVentaSectorFolder + filename, result, (err) => {
						if(err) throw err;
						console.log("archivo escrito");
						res.send(result);
					});
				});
			}
			break;
		case "sanpedro":
			date = new Date();
			filename = "sanpedro" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
			if(fs.existsSync(reporteVentaSectorFolder + filename)){
				jsonfile.readFile(reporteVentaSectorFolder + filename, (err, obj) => {
					console.log("Reading sanpedro file");
					if(err) throw err;
					res.send(obj);
				});
			}else{
				sanpedroPool.query(reporteVentasSectorSQL, (err, result, fields) =>{
					if(err) throw err;
					console.log("Informacion de sanpedro Anterior Recibida");
					jsonfile.writeFile(reporteVentaSectorFolder + filename, result, (err) => {
						if(err) throw err;
						console.log("archivo escrito");
						res.send(result);
					});
				});
			}
			break;
		case "arcos":
			date = new Date();
			filename = "arcos" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
			if(fs.existsSync(reporteVentaSectorFolder + filename)){
				jsonfile.readFile(reporteVentaSectorFolder + filename, (err, obj) => {
					console.log("Reading arcos file");
					if(err) throw err;
					res.send(obj);
				});
			}else{
				arcosPool.query(reporteVentasSectorSQL, (err, result, fields) =>{
					if(err) throw err;
					console.log("Informacion de arcos Anterior Recibida");
					jsonfile.writeFile(reporteVentaSectorFolder + filename, result, (err) => {
						if(err) throw err;
						console.log("archivo escrito");
						res.send(result);
					});
				});
			}
			break;
		case "empaques":
				date = new Date();
				filename = "empaques" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
				if(fs.existsSync(reporteVentaSectorFolder + filename)){
					jsonfile.readFile(reporteVentaSectorFolder + filename, (err, obj) => {
						console.log("Reading empaques file");
						if(err) throw err;
						res.send(obj);
					});
				}else{
					empaquesPool.query(reporteVentasSectorSQL, (err, result, fields) =>{
						if(err) throw err;
						console.log("Informacion de empaques Anterior Recibida");
						jsonfile.writeFile(reporteVentaSectorFolder + filename, result, (err) => {
							if(err) throw err;
							console.log("archivo escrito");
							res.send(result);
						});
					});
				}
			break;
		case "villajuarez":
			date = new Date();
			filename = "villajuarez" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
			if(fs.existsSync(reporteVentaSectorFolder + filename)){
				jsonfile.readFile(reporteVentaSectorFolder + filename, (err, obj) => {
					console.log("Reading villa juarez file");
					if(err) throw err;
					res.send(obj);
				});
			}else{
				villajuarezPool.query(reporteVentasSectorSQL, (err, result, fields) =>{
					if(err) throw err;
					console.log("Informacion de villa juarez Anterior Recibida");
					jsonfile.writeFile(reporteVentaSectorFolder + filename, result, (err) => {
						if(err) throw err;
						console.log("archivo escrito");
						res.send(result);
					});
				});
			}
			break;
		case "huertos":
			date = new Date();
			filename = "huertos" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
			if(fs.existsSync(reporteVentaSectorFolder + filename)){
				jsonfile.readFile(reporteVentaSectorFolder + filename, (err, obj) => {
					console.log("Reading huertos file");
					if(err) throw err;
					res.send(obj);
				});
			}else{
				huertosPool.query(reporteVentasSectorSQL, (err, result, fields) =>{
					if(err) throw err;
					console.log("Informacion de huertos Anterior Recibida");
					jsonfile.writeFile(reporteVentaSectorFolder + filename, result, (err) => {
						if(err) throw err;
						console.log("archivo escrito");
						res.send(result);
					});
				});
			}
			break;
		case "torres":
			date = new Date();
			filename = "torres" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
			if(fs.existsSync(reporteVentaSectorFolder + filename)){
				jsonfile.readFile(reporteVentaSectorFolder + filename, (err, obj) => {
					console.log("Reading torres file");
					if(err) throw err;
					res.send(obj);
				});
			}else{
				torresPool.query(reporteVentasSectorSQL, (err, result, fields) =>{
					if(err) throw err;
					console.log("Informacion de torres Anterior Recibida");
					jsonfile.writeFile(reporteVentaSectorFolder + filename, result, (err) => {
						if(err) throw err;
						console.log("archivo escrito");
						res.send(result);
					});
				});
			}
			break;
		default:
			res.status(404).end();
	}
});

const reporteInventarioArticuloFolder = "./files/ReporteInventarioArticulo/";
router.get('/maestro/balance/reporteInventarioArticulo/:farmacia', (req, res) => {
	const farmacia = req.params.farmacia;
	let filename;
	let date;
	switch(farmacia){
		case "villa":
			date = new Date();
			filename = "villa" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
			if(fs.existsSync(reporteInventarioArticuloFolder + filename)){
				jsonfile.readFile(reporteInventarioArticuloFolder + filename, (err, obj) => {
					console.log("Reading villa file");
					if(err) throw err;
					res.send(obj);
				});
			}else{
				villaPool.query(reporteInventarioArticuloSQL, (err, result, fields) =>{
					if(err) throw err;
					console.log("Informacion de Villa Anterior Recibida");
					jsonfile.writeFile(reporteInventarioArticuloFolder + filename, result, (err) => {
						if(err) throw err;
						console.log("archivo escrito");
						res.send(result);
					});
				});
			}
			break;
		case "sanpedro":
			date = new Date();
			filename = "sanpedro" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
			if(fs.existsSync(reporteInventarioArticuloFolder + filename)){
				jsonfile.readFile(reporteInventarioArticuloFolder + filename, (err, obj) => {
					console.log("Reading sanpedro file");
					if(err) throw err;
					res.send(obj);
				});
			}else{
				sanpedroPool.query(reporteInventarioArticuloSQL, (err, result, fields) =>{
					if(err) throw err;
					console.log("Informacion de sanpedro Anterior Recibida");
					jsonfile.writeFile(reporteInventarioArticuloFolder + filename, result, (err) => {
						if(err) throw err;
						console.log("archivo escrito");
						res.send(result);
					});
				});
			}
			break;
		case "arcos":
			date = new Date();
			filename = "arcos" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
			if(fs.existsSync(reporteInventarioArticuloFolder + filename)){
				jsonfile.readFile(reporteInventarioArticuloFolder + filename, (err, obj) => {
					console.log("Reading arcos file");
					if(err) throw err;
					res.send(obj);
				});
			}else{
				arcosPool.query(reporteInventarioArticuloSQL, (err, result, fields) =>{
					if(err) throw err;
					console.log("Informacion de arcos Anterior Recibida");
					jsonfile.writeFile(reporteInventarioArticuloFolder + filename, result, (err) => {
						if(err) throw err;
						console.log("archivo escrito");
						res.send(result);
					});
				});
			}
			break;
		case "empaques":
				date = new Date();
				filename = "empaques" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
				if(fs.existsSync(reporteInventarioArticuloFolder + filename)){
					jsonfile.readFile(reporteInventarioArticuloFolder + filename, (err, obj) => {
						console.log("Reading empaques file");
						if(err) throw err;
						res.send(obj);
					});
				}else{
					empaquesPool.query(reporteInventarioArticuloSQL, (err, result, fields) =>{
						if(err) throw err;
						console.log("Informacion de empaques Anterior Recibida");
						jsonfile.writeFile(reporteInventarioArticuloFolder + filename, result, (err) => {
							if(err) throw err;
							console.log("archivo escrito");
							res.send(result);
						});
					});
				}
			break;
		case "villajuarez":
			date = new Date();
			filename = "villajuarez" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
			if(fs.existsSync(reporteInventarioArticuloFolder + filename)){
				jsonfile.readFile(reporteInventarioArticuloFolder + filename, (err, obj) => {
					console.log("Reading villa juarez file");
					if(err) throw err;
					res.send(obj);
				});
			}else{
				villajuarezPool.query(reporteInventarioArticuloSQL, (err, result, fields) =>{
					if(err) throw err;
					console.log("Informacion de villa juarez Anterior Recibida");
					jsonfile.writeFile(reporteInventarioArticuloFolder + filename, result, (err) => {
						if(err) throw err;
						console.log("archivo escrito");
						res.send(result);
					});
				});
			}
			break;
		case "huertos":
			date = new Date();
			filename = "huertos" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
			if(fs.existsSync(reporteInventarioArticuloFolder + filename)){
				jsonfile.readFile(reporteInventarioArticuloFolder + filename, (err, obj) => {
					console.log("Reading huertos file");
					if(err) throw err;
					res.send(obj);
				});
			}else{
				huertosPool.query(reporteInventarioArticuloSQL, (err, result, fields) =>{
					if(err) throw err;
					console.log("Informacion de huertos Anterior Recibida");
					jsonfile.writeFile(reporteInventarioArticuloFolder + filename, result, (err) => {
						if(err) throw err;
						console.log("archivo escrito");
						res.send(result);
					});
				});
			}
			break;
		case "torres":
			date = new Date();
			filename = "torres" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
			if(fs.existsSync(reporteInventarioArticuloFolder + filename)){
				jsonfile.readFile(reporteInventarioArticuloFolder + filename, (err, obj) => {
					console.log("Reading torres file");
					if(err) throw err;
					res.send(obj);
				});
			}else{
				torresPool.query(reporteInventarioArticuloSQL, (err, result, fields) =>{
					if(err) throw err;
					console.log("Informacion de torres Anterior Recibida");
					jsonfile.writeFile(reporteInventarioArticuloFolder + filename, result, (err) => {
						if(err) throw err;
						console.log("archivo escrito");
						res.send(result);
					});
				});
			}
			break;
		default:
			res.status(404).end();
	}
});

const reporteInventarioSectorFolder = "./files/ReporteInventarioSector/";
router.get('/maestro/balance/reporteInventarioSector/:farmacia', (req, res) => {
	const farmacia = req.params.farmacia;
	let filename;
	let date;
	switch(farmacia){
		case "villa":
			date = new Date();
			filename = "villa" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
			if(fs.existsSync(reporteInventarioSectorFolder + filename)){
				jsonfile.readFile(reporteInventarioSectorFolder + filename, (err, obj) => {
					console.log("Reading villa file");
					if(err) throw err;
					res.send(obj);
				});
			}else{
				villaPool.query(reporteInventarioSectorSQL, (err, result, fields) =>{
					if(err) throw err;
					console.log("Informacion de Villa Anterior Recibida");
					jsonfile.writeFile(reporteInventarioSectorFolder + filename, result, (err) => {
						if(err) throw err;
						console.log("archivo escrito");
						res.send(result);
					});
				});
			}
			break;
		case "sanpedro":
			date = new Date();
			filename = "sanpedro" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
			if(fs.existsSync(reporteInventarioSectorFolder + filename)){
				jsonfile.readFile(reporteInventarioSectorFolder + filename, (err, obj) => {
					console.log("Reading sanpedro file");
					if(err) throw err;
					res.send(obj);
				});
			}else{
				sanpedroPool.query(reporteInventarioSectorSQL, (err, result, fields) =>{
					if(err) throw err;
					console.log("Informacion de sanpedro Anterior Recibida");
					jsonfile.writeFile(reporteInventarioSectorFolder + filename, result, (err) => {
						if(err) throw err;
						console.log("archivo escrito");
						res.send(result);
					});
				});
			}
			break;
		case "arcos":
			date = new Date();
			filename = "arcos" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
			if(fs.existsSync(reporteInventarioSectorFolder + filename)){
				jsonfile.readFile(reporteInventarioSectorFolder + filename, (err, obj) => {
					console.log("Reading arcos file");
					if(err) throw err;
					res.send(obj);
				});
			}else{
				arcosPool.query(reporteInventarioSectorSQL, (err, result, fields) =>{
					if(err) throw err;
					console.log("Informacion de arcos Anterior Recibida");
					jsonfile.writeFile(reporteInventarioSectorFolder + filename, result, (err) => {
						if(err) throw err;
						console.log("archivo escrito");
						res.send(result);
					});
				});
			}
			break;
		case "empaques":
				date = new Date();
				filename = "empaques" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
				if(fs.existsSync(reporteInventarioSectorFolder + filename)){
					jsonfile.readFile(reporteInventarioSectorFolder + filename, (err, obj) => {
						console.log("Reading empaques file");
						if(err) throw err;
						res.send(obj);
					});
				}else{
					empaquesPool.query(reporteInventarioSectorSQL, (err, result, fields) =>{
						if(err) throw err;
						console.log("Informacion de empaques Anterior Recibida");
						jsonfile.writeFile(reporteInventarioSectorFolder + filename, result, (err) => {
							if(err) throw err;
							console.log("archivo escrito");
							res.send(result);
						});
					});
				}
			break;
		case "villajuarez":
			date = new Date();
			filename = "villajuarez" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
			if(fs.existsSync(reporteInventarioSectorFolder + filename)){
				jsonfile.readFile(reporteInventarioSectorFolder + filename, (err, obj) => {
					console.log("Reading villa juarez file");
					if(err) throw err;
					res.send(obj);
				});
			}else{
				villajuarezPool.query(reporteInventarioSectorSQL, (err, result, fields) =>{
					if(err) throw err;
					console.log("Informacion de villa juarez Anterior Recibida");
					jsonfile.writeFile(reporteInventarioSectorFolder + filename, result, (err) => {
						if(err) throw err;
						console.log("archivo escrito");
						res.send(result);
					});
				});
			}
			break;
		case "huertos":
			date = new Date();
			filename = "huertos" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
			if(fs.existsSync(reporteInventarioSectorFolder + filename)){
				jsonfile.readFile(reporteInventarioSectorFolder + filename, (err, obj) => {
					console.log("Reading huertos file");
					if(err) throw err;
					res.send(obj);
				});
			}else{
				huertosPool.query(reporteInventarioSectorSQL, (err, result, fields) =>{
					if(err) throw err;
					console.log("Informacion de huertos Anterior Recibida");
					jsonfile.writeFile(reporteInventarioSectorFolder + filename, result, (err) => {
						if(err) throw err;
						console.log("archivo escrito");
						res.send(result);
					});
				});
			}
			break;
		case "torres":
			date = new Date();
			filename = "torres" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
			if(fs.existsSync(reporteInventarioSectorFolder + filename)){
				jsonfile.readFile(reporteInventarioSectorFolder + filename, (err, obj) => {
					console.log("Reading torres file");
					if(err) throw err;
					res.send(obj);
				});
			}else{
				torresPool.query(reporteInventarioSectorSQL, (err, result, fields) =>{
					if(err) throw err;
					console.log("Informacion de torres Anterior Recibida");
					jsonfile.writeFile(reporteInventarioSectorFolder + filename, result, (err) => {
						if(err) throw err;
						console.log("archivo escrito");
						res.send(result);
					});
				});
			}
			break;
		default:
			res.status(404).end();
	}
});

const reporteUtilidadArticuloFolder = "./files/ReporteUtilidadArticulo/";
router.get('/maestro/balance/reporteUtilidadArticulo/:farmacia', (req, res) => {
	const farmacia = req.params.farmacia;
	let filename;
	let date;
	switch(farmacia){
		case "villa":
			date = new Date();
			filename = "villa" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
			if(fs.existsSync(reporteUtilidadArticuloFolder + filename)){
				jsonfile.readFile(reporteUtilidadArticuloFolder + filename, (err, obj) => {
					console.log("Reading villa file");
					if(err) throw err;
					res.send(obj);
				});
			}else{
				villaPool.query(reporteUtilidadArticuloSQL, (err, result, fields) =>{
					if(err) throw err;
					console.log("Informacion de Villa Anterior Recibida");
					jsonfile.writeFile(reporteUtilidadArticuloFolder + filename, result, (err) => {
						if(err) throw err;
						console.log("archivo escrito");
						res.send(result);
					});
				});
			}
			break;
		case "sanpedro":
			date = new Date();
			filename = "sanpedro" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
			if(fs.existsSync(reporteUtilidadArticuloFolder + filename)){
				jsonfile.readFile(reporteUtilidadArticuloFolder + filename, (err, obj) => {
					console.log("Reading sanpedro file");
					if(err) throw err;
					res.send(obj);
				});
			}else{
				sanpedroPool.query(reporteUtilidadArticuloSQL, (err, result, fields) =>{
					if(err) throw err;
					console.log("Informacion de sanpedro Anterior Recibida");
					jsonfile.writeFile(reporteUtilidadArticuloFolder + filename, result, (err) => {
						if(err) throw err;
						console.log("archivo escrito");
						res.send(result);
					});
				});
			}
			break;
		case "arcos":
			date = new Date();
			filename = "arcos" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
			if(fs.existsSync(reporteUtilidadArticuloFolder + filename)){
				jsonfile.readFile(reporteUtilidadArticuloFolder + filename, (err, obj) => {
					console.log("Reading arcos file");
					if(err) throw err;
					res.send(obj);
				});
			}else{
				arcosPool.query(reporteUtilidadArticuloSQL, (err, result, fields) =>{
					if(err) throw err;
					console.log("Informacion de arcos Anterior Recibida");
					jsonfile.writeFile(reporteUtilidadArticuloFolder + filename, result, (err) => {
						if(err) throw err;
						console.log("archivo escrito");
						res.send(result);
					});
				});
			}
			break;
		case "empaques":
				date = new Date();
				filename = "empaques" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
				if(fs.existsSync(reporteUtilidadArticuloFolder + filename)){
					jsonfile.readFile(reporteUtilidadArticuloFolder + filename, (err, obj) => {
						console.log("Reading empaques file");
						if(err) throw err;
						res.send(obj);
					});
				}else{
					empaquesPool.query(reporteUtilidadArticuloSQL, (err, result, fields) =>{
						if(err) throw err;
						console.log("Informacion de empaques Anterior Recibida");
						jsonfile.writeFile(reporteUtilidadArticuloFolder + filename, result, (err) => {
							if(err) throw err;
							console.log("archivo escrito");
							res.send(result);
						});
					});
				}
			break;
		case "villajuarez":
			date = new Date();
			filename = "villajuarez" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
			if(fs.existsSync(reporteUtilidadArticuloFolder + filename)){
				jsonfile.readFile(reporteUtilidadArticuloFolder + filename, (err, obj) => {
					console.log("Reading villa juarez file");
					if(err) throw err;
					res.send(obj);
				});
			}else{
				villajuarezPool.query(reporteUtilidadArticuloSQL, (err, result, fields) =>{
					if(err) throw err;
					console.log("Informacion de villa juarez Anterior Recibida");
					jsonfile.writeFile(reporteUtilidadArticuloFolder + filename, result, (err) => {
						if(err) throw err;
						console.log("archivo escrito");
						res.send(result);
					});
				});
			}
			break;
		case "huertos":
			date = new Date();
			filename = "huertos" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
			if(fs.existsSync(reporteUtilidadArticuloFolder + filename)){
				jsonfile.readFile(reporteUtilidadArticuloFolder + filename, (err, obj) => {
					console.log("Reading huertos file");
					if(err) throw err;
					res.send(obj);
				});
			}else{
				huertosPool.query(reporteUtilidadArticuloSQL, (err, result, fields) =>{
					if(err) throw err;
					console.log("Informacion de huertos Anterior Recibida");
					jsonfile.writeFile(reporteUtilidadArticuloFolder + filename, result, (err) => {
						if(err) throw err;
						console.log("archivo escrito");
						res.send(result);
					});
				});
			}
			break;
		case "torres":
			date = new Date();
			filename = "torres" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
			if(fs.existsSync(reporteUtilidadArticuloFolder + filename)){
				jsonfile.readFile(reporteUtilidadArticuloFolder + filename, (err, obj) => {
					console.log("Reading torres file");
					if(err) throw err;
					res.send(obj);
				});
			}else{
				torresPool.query(reporteUtilidadArticuloSQL, (err, result, fields) =>{
					if(err) throw err;
					console.log("Informacion de torres Anterior Recibida");
					jsonfile.writeFile(reporteUtilidadArticuloFolder + filename, result, (err) => {
						if(err) throw err;
						console.log("archivo escrito");
						res.send(result);
					});
				});
			}
			break;
		default:
			res.status(404).end();
	}
});

const reporteUtilidadSectorFolder = "./files/ReporteUtilidadSector/";
router.get('/maestro/balance/reporteUtilidadSector/:farmacia', (req, res) => {
	const farmacia = req.params.farmacia;
	let filename;
	let date;
	switch(farmacia){
		case "villa":
			date = new Date();
			filename = "villa" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
			if(fs.existsSync(reporteUtilidadSectorFolder + filename)){
				jsonfile.readFile(reporteUtilidadSectorFolder + filename, (err, obj) => {
					console.log("Reading villa file");
					if(err) throw err;
					res.send(obj);
				});
			}else{
				villaPool.query(reporteUtilidadSectorSQL, (err, result, fields) =>{
					if(err) throw err;
					console.log("Informacion de Villa Anterior Recibida");
					jsonfile.writeFile(reporteUtilidadSectorFolder + filename, result, (err) => {
						if(err) throw err;
						console.log("archivo escrito");
						res.send(result);
					});
				});
			}
			break;
		case "sanpedro":
			date = new Date();
			filename = "sanpedro" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
			if(fs.existsSync(reporteUtilidadSectorFolder + filename)){
				jsonfile.readFile(reporteUtilidadSectorFolder + filename, (err, obj) => {
					console.log("Reading sanpedro file");
					if(err) throw err;
					res.send(obj);
				});
			}else{
				sanpedroPool.query(reporteUtilidadSectorSQL, (err, result, fields) =>{
					if(err) throw err;
					console.log("Informacion de sanpedro Anterior Recibida");
					jsonfile.writeFile(reporteUtilidadSectorFolder + filename, result, (err) => {
						if(err) throw err;
						console.log("archivo escrito");
						res.send(result);
					});
				});
			}
			break;
		case "arcos":
			date = new Date();
			filename = "arcos" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
			if(fs.existsSync(reporteUtilidadSectorFolder + filename)){
				jsonfile.readFile(reporteUtilidadSectorFolder + filename, (err, obj) => {
					console.log("Reading arcos file");
					if(err) throw err;
					res.send(obj);
				});
			}else{
				arcosPool.query(reporteUtilidadSectorSQL, (err, result, fields) =>{
					if(err) throw err;
					console.log("Informacion de arcos Anterior Recibida");
					jsonfile.writeFile(reporteUtilidadSectorFolder + filename, result, (err) => {
						if(err) throw err;
						console.log("archivo escrito");
						res.send(result);
					});
				});
			}
			break;
		case "empaques":
				date = new Date();
				filename = "empaques" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
				if(fs.existsSync(reporteUtilidadSectorFolder + filename)){
					jsonfile.readFile(reporteUtilidadSectorFolder + filename, (err, obj) => {
						console.log("Reading empaques file");
						if(err) throw err;
						res.send(obj);
					});
				}else{
					empaquesPool.query(reporteUtilidadSectorSQL, (err, result, fields) =>{
						if(err) throw err;
						console.log("Informacion de empaques Anterior Recibida");
						jsonfile.writeFile(reporteUtilidadSectorFolder + filename, result, (err) => {
							if(err) throw err;
							console.log("archivo escrito");
							res.send(result);
						});
					});
				}
			break;
		case "villajuarez":
			date = new Date();
			filename = "villajuarez" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
			if(fs.existsSync(reporteUtilidadSectorFolder + filename)){
				jsonfile.readFile(reporteUtilidadSectorFolder + filename, (err, obj) => {
					console.log("Reading villa juarez file");
					if(err) throw err;
					res.send(obj);
				});
			}else{
				villajuarezPool.query(reporteUtilidadSectorSQL, (err, result, fields) =>{
					if(err) throw err;
					console.log("Informacion de villa juarez Anterior Recibida");
					jsonfile.writeFile(reporteUtilidadSectorFolder + filename, result, (err) => {
						if(err) throw err;
						console.log("archivo escrito");
						res.send(result);
					});
				});
			}
			break;
		case "huertos":
			date = new Date();
			filename = "huertos" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
			if(fs.existsSync(reporteUtilidadSectorFolder + filename)){
				jsonfile.readFile(reporteUtilidadSectorFolder + filename, (err, obj) => {
					console.log("Reading huertos file");
					if(err) throw err;
					res.send(obj);
				});
			}else{
				huertosPool.query(reporteUtilidadSectorSQL, (err, result, fields) =>{
					if(err) throw err;
					console.log("Informacion de huertos Anterior Recibida");
					jsonfile.writeFile(reporteUtilidadSectorFolder + filename, result, (err) => {
						if(err) throw err;
						console.log("archivo escrito");
						res.send(result);
					});
				});
			}
			break;
		case "torres":
			date = new Date();
			filename = "torres" + "_" + date.getMonth() + "_" + date.getFullYear() + ".json";
			if(fs.existsSync(reporteUtilidadSectorFolder + filename)){
				jsonfile.readFile(reporteUtilidadSectorFolder + filename, (err, obj) => {
					console.log("Reading torres file");
					if(err) throw err;
					res.send(obj);
				});
			}else{
				torresPool.query(reporteUtilidadSectorSQL, (err, result, fields) =>{
					if(err) throw err;
					console.log("Informacion de torres Anterior Recibida");
					jsonfile.writeFile(reporteUtilidadSectorFolder + filename, result, (err) => {
						if(err) throw err;
						console.log("archivo escrito");
						res.send(result);
					});
				});
			}
			break;
		default:
			res.status(404).end();
	}
});

export default router;
