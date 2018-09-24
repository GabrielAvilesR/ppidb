import mysql from 'mysql';

var con = mysql.createConnection({
  host: "localhost",
  user: "test",
  password: "test",
  database:"test"
});



con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  let sql = "SELECT * FROM ventas";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(fields);
    console.log("Result: " + result[0].amecop);
  });

  con.end();
});

//end connection 