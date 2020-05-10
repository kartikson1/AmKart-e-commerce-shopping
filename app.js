const express = require("express"),
    mysql = require('mysql'),
    bodyParser  = require("body-parser"),
    LocalStrategy = require("passport-local").Strategy,
    bcrypt = require("bcrypt-nodejs");
const app = express();

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'iAmdata22',
  database : 'shop_app'
});

connection.connect((err) => {
  if(err){
   console.log(err);
  } else{
    console.log('MySQL connected!');
  }
})


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/groceries", (req, res) => {
  const q = "SELECT * FROM products where category = 'groceries'";
  connection.query(q, (err, results) => {
    if(err){
      console.log(err);
    } else{
      res.render("products", {data: results});
    }
  })
})

app.get("/clothing", (req, res) => {
  const q = "SELECT * FROM products where category = 'clothing'";
  connection.query(q, (err, results) => {
    if(err){
      console.log(err);
    } else{
      res.render("products", {data: results});
    }
  })
})

app.get("/electronics", (req, res) => {
  const q = "SELECT * FROM products where category = 'electronics'";
  connection.query(q, (err, results) => {
    if(err){
      console.log(err);
    } else{
      res.render("products", {data: results});
    }
  })
})

app.get("/:category/:id", (req, res) => {
  const q = "select * from products where product_id =" + req.params.id;
  connection.query(q, (err, result) => {
    if(err){
      console.log(err);
    } else{
      //console.log(result);
      //res.send("You reached show page for " + result[0].product_name);
      res.render("show", {item: result[0]});
    }
  }) 
})



var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Has Started!");
});
