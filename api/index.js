import express from 'express';
import querystring from 'querystring';
import xl from 'excel4node';
import mysql from 'mysql';

import config from '../config';
import mongo from 'mongodb';
let mongoClient = mongo.MongoClient;

//functions
import * as articulos from '../articulos';

const router = express.Router();
//cons

//direcciones de acceso mediante url
//index
router.get("/", (req, res) => {
  if(req.session && req.session.user){
    switch(req.session.role){
            case 0:
              res.redirect('/admin');
              break;
            case 1:
              res.redirect('/general');
              break;
            case 2:
              res.redirect('/supervisor');
              break;
            case 3:
              res.redirect('/compras');
              break;
            case 4:
              res.redirect('/inventario');
            case 50:
              res.redirect('/maestro');
          }
  }else{
    let error =  req.query.error;
    let invalidLogIn;
    let logInError;
    if(error){
      if(error === "noUser"){
        invalidLogIn = true;
        logInError = "Este usuario no existe";
      }else if(error === "notValid"){
        invalidLogIn = true;
        logInError = "El usuario o la contraseña estan incorrectos";
      }else{
        invalidLogIn = false;
      }
    }else{
      invalidLogIn = false;
    }
    console.log("Acceso a Log In");
    res.render("index", {
      headerTitle: "Log In",
      invalidLogIn,
      logInError
    });
  }
});

router.get("/verificandoAcceso", (req, res) => {
  res.redirect("/");
});

router.post("/verificandoAcceso", (req, res)=> {
  let user = req.body.username;
  let pwd = req.body.password;
  mongoClient.connect(config.ppidbUrl, (err, db) => {
    if(err) throw err;
    let query = {user};
    db.collection("users").find(query). toArray((err, result) => {
      if(err) throw err;
      if(result[0] && result[0]["user"] === user){
        if(result[0]["password"] === pwd){
          req.session.user = user;
          req.session.role = result[0]["role"];
          delete req.body.password;
          //validar roles
          switch(result[0]["role"]){
            case 0:
              res.redirect('/admin');
              break;
            case 1:
              res.redirect('/general');
              break;
            case 2:
              res.redirect('/supervisor');
              break;
            case 3:
              res.redirect('/compras');
              break;
            case 4:
              res.redirect('/inventario');
            case 50:
              res.redirect('/maestro');
          }

        }else{
          const query = querystring.stringify({
              "error":"notValid"
          });
          res.redirect('/?' + query);
        }
      }else{
        const query = querystring.stringify({
            "error":"noUser"
        });
        res.redirect('/?' + query);
      }
      db.close();
    });
  });

});

router.get("/admin", (req, res) => {
  if(req.session && req.session.role === 0){
    console.log("Acceso a admin");
    let msg =  req.query.msg;
    let validCreation = true; let created = false;let changed = false;let deleted = false;
    if(msg){
      if(msg === "noUser") validCreation = false;
      if(msg === "created") created = true;
      if(msg === "changed") changed = true;
      if(msg === "deleted") deleted = true;

    }
    mongoClient.connect(config.ppidbUrl, (err, db) => {
      if(err) throw err;
      db.collection("users").find(). toArray((err, result) => {
        if(err) throw err;
        res.render('admin', {
          headerTitle:"SuperAdmin",
          validCreation,
          created,
          changed,
          deleted,
          result
        });
        db.close();
      });
    });
  }else{
    res.redirect("/");
  }
});

router.get("/logout", (req, res) => {
  if(req.session && req.session.user){
    console.log("Logging out");
    req.session.reset();
    res.redirect("/");
  }else{
    res.redirect("/");
  }
});

router.get("/admin/crearUsuario", (req, res) => {
  res.redirect("/admin");
});

router.post("/admin/crearUsuario", (req, res) => {
  if(!req.session && req.session.role !== 0){
    res.redirect("/");
    return;
  }

  let user = req.body.username;
  let name = req.body.name;
  let role = parseInt(req.body.role);
  let password = req.body.password;
  delete req.body.password;
  delete req.body.cpassword;
  mongoClient.connect(config.ppidbUrl, (err, db) => {
    if(err) throw err;
    let query = {user};
    db.collection("users").find(query). toArray((err, result) => {
      if(err) throw err;
      if(result[0]){
        const query = querystring.stringify({
            "msg":"noUser"
        });
        console.log("Creacion invalida de usuario");
        res.redirect('/admin?' + query);
      }else{
        db.collection("users").insertOne({
            user,name,role,password
        }, (err, result) =>{
          if(err) throw err;
          const query = querystring.stringify({
              "msg":"created"
          });
          console.log("Usuario Creado");
          res.redirect('/admin?' + query);
        });
      }
      db.close();
    });
  });
});

router.get("/admin/changePassword", (req, res) => {
  res.redirect("/admin");
});

