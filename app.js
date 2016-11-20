const express = require('express');
const bodyparser = require('body-parser');

/*
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/upload');
    },
    filename: function (req, file, cb) {
        console.log('Archivo Entrante Minetype : ', file.originalname);
        cb(null, Date.now() + ' - ' + file.originalname);
    }
});

var upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        var flag = false;
        console.log('Archivo Entrante Minetype : ', file.mimetype);

        if (file.mimetype == 'image/png') {
            //return cb(null, false, new Error('I don\'t have a clue!'));
            flag = true;
        }

        cb(null, flag);
    }
});*/

var routes = require('./routes');
const app = express();

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use('/public', express.static(__dirname + '/public'));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
/*
app.post("/upload", upload.array("ImageFile", 12), function (req, res) {
    var producto = req.body;

    res.send(req.files);
});
*/

//connection.init();
routes.configure(app);

var server = app.listen(8000, function () {
    console.log('Server listening on port ' + server.address().port);
});