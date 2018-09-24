import mongo from 'mongodb';

let MongoClient = mongo.MongoClient;
let url = "mongodb://localhost:27017/ppidb";
let urlauth = "mongodb://ppidb:PpIdB@localhost:27017/ppidb";
MongoClient.connect(urlauth, (err, db) => {
  if(err){
    console.log(err);
    return;
  }
  let query = {user:"superadmin"};
  db.collection("users").find(query).toArray((err,result) =>{
    if(err){
      console.log(error);
      return;
    }
    console.log(result);
    db.close();
  });
});