router.post("/admin/changePassword", (req, res) => {
  let user = req.body.username;
  let password = req.body.password;
  delete req.body.password;
  mongoClient.connect(config.ppidbUrl, (err, db) => {
    if(err) throw err;
    let query = {user};
    db.collection("users").update({user}, {$set: {password}}, (err, result) => {
      if(err) throw err;
      const query = querystring.stringify({
          "msg":"changed"
      });
      console.log("Contraseña cambiada");
      res.redirect('/admin/?' + query);
    });
  });
});

router.get("/admin/deleteUser", (req, res) => {
  res.redirect("/admin");
});

router.post("/admin/deleteUser", (req, res) => {
  let user = req.body.userIdDelete;
  mongoClient.connect(config.ppidbUrl, (err, db) => {
    if(err) throw err;
    let query = {user};
    db.collection("users").remove(query, (err, result) =>{
      if(err) throw err;
      const query = querystring.stringify({
          "msg":"deleted"
      });
      console.log("Usuario borrado");
      res.redirect('/admin/?' + query);
    });

  });
});





router.get("/general", (req, res) => {
  if(req.session && (req.session.role === 1 || req.session.role === 50)){
    console.log("Acceso a administrador general");
    res.render("general",{
      headerTitle: "Administrador General"
    });
  }else{
    res.redirect("/");
  }
});

router.get("/general/descargarVentaFarmacia", (req, res) =>{
  res.redirect("/");
});
router.post("/general/descargarVentaFarmacia", (req, res) => {
  console.log("Descargando excel");
  let data = JSON.parse(req.body.data);
  let mes = req.body.mes;
  let filename = "ReportedeVentas.xlsx";
  let workbook = new xl.Workbook();
  let sheet1 = workbook.addWorksheet('Hoja 1');
  let rowCount = 1;

  sheet1.cell(rowCount,1,rowCount++,8,true).string("Reporte de Ventas");
  sheet1.cell(rowCount, 1).string("Amecop");
  sheet1.cell(rowCount, 2).string("Nombre");
  sheet1.cell(rowCount, 3).string("Sector");
  sheet1.cell(rowCount, 4).string("nSector");
  sheet1.cell(rowCount, 5).string("Piezas");
  sheet1.cell(rowCount, 6).string("Importe");
  sheet1.cell(rowCount, 7).string("Iva");
  sheet1.cell(rowCount, 8).string("Descuento");
  sheet1.cell(rowCount++, 9).string("Total");

  let publico, n, descuento, iva, importe, total;
  let sumImporte = 0; let sumIva = 0; let sumDescuento = 0; let sumTotal = 0;
  for(let i = 0; i < data.length; i++){
    total = mes === "previo" ? data[i]["mesAnterior"] : data[i]["mesActual"];
    publico = data[i]["importe"] * (1 - data[i]["descuento"]) * (1 + data[i]["iva"]);
    n = total / publico;
    descuento = data[i]["descuento"] !== 0 ? n * (data[i]["importe"] * data[i]["descuento"]):0;
    iva = data[i]["iva"] !== 0 ? n * (data[i]["importe"] * (1 - data[i]["descuento"]) * data[i]["iva"]): 0;
    importe = n * data[i]["importe"];

    sumImporte += importe;
    sumIva += iva;
    sumDescuento += descuento;
    sumTotal += total;
    sheet1.cell(rowCount, 1).string(data[i]["amecop"]);
    sheet1.cell(rowCount, 2).string(data[i]["nombre"]);
    sheet1.cell(rowCount, 3).string(data[i]["cSector"]);
    sheet1.cell(rowCount, 4).string(data[i]["sectorN"]);
    sheet1.cell(rowCount, 5).number(data[i]["piezas"]);
    sheet1.cell(rowCount, 6).number(importe);
    sheet1.cell(rowCount, 7).number(iva);
    sheet1.cell(rowCount, 8).number(descuento);
    sheet1.cell(rowCount++, 9).number(total);
  }

  rowCount++;
  sheet1.cell(rowCount, 4).string("Total");
  sheet1.cell(rowCount, 5).number(sumImporte);
  sheet1.cell(rowCount, 6).number(sumIva);
  sheet1.cell(rowCount, 7).number(sumDescuento);
  sheet1.cell(rowCount++, 8).number(sumTotal);

  workbook.write(filename, res, (err, stats) => {
    if(err) throw err;
    res.send("<script> window.close() </script>");
  });
});

