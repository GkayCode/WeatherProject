var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const ejs = require('ejs')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const api = "01726ff09219b76f92882fde44622108"

app.get('/', async (req, res) => {

  try {

    const cityname = req.query.cityname
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${api}`
    )

    const data = await response.json()
    res.render('weather', { weather: data, cityname })
  } catch (error) {

    res.render('weather', { weather: null, error: "Not found city" })
  }



})

app.listen(3000, () => {
  console.log("Running in http://localhost:3000/");

})


module.exports = app;
