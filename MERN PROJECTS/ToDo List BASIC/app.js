// tempelating engine

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

console.log(date);

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


// the way where you can use the ejs
app.set("view engine", "ejs");

// javascrit's array works different way in terms of constants and variables
const items = ["Buy Food", "Cook Food", "Eat Food"];
const itemsWork = [];

app.get("/", function (req, res) {
  
  let day = date.getDay();
  // this will render the list.ejs file and this render function will
  // see the files of the mentioned name in the views folder
  res.render("list", { listTitle: day, newAddedItem : items});
});

app.post("/", function(req, res){

    let item = req.body.newItem;
    // 
    if (req.body.list === "Work List"){

      itemsWork.push(item);
      res.redirect("/work");

    } else{
      items.push(item);
      res.redirect("/");
    };

});

app.get("/work", function(req, res){
  res.render("list", {listTitle : "Work List", newAddedItem: itemsWork})
});
app.post("/work", function(req, res){
  let item = req.body.newItem;
  itemsWork.push(item);
});
 
app.listen(3000, function () {
  console.log("App is running on local host port 3000 :-)");
});