router.get("/general/descargarVentaTotal", (req, res) =>{
  res.redirect("/");
});
router.post("/general/descargarVentaTotal", (req, res) => {
  console.log("Descargando Excel");
  let data = JSON.parse(req.body.data);
  let mes = req.body.mes;
  let filename = "ReportedeVentas.xlsx";
  let workbook = new xl.Workbook();
  let rowCount;
  let sheet;
  let publico, n, descuento, iva, importe, total;
  let totales = {
    villa:{"importe":0, "iva":0, "descuento":0, "total":0},
    sanpedro:{"importe":0, "iva":0, "descuento":0, "total":0},
    arcos:{"importe":0, "iva":0, "descuento":0, "total":0},
    empaques:{"importe":0, "iva":0, "descuento":0, "total":0},
    villajuarez:{"importe":0, "iva":0, "descuento":0, "total":0},
    huertos:{"importe":0, "iva":0, "descuento":0, "total":0},
    torres:{"importe":0, "iva":0, "descuento":0, "total":0},
  };
  let sumTotales = {"importe":0, "iva":0, "descuento":0, "total":0};
  Object.keys(data).map(key => {
    sheet = workbook.addWorksheet(key);
    rowCount = 1;

    sheet.cell(rowCount,1,rowCount++,8,true).string("Reporte de Ventas");
    sheet.cell(rowCount, 1).string("Amecop");
    sheet.cell(rowCount, 2).string("Nombre");
    sheet.cell(rowCount, 3).string("Sector");
    sheet.cell(rowCount, 4).string("nSector");
    sheet.cell(rowCount, 5).string("Piezas");
    sheet.cell(rowCount, 6).string("Importe");
    sheet.cell(rowCount, 7).string("Iva");
    sheet.cell(rowCount, 8).string("Descuento");
    sheet.cell(rowCount++, 9).string("Total");

    for(let i = 0; i < data[key].length; i++){
      total = mes === "previo" ? data[key][i]["mesAnterior"] : data[key][i]["mesActual"];
      publico = data[key][i]["importe"] * (1 - data[key][i]["descuento"]) * (1 + data[key][i]["iva"]);
      n = total / publico;
      descuento = data[key][i]["descuento"] !== 0 ? n * (data[key][i]["importe"] * data[key][i]["descuento"]):0;
      iva = data[key][i]["iva"] !== 0 ? n * (data[key][i]["importe"] * (1 - data[key][i]["descuento"]) * data[key][i]["iva"]): 0;
      importe = n * data[key][i]["importe"];

      totales[key]["importe"] += importe;
      totales[key]["iva"] += iva;
      totales[key]["descuento"] += descuento;
      totales[key]["total"] += total;
      sumTotales["importe"] += importe;
      sumTotales["iva"] += iva;
      sumTotales["descuento"] += descuento;
      sumTotales["total"] += total;

      sheet.cell(rowCount, 1).string(data[key][i]["amecop"]);
      sheet.cell(rowCount, 2).string(data[key][i]["nombre"]);
      sheet.cell(rowCount, 3).string(data[key][i]["cSector"]);
      sheet.cell(rowCount, 4).string(data[key][i]["sectorN"]);
      sheet.cell(rowCount, 5).number(data[key][i]["piezas"]);
      sheet.cell(rowCount, 6).number(importe);
      sheet.cell(rowCount, 7).number(iva);
      sheet.cell(rowCount, 8).number(descuento);
      sheet.cell(rowCount++, 9).number(total);
    }
    rowCount++;
    sheet.cell(rowCount, 4).string("Total");
    sheet.cell(rowCount, 5).number(totales[key]["importe"]);
    sheet.cell(rowCount, 6).number(totales[key]["iva"]);
    sheet.cell(rowCount, 7).number(totales[key]["descuento"]);
    sheet.cell(rowCount++, 8).number(totales[key]["total"]);

  });

  //total
  sheet = workbook.addWorksheet("Totales");
  rowCount = 1;

  sheet.cell(rowCount,1,rowCount++,8,true).string("Reporte de Ventas");
  sheet.cell(rowCount, 1).string("Farmacia");
  sheet.cell(rowCount, 2).string("Importe");
  sheet.cell(rowCount, 3).string("Iva");
  sheet.cell(rowCount, 4).string("Descuento");
  sheet.cell(rowCount++, 5).string("Total");

  Object.keys(totales).map(key => {
    sheet.cell(rowCount, 1).string(key);
    sheet.cell(rowCount, 2).number(totales[key]["importe"]);
    sheet.cell(rowCount, 3).number(totales[key]["iva"]);
    sheet.cell(rowCount, 4).number(totales[key]["descuento"]);
    sheet.cell(rowCount++, 5).number(totales[key]["total"]);
  });

  sheet.cell(rowCount, 1).string("TOTAL");
  sheet.cell(rowCount, 2).number(sumTotales["importe"]);
  sheet.cell(rowCount, 3).number(sumTotales["iva"]);
  sheet.cell(rowCount, 4).number(sumTotales["descuento"]);
  sheet.cell(rowCount++, 5).number(sumTotales["total"]);

  workbook.write(filename, res, (err, stats) => {
    if(err) throw err;
    res.send("<script> window.close() </script>");
  });

});

router.get("/general/historial", (req, res) => {
  if(req.session && req.session.role == 1){
    res.render("general_historial", {
      headerTitle:"Historial Reporte Ventas"
    });
  }else{
    res.redirect("/");
  }
});

router.post("/general/historial/descargarMesVenta", (req, res) =>{
  res.send("hola");
});

router.get("/general/capturaGastos", (req, res) => {
  //if(req.session && (req.session.role === 1 || req.session.role === 50 )){
    res.render("general_captura_gastos", {
      headerTitle:"Captura Gastos"
    });
  //}else{
  //  res.redirect("/");
  //}
});

