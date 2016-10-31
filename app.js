const express = require('express');
const bodyparser = require('body-parser');

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

//connection.init();
routes.configure(app);

var server = app.listen(8000, function () {
    console.log('Server listening on port ' + server.address().port);
});









