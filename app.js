const express = require('express');
const bodyparser = require('body-parser');

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
});

/*
 var upload = multer({
 dest: './upload/',
 rename: function (fieldname, filename) {
 console.log("Rename...");
 return filename + Date.now();

 //return fieldname + filename + Date.now()

 //return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
 },
 onFileUploadStart: function () {
 console.log("Upload is starting...");
 },
 onFileUploadComplete: function () {
 console.log("File uploaded");
 }
 });

 */

var routes = require('./routes');

const app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
//app.use(multer({

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//app.post('/upload', upload.);
app.post("/upload", upload.array("uploads[]", 12), function (req, res) {

    /*for(var x=0;x<req.files.length;x++) {
     //copiamos el archivo a la carpeta definitiva de fotos
     fs.createReadStream('./uploads/'+req.files[x].filename)
     .pipe(fs.createWriteStream('./public/fotos/'+req.files[x].originalname));
     //borramos el archivo temporal creado
     fs.unlink('./uploads/'+req.files[x].filename);
     }
     */
    res.send(req.files);


});

//connection.init();
routes.configure(app);

var server = app.listen(8000, function () {
    console.log('Server listening on port ' + server.address().port);
});