router.get("/supervisor", (req, res) => {
  if(req.session && req.session.role === 2){
    res.render("supervisor", {
      headerTitle: "Supervisor"
    });
  }else{
    res.redirect("/");
  }
});
router.get("/inventario", (req, res) => {
  if(req.session && (req.session.role === 4 || req.session.role === 50)){
    console.log("Acceso de inventario");
    res.render("inventario", {
      headerTitle: "Control de Inventarios",
      doReport:false,
      reporte:"{}"
    });
  }else{
    res.redirect("/");
  }
});

router.post("/inventario", (req, res) => {
  let body = req.body;
  console.log("Acceso a inventario con reporte");
  res.render("inventario", {
    headerTitle: "Control de Inventarios",
    doReport:true,
    reporte:req.body.articulosJSON
  });
});

router.get("/inventario/descargarPromociones", (req,res) => {
  res.redirect("/");
});

router.post("/inventario/descargarPromociones", (req, res) => {
  console.log("Descargar excel promociones");
  let data = JSON.parse(req.body.data);
  let filename = "ReportePromociones.xlsx";
  let workbook = new xl.Workbook();
  let rowCount;
  let sheet;

  sheet = workbook.addWorksheet("Hoja 1");
  rowCount = 1;

  sheet.cell(rowCount,1,rowCount++,8,true).string("Reporte de Promociones");
  rowCount++;
  Object.keys(data).map(key => {

    sheet.cell(rowCount,1,rowCount++,2,true).string(key);
    sheet.cell(rowCount,1).string("Producto");
    sheet.cell(rowCount++,2).string("Numero de Promociones");
    for(let i = 0; i < data[key].length; i++){
      sheet.cell(rowCount, 1).string(data[key][i]["nombre"]);
      sheet.cell(rowCount++, 2).number(data[key][i]["cantidad"]);
    }
    rowCount++;
  });

  workbook.write(filename, res, (err, stats) => {
    if(err) throw err;
    res.send("<script> window.close() </script>");
  });
});

router.get("/compras", (req, res) => {
  if(req.session && req.session.role === 3){
    console.log("Acceso a compras");
    res.render("compras", {
      headerTitle: "Compras"
    });
  }else{
    res.redirect("/");
  }
});

router.get("/compras/actualizarArticulos", (req,res) => {
  if(req.session && req.session.role === 3){
    articulos.actualizarArticulos();
    res.send("<script> window.close() </script>");
  }else{
    res.redirect("/compras");
  }
});

router.get("/maestro", (req, res) => {
  if(req.session && req.session.role === 50){
    res.render("maestro", {
      headerTitle: "Maestro"
    });
  }else{
    res.redirect("/");
  }
});
router.get("/maestro/ventaArticulos", (req, res) =>{
  if(req.session && req.session.role === 50){
    res.render("maestro_balance_ventaArticulos", {
      headerTitle: "Balance Venta por Articulos"
    });
  }else{
    res.redirect("/");
  }
});
router.post("/maestro/ventaArticulos/descargarTabla", (req, res) => {
  console.log("Descargar excel promociones");
  let data = JSON.parse(req.body.data);
  let filename = "ReporteVentasporArticulo.xlsx";
  let workbook = new xl.Workbook();
  let rowCount;
  let sheet;

  sheet = workbook.addWorksheet("Hoja 1");
  rowCount = 1;

  sheet.cell(rowCount,1,rowCount++,8,true).string("Reporte de Ventas por Articulo");
  rowCount++;
  let totales = {"villa":0, "sanpedro":0, "arcos":0, "empaques":0, "villajuarez":0, "huertos":0, "torres":0};
  sheet.cell(rowCount,1).string("Sector");
  sheet.cell(rowCount,2).string("Amecop");
  sheet.cell(rowCount,3).string("Producto");
  sheet.cell(rowCount,4).string("Villa Colonial");
  sheet.cell(rowCount,5).string("San Pedro");
  sheet.cell(rowCount,6).string("Arcos");
  sheet.cell(rowCount,7).string("Empaques");
  sheet.cell(rowCount,8).string("Villa Juarez");
  sheet.cell(rowCount,9).string("Huertos");
  sheet.cell(rowCount++,10).string("Torres");
  let villa, sanpedro, arcos, empaques, villajuarez, huertos, torres;
  Object.keys(data).map(key => {

    villa = data[key]["villa"] ? data[key]["villa"] : 0;
    totales["villa"] += villa;
    sanpedro = data[key]["sanpedro"] ? data[key]["sanpedro"] : 0;
    totales["sanpedro"] += sanpedro;
    arcos = data[key]["arcos"] ? data[key]["arcos"] : 0;
    totales["arcos"] += arcos;
    empaques = data[key]["empaques"] ? data[key]["empaques"] : 0;
    totales["empaques"] += empaques;
    villajuarez = data[key]["villajuarez"] ? data[key]["villajuarez"] : 0;
    totales["villajuarez"] += villajuarez;
    huertos = data[key]["huertos"] ? data[key]["huertos"] : 0;
    totales["huertos"] += huertos;
    torres = data[key]["torres"] ? data[key]["torres"] : 0;
    totales["torres"] += torres;
    sheet.cell(rowCount, 1).string(data[key]["sector"]);
    sheet.cell(rowCount, 2).string(data[key]["amecop"]);
    sheet.cell(rowCount, 3).string(key);
    sheet.cell(rowCount, 4).number(villa);
    sheet.cell(rowCount, 5).number(sanpedro);
    sheet.cell(rowCount, 6).number(arcos);
    sheet.cell(rowCount, 7).number(empaques);
    sheet.cell(rowCount, 8).number(villajuarez);
    sheet.cell(rowCount, 9).number(huertos);
    sheet.cell(rowCount++, 10).number(torres);
  });
  sheet.cell(rowCount, 1,rowCount, 3, true).string("TOTALES");
  sheet.cell(rowCount, 4).number(totales["villa"]);
  sheet.cell(rowCount, 5).number(totales["sanpedro"]);
  sheet.cell(rowCount, 6).number(totales["arcos"]);
  sheet.cell(rowCount, 7).number(totales["empaques"]);
  sheet.cell(rowCount, 8).number(totales["villajuarez"]);
  sheet.cell(rowCount, 9).number(totales["huertos"]);
  sheet.cell(rowCount++, 10).number(totales["torres"]);


  workbook.write(filename, res, (err, stats) => {
    if(err) throw err;
    res.send("<script> window.close() </script>");
  });
});

