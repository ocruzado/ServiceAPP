const express = require('express');
const bodyparser = require('body-parser');
express.crea
//var connection = require('./conex');
var routes = require('./routes');

const app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//headers.append("Access-Control-Allow-Origin", "*");
//headers.append("Access-Control-Allow-Methods", "POST, GET, DELETE");
//headers.append("Access-Control-Max-Age", "3600");
//headers.append("Access-Control-Allow-Headers", "Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Client-Offset");


//connection.init();
routes.configure(app);

var server = app.listen(8000, function () {
    console.log('Server listening on port ' + server.address().port);
});









