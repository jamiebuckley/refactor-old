var express = require('express')
var exphbs  = require('express-handlebars');
var devServer = require("./devserver");


var development = process.env.NODE_ENV !== 'production';
var app = express()
app.engine('handlebars', exphbs({defaultLayout: 'main', layoutsDir:'server/views'}));
app.set('view engine', 'handlebars');
app.set('views', 'server/views')

app.use('/react.js', express.static(__dirname + './../node_modules/react/dist/react.js'))
app.use('/react-dom.js', express.static(__dirname + './../node_modules/react-dom/dist/react-dom.js'))
app.use('/babylon.js', express.static(__dirname + './../node_modules/babylonjs/babylon.js'));
app.use('/touch-emulator.js', express.static(__dirname + './../node_modules/hammer-touchemulator/touch-emulator.js'))
app.use('/dist', express.static(__dirname + './../dist'));

app.get('/', function (req, res) {
    res.render('home', { development: development })
})


if (development) devServer();

app.listen(3000, function () {
    console.log('Main app listening on port 3000')
})