router.get("/maestro/ventaSector", (req, res) =>{
  if(req.session && req.session.role === 50){
    res.render("maestro_balance_ventaSector", {
      headerTitle: "Balance Venta por Sector"
    });
  }else{
    res.redirect("/");
  }
});

router.post("/maestro/ventaSector/descargarTabla", (req, res) => {
  console.log("Descargar excel promociones");
  let data = JSON.parse(req.body.data);
  let filename = "ReporteVentasporSector.xlsx";
  let workbook = new xl.Workbook();
  let rowCount;
  let sheet;

  sheet = workbook.addWorksheet("Hoja 1");
  rowCount = 1;

  sheet.cell(rowCount,1,rowCount++,8,true).string("Reporte de Ventas por Sector");
  rowCount++;
  let totales = {"villa":0, "sanpedro":0, "arcos":0, "empaques":0, "villajuarez":0, "huertos":0, "torres":0};
  sheet.cell(rowCount,1).string("cSector");
  sheet.cell(rowCount,2).string("Sector");
  sheet.cell(rowCount,3).string("Villa Colonial");
  sheet.cell(rowCount,4).string("San Pedro");
  sheet.cell(rowCount,5).string("Arcos");
  sheet.cell(rowCount,6).string("Empaques");
  sheet.cell(rowCount,7).string("Villa Juarez");
  sheet.cell(rowCount,8).string("Huertos");
  sheet.cell(rowCount++,9).string("Torres");
  let villa, sanpedro, arcos, empaques, villajuarez, huertos, torres;
  Object.keys(data).map(key => {

    villa = data[key]["villa"] ? data[key]["villa"] : 0;
    totales["villa"] += villa;
    sanpedro = data[key]["sanpedro"] ? data[key]["sanpedro"] : 0;
    totales["sanpedro"] += sanpedro;
    arcos = data[key]["arcos"] ? data[key]["arcos"] : 0;
    totales["arcos"] += arcos;
    empaques = data[key]["empaques"] ? data[key]["empaques"] : 0;
    totales["empaques"] += empaques;
    villajuarez = data[key]["villajuarez"] ? data[key]["villajuarez"] : 0;
    totales["villajuarez"] += villajuarez;
    huertos = data[key]["huertos"] ? data[key]["huertos"] : 0;
    totales["huertos"] += huertos;
    torres = data[key]["torres"] ? data[key]["torres"] : 0;
    totales["torres"] += torres;
    sheet.cell(rowCount,1).string(data[key]["cSector"]);
    sheet.cell(rowCount, 2).string(key);
    sheet.cell(rowCount, 3).number(villa);
    sheet.cell(rowCount, 4).number(sanpedro);
    sheet.cell(rowCount, 5).number(arcos);
    sheet.cell(rowCount, 6).number(empaques);
    sheet.cell(rowCount, 7).number(villajuarez);
    sheet.cell(rowCount, 8).number(huertos);
    sheet.cell(rowCount++, 9).number(torres);
  });
  sheet.cell(rowCount, 1,rowCount,2,true).string("TOTALES");
  sheet.cell(rowCount, 3).number(totales["villa"]);
  sheet.cell(rowCount, 4).number(totales["sanpedro"]);
  sheet.cell(rowCount, 5).number(totales["arcos"]);
  sheet.cell(rowCount, 6).number(totales["empaques"]);
  sheet.cell(rowCount, 7).number(totales["villajuarez"]);
  sheet.cell(rowCount, 8).number(totales["huertos"]);
  sheet.cell(rowCount++, 9).number(totales["torres"]);


  workbook.write(filename, res, (err, stats) => {
    if(err) throw err;
    res.send("<script> window.close() </script>");
  });
});

