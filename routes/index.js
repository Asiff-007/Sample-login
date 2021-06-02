var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var title=""

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{title});
});

//submit action
router.post('/submit', function(req, res, next) {

//database connection
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("user");

    var query = { email: req.body.email };
     
    //data fetch
     dbo.collection("login").find(query).toArray(function(err, result) {
     if (err) throw err;
    

     //cheching password matching
    if(result[0].pw==req.body.pw){
        console.log("Succes")
        res.render('submit')
        title=""
      
      }
      
   else{
      console.log("fail")
      title="User Name or Password Incorrect"
      res.redirect('/')
      
      }


      db.close();
    });
  });





 
});

module.exports = router;
