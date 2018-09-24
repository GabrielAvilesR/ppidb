import mongo from 'mongodb';

import mysql from 'mysql';
import config from './config';


let MongoClient = mongo.MongoClient;
let urlauth = "mongodb://ppidb:PpIdB@192.168.4.29:27017/ppidb";

/*MongoClient.connect(urlauth, (err, db) => {
	if(err) throw err;
	console.log("hello");
	db.collection("articulos").find({}).toArray((err, result) =>{
		if(err) throw err;
		console.log(result);
		db.close();
	});


});*/




export const actualizarArticulos = () => {
	let con = mysql.createConnection({
		host: config.mysqlInfo.hostname,
		user: config.mysqlInfo.user,
		password: config.mysqlInfo.pwd,
		database:config.mysqlInfo.dbs[0]
	});


	MongoClient.connect(config.ppidbUrl, (err, db) => {
		if(err) throw err;
		console.log("Actualizando articulos:");
		db.collection("articulos").remove({}, (err, removed)=>{
			con.connect(function(err) {
			  if (err) throw err;
				let sql = "SELECT a_nombre " +
									"FROM articulo " +
									"NATURAL JOIN acumuladoarticulo " +
									"WHERE a_vta_pes_mes > 0 OR a_vta_pes_mes_a > 0 " +
									"ORDER BY a_nombre";
			  con.query(sql, function (err, result, fields) {
					if(err) throw err;
			    Object.keys(result).map(key => {
							db.collection("articulos").insertOne({nombre: result[key]["a_nombre"]}, (err, done) => {
								if(err) throw err;
								console.log("actualizando articulo:" + (key+1) + "/" +result.length);

							});
			  	});
				});
			});
		});
	});
};