router.get("/maestro/inventarioArticulo", (req, res) =>{
  if(req.session && req.session.role === 50){
    res.render("maestro_balance_inventarioArticulo", {
      headerTitle: "Balance Inventario por Articulo"
    });
  }else{
    res.redirect("/");
  }
});

router.post("/maestro/inventarioArticulo/descargarTabla", (req, res) => {
  console.log("Descargar excel promociones");
  let data = JSON.parse(req.body.data);
  let filename = "ReporteInventarioSector.xlsx";
  let workbook = new xl.Workbook();
  let rowCount;
  let sheet;

  sheet = workbook.addWorksheet("Hoja 1");
  rowCount = 1;

  sheet.cell(rowCount,1,rowCount++,8,true).string("Reporte de Inventario por Articulo");
  rowCount++;
  sheet.cell(rowCount,1).string("Sector");
  sheet.cell(rowCount,2).string("Amecop");
  sheet.cell(rowCount,3).string("Producto");
  sheet.cell(rowCount,4).string("Villa Colonial");
  sheet.cell(rowCount,5).string("San Pedro");
  sheet.cell(rowCount,6).string("Arcos");
  sheet.cell(rowCount,7).string("Empaques");
  sheet.cell(rowCount,8).string("Villa Juarez");
  sheet.cell(rowCount,9).string("Huertos");
  sheet.cell(rowCount++,10).string("Torres");
  let totales = {"villa":0, "sanpedro":0, "arcos":0, "empaques":0, "villajuarez":0, "huertos":0, "torres":0};
  let villa, sanpedro, arcos, empaques, villajuarez, huertos, torres;
  Object.keys(data).map(key => {

    villa = data[key]["villa"] ? data[key]["villa"] : 0;
    totales["villa"] += villa;
    sanpedro = data[key]["sanpedro"] ? data[key]["sanpedro"] : 0;
    totales["sanpedro"] += sanpedro;
    arcos = data[key]["arcos"] ? data[key]["arcos"] : 0;
    totales["arcos"] += arcos;
    empaques = data[key]["empaques"] ? data[key]["empaques"] : 0;
    totales["empaques"] += empaques;
    villajuarez = data[key]["villajuarez"] ? data[key]["villajuarez"] : 0;
    totales["villajuarez"] += villajuarez;
    huertos = data[key]["huertos"] ? data[key]["huertos"] : 0;
    totales["huertos"] += huertos;
    torres = data[key]["torres"] ? data[key]["torres"] : 0;
    totales["torres"] += torres;
    sheet.cell(rowCount, 1).string(data[key]["sector"]);
    sheet.cell(rowCount, 2).string(data[key]["amecop"]);
    sheet.cell(rowCount, 3).string(key);
    sheet.cell(rowCount, 4).number(villa);
    sheet.cell(rowCount, 5).number(sanpedro);
    sheet.cell(rowCount, 6).number(arcos);
    sheet.cell(rowCount, 7).number(empaques);
    sheet.cell(rowCount, 8).number(villajuarez);
    sheet.cell(rowCount, 9).number(huertos);
    sheet.cell(rowCount++, 10).number(torres);
  });
  sheet.cell(rowCount, 1,rowCount, 3, true).string("TOTALES");
  sheet.cell(rowCount, 4).number(totales["villa"]);
  sheet.cell(rowCount, 5).number(totales["sanpedro"]);
  sheet.cell(rowCount, 6).number(totales["arcos"]);
  sheet.cell(rowCount, 7).number(totales["empaques"]);
  sheet.cell(rowCount, 8).number(totales["villajuarez"]);
  sheet.cell(rowCount, 9).number(totales["huertos"]);
  sheet.cell(rowCount++, 10).number(totales["torres"]);


  workbook.write(filename, res, (err, stats) => {
    if(err) throw err;
    res.send("<script> window.close() </script>");
  });
});

router.get("/maestro/inventarioSector", (req, res) =>{
  if(req.session && req.session.role === 50){
    res.render("maestro_balance_inventarioSector", {
      headerTitle: "Balance Inventario por Sector"
    });
  }else{
    res.redirect("/");
  }
});

