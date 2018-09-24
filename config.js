const env = process.env;

export default {
  port: env.PORT || 8080,
  host: env.HOST || '192.168.4.3',
  get serverUrl(){
    return `http://${this.host}:${this.port}`;
  },
  //mongodb ppidb database url with user:password@ip:port/db
  ppidbUrl: "mongodb://ppidb:PpIdB@localhost:27017/ppidb",
  mysqlInfo: {
  	hostname:"", //preguntar por esta informacion al responsable (cambiaron servidores)
  	user:"", 
  	pwd:"",
  	dbs:[
  		"villa", "san pedro", "arcos", "empaques", "villa juarez", "huertos", "bodega50"
  	]
  }
};
