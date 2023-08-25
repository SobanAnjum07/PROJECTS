// tempelating engine

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require('lodash');

const date = require(__dirname + "/date.js");

console.log(date);

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// this will be used to connect to the data base on you local host
mongoose.connect("mongodb://127.0.0.1:27017/todolistDB");

/*
 ________  ________  ___  ___  _______   _____ ______   ________
|\   ____\|\   ____\|\  \|\  \|\  ___ \ |\   _ \  _   \|\   __  \
\ \  \___|\ \  \___|\ \  \\\  \ \   __/|\ \  \\\__\ \  \ \  \|\  \
 \ \_____  \ \  \    \ \   __  \ \  \_|/_\ \  \\|__| \  \ \   __  \
  \|____|\  \ \  \____\ \  \ \  \ \  \_|\ \ \  \    \ \  \ \  \ \  \
    ____\_\  \ \_______\ \__\ \__\ \_______\ \__\    \ \__\ \__\ \__\
   |\_________\|_______|\|__|\|__|\|_______|\|__|     \|__|\|__|\|__|
   \|_________|


*/

const itemsSchema = new mongoose.Schema({
  name: String,
});

/*
 _____ ______   ________  ________  _______   ___
|\   _ \  _   \|\   __  \|\   ___ \|\  ___ \ |\  \
\ \  \\\__\ \  \ \  \|\  \ \  \_|\ \ \   __/|\ \  \
 \ \  \\|__| \  \ \  \\\  \ \  \ \\ \ \  \_|/_\ \  \
  \ \  \    \ \  \ \  \\\  \ \  \_\\ \ \  \_|\ \ \  \____
   \ \__\    \ \__\ \_______\ \_______\ \_______\ \_______\
    \|__|     \|__|\|_______|\|_______|\|_______|\|_______|



*/

const Item = new mongoose.model("Item", itemsSchema);

// adding new items in the model

const item1 = new Item({
  name: "Welcome to your todo list",
});

const item2 = new Item({
  name: "Hit the + button to add a new item!",
});

const item3 = new Item({
  name: "<-- Hit this to delete an item",
});

const defItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemsSchema],
};

const List = mongoose.model("List", listSchema);

// the way how you can use the ejs
app.set("view engine", "ejs");

// javascrit's array works different way in terms of constants and variables
const itemsWork = [];
var flag = 0;

app.get("/", function (req, res) {
  let day = date.getDay();
  if (flag === 0) {
    Item.insertMany(defItems)
      .then(console.log("Successfully added!"))
      .catch(function (err) {
        console.log(err);
      });
    res.redirect("/");
    flag = 1;
  } else {
    Item.find({})
      .then(function (items) {
        res.render("list", { listTitle: day, newAddedItem: items });
      })
      .catch(function (err) {
        console.log(err);
      });
  }
});

// this will render the list.ejs file and this render function will
// see the files of the mentioned name in the views folder

app.get("/:customListName", function (req, res) {
  customName = _.capitalize(req.params.customListName);

  List.findOne({ name: customName })
    .then(function (foundList) {
      if (!foundList) {
        // create a list
        const list = new List({
          name: customName,
          items: defItems,
        });
        list.save();
        res.redirect("/" + customName);
        // console.log("Does not exists");
      } else {
        // show the existing list
        res.render("list", {
          listTitle: foundList.name,
          newAddedItem: foundList.items,
        });
        // console.log("Exists");
      }
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.post("/", function (req, res) {
  let itemName = req.body.newItem;

  const listName = req.body.list;

  
  const item = new Item({
    name: itemName,
  });
  
  if (listName === date.getDay()){
    item.save();
    res.redirect('/');
  } else {
    List.findOne({name : listName})
    .then (function(foundList){
      foundList.items.push(item);
      foundList.save();
      res.redirect('/' + listName);
    })
    .catch (function(err){
      console.log(err)
  });
  }
});

app.post("/delete", function (req, res) {
  const checked = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === date.getDay()){
    Item.deleteOne({ _id: checked })
      .then(console.log("Deleted the checked entry!"))
      .catch(function (err) {
        console.log(err);
      });
    res.redirect("/");


  } else {
    List.findOneAndUpdate({name: listName}, {$pull: {items : {_id: checked}}})
    .then(function(foundList){
      res.redirect('/' + listName)
    })
  }});

app.post("/work", function (req, res) {
  let item = req.body.newItem;
  itemsWork.push(item);
});

app.listen(3000, function () {
  console.log("App is running on local host port 3000 :-)\n");
});