router.post("/maestro/inventarioSector/descargarTabla", (req, res) => {
  console.log("Descargar excel promociones");
  let data = JSON.parse(req.body.data);
  let filename = "ReporteInventarioSector.xlsx";
  let workbook = new xl.Workbook();
  let rowCount;
  let sheet;

  sheet = workbook.addWorksheet("Hoja 1");
  rowCount = 1;

  sheet.cell(rowCount,1,rowCount++,8,true).string("Reporte de Inventario por Sector");
  rowCount++;
  sheet.cell(rowCount,1).string("cSector");
  sheet.cell(rowCount,2).string("Sector");
  sheet.cell(rowCount,3).string("Villa Colonial");
  sheet.cell(rowCount,4).string("San Pedro");
  sheet.cell(rowCount,5).string("Arcos");
  sheet.cell(rowCount,6).string("Empaques");
  sheet.cell(rowCount,7).string("Villa Juarez");
  sheet.cell(rowCount,8).string("Huertos");
  sheet.cell(rowCount++,9).string("Torres");
  let totales = {"villa":0, "sanpedro":0, "arcos":0, "empaques":0, "villajuarez":0, "huertos":0, "torres":0};
  let villa, sanpedro, arcos, empaques, villajuarez, huertos, torres;
  Object.keys(data).map(key => {

    villa = data[key]["villa"] ? data[key]["villa"] : 0;
    totales["villa"] += villa;
    sanpedro = data[key]["sanpedro"] ? data[key]["sanpedro"] : 0;
    totales["sanpedro"] += sanpedro;
    arcos = data[key]["arcos"] ? data[key]["arcos"] : 0;
    totales["arcos"] += arcos;
    empaques = data[key]["empaques"] ? data[key]["empaques"] : 0;
    totales["empaques"] += empaques;
    villajuarez = data[key]["villajuarez"] ? data[key]["villajuarez"] : 0;
    totales["villajuarez"] += villajuarez;
    huertos = data[key]["huertos"] ? data[key]["huertos"] : 0;
    totales["huertos"] += huertos;
    torres = data[key]["torres"] ? data[key]["torres"] : 0;
    totales["torres"] += torres;
    sheet.cell(rowCount,1).string(data[key]["cSector"]);
    sheet.cell(rowCount, 2).string(key);
    sheet.cell(rowCount, 3).number(villa);
    sheet.cell(rowCount, 4).number(sanpedro);
    sheet.cell(rowCount, 5).number(arcos);
    sheet.cell(rowCount, 6).number(empaques);
    sheet.cell(rowCount, 7).number(villajuarez);
    sheet.cell(rowCount, 8).number(huertos);
    sheet.cell(rowCount++, 9).number(torres);
  });
  sheet.cell(rowCount, 1,rowCount,2,true).string("TOTALES");
  sheet.cell(rowCount, 3).number(totales["villa"]);
  sheet.cell(rowCount, 4).number(totales["sanpedro"]);
  sheet.cell(rowCount, 5).number(totales["arcos"]);
  sheet.cell(rowCount, 6).number(totales["empaques"]);
  sheet.cell(rowCount, 7).number(totales["villajuarez"]);
  sheet.cell(rowCount, 8).number(totales["huertos"]);
  sheet.cell(rowCount++, 9).number(totales["torres"]);



  workbook.write(filename, res, (err, stats) => {
    if(err) throw err;
    res.send("<script> window.close() </script>");
  });
});

router.get("/maestro/utilidadArticulo", (req, res) =>{
  if(req.session && req.session.role === 50){
    res.render("maestro_balance_utilidadArticulo", {
      headerTitle: "Balance Utilidad Por Articulo"
    });
  }else{
    res.redirect("/");
  }
});

router.post("/maestro/utilidadArticulo/descargarTabla", (req, res) => {
  console.log("Descargar excel promociones");
  let data = JSON.parse(req.body.data);
  let filename = "ReporteUtilidadporArticulo.xlsx";
  let workbook = new xl.Workbook();
  let rowCount;
  let sheet;

  sheet = workbook.addWorksheet("Hoja 1");
  rowCount = 1;

  sheet.cell(rowCount,1,rowCount++,8,true).string("Reporte de Utilidad por Articulo");
  rowCount++;
  let totales = {"villa":0, "sanpedro":0, "arcos":0, "empaques":0, "villajuarez":0, "huertos":0, "torres":0};

  sheet.cell(rowCount,1).string("Sector");
  sheet.cell(rowCount,2).string("Amecop");
  sheet.cell(rowCount,3).string("Producto");
  sheet.cell(rowCount,4).string("Villa Colonial");
  sheet.cell(rowCount,5).string("San Pedro");
  sheet.cell(rowCount,6).string("Arcos");
  sheet.cell(rowCount,7).string("Empaques");
  sheet.cell(rowCount,8).string("Villa Juarez");
  sheet.cell(rowCount,9).string("Huertos");
  sheet.cell(rowCount++,10).string("Torres");
  let villa, sanpedro, arcos, empaques, villajuarez, huertos, torres;
  Object.keys(data).map(key => {

    villa = data[key]["villa"] ? data[key]["villa"] : 0;
    totales["villa"] += villa;
    sanpedro = data[key]["sanpedro"] ? data[key]["sanpedro"] : 0;
    totales["sanpedro"] += sanpedro;
    arcos = data[key]["arcos"] ? data[key]["arcos"] : 0;
    totales["arcos"] += arcos;
    empaques = data[key]["empaques"] ? data[key]["empaques"] : 0;
    totales["empaques"] += empaques;
    villajuarez = data[key]["villajuarez"] ? data[key]["villajuarez"] : 0;
    totales["villajuarez"] += villajuarez;
    huertos = data[key]["huertos"] ? data[key]["huertos"] : 0;
    totales["huertos"] += huertos;
    torres = data[key]["torres"] ? data[key]["torres"] : 0;
    totales["torres"] += torres;
    sheet.cell(rowCount, 1).string(data[key]["sector"]);
    sheet.cell(rowCount, 2).string(data[key]["amecop"]);
    sheet.cell(rowCount, 3).string(key);
    sheet.cell(rowCount, 4).number(villa);
    sheet.cell(rowCount, 5).number(sanpedro);
    sheet.cell(rowCount, 6).number(arcos);
    sheet.cell(rowCount, 7).number(empaques);
    sheet.cell(rowCount, 8).number(villajuarez);
    sheet.cell(rowCount, 9).number(huertos);
    sheet.cell(rowCount++, 10).number(torres);
  });
  sheet.cell(rowCount, 1,rowCount, 3, true).string("TOTALES");
  sheet.cell(rowCount, 4).number(totales["villa"]);
  sheet.cell(rowCount, 5).number(totales["sanpedro"]);
  sheet.cell(rowCount, 6).number(totales["arcos"]);
  sheet.cell(rowCount, 7).number(totales["empaques"]);
  sheet.cell(rowCount, 8).number(totales["villajuarez"]);
  sheet.cell(rowCount, 9).number(totales["huertos"]);
  sheet.cell(rowCount++, 10).number(totales["torres"]);


  workbook.write(filename, res, (err, stats) => {
    if(err) throw err;
    res.send("<script> window.close() </script>");
  });
});

