var producto = require('./service/Producto_Service');
var categoria = require('./service/Categoria_Service');

module.exports = {
    configure: function (app) {
        app.get('/producto/', producto.listar);
        app.post('/producto/', producto.insertar);
        app.post('/producto/editar_estado', producto.editar_Estado);

        app.get('/categoria/', categoria.listar);
        // app.get('/producto/:id', producto.obtener);


        // app.post('/producto/:id', producto.create);


        /*
         app.post('/producto/', function (req, res) {
         todo.create(req.body, res);
         });

         app.put('/producto/', function (req, res) {
         todo.update(req.body, res);
         });

         */
    }
};