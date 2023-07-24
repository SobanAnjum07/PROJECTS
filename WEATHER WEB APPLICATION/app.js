const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req, res) {
  // __dirname is for current directory, it is helpful if the directory or root directory is not known
  res.sendFile(__dirname + "/index.html")
});


app.post("/", function(req, res){

  // req.body can only be used with the body parser so that you can take input
  const query = req.body.cityName //"Lahore";
  const apiKey = "d6c1fec128c2c99c3df534ad40fdc7bb";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query+"&appid="+ apiKey +"&units="+units;
  // https://api.openweathermap.org/data/2.5/weather?q=lahore&appid=d6c1fec128c2c99c3df534ad40fdc7bb&units=metric
  https.get(url, function (response) {

    // .stautsCode is used to see the status code of the response i.e 200(ok), 404(not found )etc.
    console.log(response.statusCode);

    response.on("data", function (data) {

        // actually the data that is returned from the .on function is in hexadecimal
        // the JSON.parse() function is used to cconvert the hexadecimal string to somewhat like js object(JSON)
        // there is alos a function named .stringify(), that just maintain the json format in more like a python dictionary one line format
        // var test = JSON.stringify()
        const weatherData = JSON.parse(data);
        // console.log(weatherData);
        const temperature = weatherData.main.temp;
        var des = weatherData.weather[0].description;
        const ico = weatherData.weather[0].icon;
        const imagUrl = "https://openweathermap.org/img/wn/"+ ico+ "@2x.png"
        // console.log(temperature); //thiswill show the temperature on the log (console)

        res.write("<p><img src=" +imagUrl + "><p>");
        res.write("<h1>The temperature in "+ query + " is " + temperature + " degree celcius.</h1>");
        res.write("<p>Description that best define the temperature is " + des + ".<p>");
        res.send();
    });
  });
});


app.listen(3000, function () {
  console.log("Server is started at Local Host 3000 :-)");
});