router.get("/maestro/utilidadSector", (req, res) =>{
  if(req.session && req.session.role === 50){
    res.render("maestro_balance_utilidadSector", {
      headerTitle: "Balance Utilidad Por Sector"
    });
  }else{
    res.redirect("/");
  }
});

router.post("/maestro/utilidadSector/descargarTabla", (req, res) => {
  console.log("Descargar excel promociones");
  let data = JSON.parse(req.body.data);
  let filename = "ReporteUtilidadporSector.xlsx";
  let workbook = new xl.Workbook();
  let rowCount;
  let sheet;

  sheet = workbook.addWorksheet("Hoja 1");
  rowCount = 1;

  sheet.cell(rowCount,1,rowCount++,8,true).string("Reporte de Utilidad por Sector");
  rowCount++;
  let totales = {"villa":0, "sanpedro":0, "arcos":0, "empaques":0, "villajuarez":0, "huertos":0, "torres":0};
  sheet.cell(rowCount,1).string("cSector");
  sheet.cell(rowCount,2).string("Sector");
  sheet.cell(rowCount,3).string("Villa Colonial");
  sheet.cell(rowCount,4).string("San Pedro");
  sheet.cell(rowCount,5).string("Arcos");
  sheet.cell(rowCount,6).string("Empaques");
  sheet.cell(rowCount,7).string("Villa Juarez");
  sheet.cell(rowCount,8).string("Huertos");
  sheet.cell(rowCount++,9).string("Torres");
  let villa, sanpedro, arcos, empaques, villajuarez, huertos, torres;
  Object.keys(data).map(key => {

    villa = data[key]["villa"] ? data[key]["villa"] : 0;
    totales["villa"] += villa;
    sanpedro = data[key]["sanpedro"] ? data[key]["sanpedro"] : 0;
    totales["sanpedro"] += sanpedro;
    arcos = data[key]["arcos"] ? data[key]["arcos"] : 0;
    totales["arcos"] += arcos;
    empaques = data[key]["empaques"] ? data[key]["empaques"] : 0;
    totales["empaques"] += empaques;
    villajuarez = data[key]["villajuarez"] ? data[key]["villajuarez"] : 0;
    totales["villajuarez"] += villajuarez;
    huertos = data[key]["huertos"] ? data[key]["huertos"] : 0;
    totales["huertos"] += huertos;
    torres = data[key]["torres"] ? data[key]["torres"] : 0;
    totales["torres"] += torres;
    sheet.cell(rowCount,1).string(data[key]["cSector"]);
    sheet.cell(rowCount, 2).string(key);
    sheet.cell(rowCount, 3).number(villa);
    sheet.cell(rowCount, 4).number(sanpedro);
    sheet.cell(rowCount, 5).number(arcos);
    sheet.cell(rowCount, 6).number(empaques);
    sheet.cell(rowCount, 7).number(villajuarez);
    sheet.cell(rowCount, 8).number(huertos);
    sheet.cell(rowCount++, 9).number(torres);
  });
  sheet.cell(rowCount, 1,rowCount,2,true).string("TOTALES");
  sheet.cell(rowCount, 3).number(totales["villa"]);
  sheet.cell(rowCount, 4).number(totales["sanpedro"]);
  sheet.cell(rowCount, 5).number(totales["arcos"]);
  sheet.cell(rowCount, 6).number(totales["empaques"]);
  sheet.cell(rowCount, 7).number(totales["villajuarez"]);
  sheet.cell(rowCount, 8).number(totales["huertos"]);
  sheet.cell(rowCount++, 9).number(totales["torres"]);


  workbook.write(filename, res, (err, stats) => {
    if(err) throw err;
    res.send("<script> window.close() </script>");
  });
});

export default router;
