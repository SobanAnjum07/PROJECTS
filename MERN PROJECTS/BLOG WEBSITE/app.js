//jshint esversion:6


/*
 ________  _______   ________  ___  ___  ___  ________  _______   _____ ______   _______   ________   _________  ________
|\   __  \|\  ___ \ |\   __  \|\  \|\  \|\  \|\   __  \|\  ___ \ |\   _ \  _   \|\  ___ \ |\   ___  \|\___   ___\\   ____\
\ \  \|\  \ \   __/|\ \  \|\  \ \  \\\  \ \  \ \  \|\  \ \   __/|\ \  \\\__\ \  \ \   __/|\ \  \\ \  \|___ \  \_\ \  \___|_
 \ \   _  _\ \  \_|/_\ \  \\\  \ \  \\\  \ \  \ \   _  _\ \  \_|/_\ \  \\|__| \  \ \  \_|/_\ \  \\ \  \   \ \  \ \ \_____  \
  \ \  \\  \\ \  \_|\ \ \  \\\  \ \  \\\  \ \  \ \  \\  \\ \  \_|\ \ \  \    \ \  \ \  \_|\ \ \  \\ \  \   \ \  \ \|____|\  \
   \ \__\\ _\\ \_______\ \_____  \ \_______\ \__\ \__\\ _\\ \_______\ \__\    \ \__\ \_______\ \__\\ \__\   \ \__\  ____\_\  \
    \|__|\|__|\|_______|\|___| \__\|_______|\|__|\|__|\|__|\|_______|\|__|     \|__|\|_______|\|__| \|__|    \|__| |\_________\
                              \|__|                                                                                \|_________|


*/

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash')


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


const posts = [];

/*
___  ___  ________  _____ ______   _______           ________  ___  ________  _______   ________ _________  ________  ________      ___    ___
|\  \|\  \|\   __  \|\   _ \  _   \|\  ___ \         |\   ___ \|\  \|\   __  \|\  ___ \ |\   ____\\___   ___\\   __  \|\   __  \    |\  \  /  /|
\ \  \\\  \ \  \|\  \ \  \\\__\ \  \ \   __/|        \ \  \_|\ \ \  \ \  \|\  \ \   __/|\ \  \___\|___ \  \_\ \  \|\  \ \  \|\  \   \ \  \/  / /
\ \   __  \ \  \\\  \ \  \\|__| \  \ \  \_|/__       \ \  \ \\ \ \  \ \   _  _\ \  \_|/_\ \  \       \ \  \ \ \  \\\  \ \   _  _\   \ \    / /
\ \  \ \  \ \  \\\  \ \  \    \ \  \ \  \_|\ \       \ \  \_\\ \ \  \ \  \\  \\ \  \_|\ \ \  \____   \ \  \ \ \  \\\  \ \  \\  \|   \/  /  /
\ \__\ \__\ \_______\ \__\    \ \__\ \_______\       \ \_______\ \__\ \__\\ _\\ \_______\ \_______\  \ \__\ \ \_______\ \__\\ _\ __/  / /
\|__|\|__|\|_______|\|__|     \|__|\|_______|        \|_______|\|__|\|__|\|__|\|_______|\|_______|   \|__|  \|_______|\|__|\|__|\___/ /
\|___|/


*/
app.get("/", function(req, res){
  res.render("home", {
    home : homeStartingContent,
    posts : posts
  });
  
});


/*
 ________  ________  ________  ___  ___  _________
|\   __  \|\   __  \|\   __  \|\  \|\  \|\___   ___\
\ \  \|\  \ \  \|\ /\ \  \|\  \ \  \\\  \|___ \  \_|
 \ \   __  \ \   __  \ \  \\\  \ \  \\\  \   \ \  \
  \ \  \ \  \ \  \|\  \ \  \\\  \ \  \\\  \   \ \  \
   \ \__\ \__\ \_______\ \_______\ \_______\   \ \__\
    \|__|\|__|\|_______|\|_______|\|_______|    \|__|


*/

app.get("/about", function(req, res){
  res.render("about", {about : aboutContent});
  
});

/*
 ________  ________  _________  ________  ________ _________
|\   ____\|\   __  \|\___   ___\\   __  \|\   ____\\___   ___\
\ \  \___|\ \  \|\  \|___ \  \_\ \  \|\  \ \  \___\|___ \  \_|
 \ \  \    \ \  \\\  \   \ \  \ \ \   __  \ \  \       \ \  \
  \ \  \____\ \  \\\  \   \ \  \ \ \  \ \  \ \  \____   \ \  \
   \ \_______\ \_______\   \ \__\ \ \__\ \__\ \_______\  \ \__\
    \|_______|\|_______|    \|__|  \|__|\|__|\|_______|   \|__|


*/

app.get("/contact", function(req, res){
  res.render("contact", {contact : contactContent});
  
});
/*
 ________  ________  _____ ______   ________  ________  ________  _______
|\   ____\|\   __  \|\   _ \  _   \|\   __  \|\   __  \|\   ____\|\  ___ \
\ \  \___|\ \  \|\  \ \  \\\__\ \  \ \  \|\  \ \  \|\  \ \  \___|\ \   __/|
 \ \  \    \ \  \\\  \ \  \\|__| \  \ \   ____\ \  \\\  \ \_____  \ \  \_|/__
  \ \  \____\ \  \\\  \ \  \    \ \  \ \  \___|\ \  \\\  \|____|\  \ \  \_|\ \
   \ \_______\ \_______\ \__\    \ \__\ \__\    \ \_______\____\_\  \ \_______\
    \|_______|\|_______|\|__|     \|__|\|__|     \|_______|\_________\|_______|
                                                          \|_________|


*/

app.get("/compose", function(req, res){
  res.render("compose");
  
});

app.post("/compose", function(req, res){

  const compose = {
    title : req.body.post_title, 
    post : req.body.post_body,
  };
  
  posts.push(compose);
  res.redirect('/');
});
 

/*
 ________  ________  ________  _________  ________
|\   __  \|\   __  \|\   ____\|\___   ___\\   ____\
\ \  \|\  \ \  \|\  \ \  \___|\|___ \  \_\ \  \___|_
 \ \   ____\ \  \\\  \ \_____  \   \ \  \ \ \_____  \
  \ \  \___|\ \  \\\  \|____|\  \   \ \  \ \|____|\  \
   \ \__\    \ \_______\____\_\  \   \ \__\  ____\_\  \
    \|__|     \|_______|\_________\   \|__| |\_________\
                       \|_________|         \|_________|


*/


// to get the posts
app.get('/posts/:postName', function(req, res){
  posts.forEach(function(post){
    if (_.lowerCase(post.title) ===  _.lowerCase(req.params.postName)){
      res.render('post', { 
        title : post.title ,
        content : post.post
      })
    };
  });

});

 


/*
 ___       ___  ________  _________  _______   ________
|\  \     |\  \|\   ____\|\___   ___\\  ___ \ |\   ___  \
\ \  \    \ \  \ \  \___|\|___ \  \_\ \   __/|\ \  \\ \  \
 \ \  \    \ \  \ \_____  \   \ \  \ \ \  \_|/_\ \  \\ \  \
  \ \  \____\ \  \|____|\  \   \ \  \ \ \  \_|\ \ \  \\ \  \
   \ \_______\ \__\____\_\  \   \ \__\ \ \_______\ \__\\ \__\
    \|_______|\|__|\_________\   \|__|  \|_______|\|__| \|__|
                  \|_________|


*/

app.listen(3000, function() {
  console.log("Server started on port 3000 ;-P");
});
