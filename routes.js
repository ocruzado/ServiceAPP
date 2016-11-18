var producto = require('./service/Producto_Service');
var categoria = require('./service/Categoria_Service');

module.exports = {
    configure: function (app) {
        //PRODUCTO
        app.get('/producto/', producto.getList);
        app.post('/producto/', producto.add);
        app.get('/producto/get', producto.get);
        app.post('/producto/edit', producto.edit);
        app.post('/producto/remove', producto.remove);
        app.post('/producto/state', producto.edit_Estado);

        //CATEGORIA
        app.get('/categoria/', categoria.getList);
        app.post('/categoria/', categoria.add);
        app.get('/categoria/get', categoria.get);
        app.post('/categoria/edit', categoria.edit);
        app.post('/categoria/remove', categoria.remove);
        app.post('/categoria/state', categoria.edit_Estado);

        app.get('/categoria/getCategoria', categoria.getCategoria);
    }
};