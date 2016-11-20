var producto = require('./service/Producto_Service');
var categoria = require('./service/Categoria_Service');
var imagen = require('./service/Imagen_Service');
//---------------------------------------
//---------------------------------------
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/upload');
    },
    filename: function (req, file, cb) {
        console.log('Archivo Entrante Minetype : ', file.originalname);

        var extension = file.originalname.split(".");
        filename = Date.now() + '.' + extension[extension.length - 1];

        cb(null, filename);
    }
});

var upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        var flag = false;
        console.log('Archivo Entrante Minetype : ', file.mimetype);

        if (file.mimetype == 'image/png') {
            flag = true;
        }

        cb(null, flag);
    }
});
//---------------------------------------
//---------------------------------------

module.exports = {
    configure: function (app) {
        //PRODUCTO
        app.get('/producto/', producto.getList);
        app.post('/producto/', producto.add);
        app.get('/producto/get', producto.get);
        app.post('/producto/edit', producto.edit);
        app.post('/producto/remove', producto.remove);
        app.post('/producto/state', producto.edit_Estado);

        app.post('/producto/edit_html', producto.edit_html);


        //CATEGORIA
        app.get('/categoria/', categoria.getList);
        app.post('/categoria/', categoria.add);
        app.get('/categoria/get', categoria.get);
        app.post('/categoria/edit', categoria.edit);
        app.post('/categoria/remove', categoria.remove);
        app.post('/categoria/state', categoria.edit_Estado);

        app.get('/categoria/getCategoria', categoria.getCategoria);

        //Imagen
        app.get('/imagen/', imagen.getList);
        app.post('/imagen/', upload.array("ImageFile", 12), imagen.add);
        app.get('/imagen/get', imagen.get);
        app.post('/imagen/remove', imagen.remove);
    }
};