var BD = require('../conex');

function Producto_Service() {

    this.getList = function (req, res) {

        console.log('Producto - listar');
        console.log(req.query);

        var nombre = req.query.nombre;
        var categoria = req.query.categoria;

        var PageNumber = req.query.PageNumber;
        var PageSize = req.query.PageSize;

        //var PageNumber = 2;
        //var PageSize = 4;

        BD.Conex.query('call sp_Producto_listar(:nombre, :categoria)',
            {replacements: {nombre: nombre, categoria: categoria}, type: BD.Conex.QueryTypes.SELECT}
        ).then(function (result) {

            var lista_Object = result[0];

            var lista_Array = Object.keys(lista_Object).map(function (k) {
                return lista_Object[k]
            });

            TotalRows = lista_Array.length;

            var desde = PageSize * (PageNumber - 1);
            var hasta = PageSize * (PageNumber);

            var pagina = lista_Array.slice(desde, hasta)

            res.send({
                total: TotalRows,
                items: pagina
                //items: lista_Array
            });

        }).catch(function (error) {
            res.status(500).send('Error al listar los productos');
        });
    };

    this.get = function (req, res) {

        console.log('Producto - get');
        console.log(req.query);

        var id = req.query.id;

        BD.Producto.findById(id)
            .then(function (obj) {
                res.send(obj);
            })
            .catch(function (error) {
                res.status(500).send('Error al obtener el Producto');
            });

    };

    this.add = function (req, res) {

        console.log('Producto - create');
        console.log(req.body);

        var producto = req.body;
        var usuario = 'ocruzado';

        producto.FlagActivo = true;
        producto.FlagEliminado = false;
        producto.CreadoPor = usuario;
        producto.FechaCreacion = new Date();

        BD.Producto.create(producto)
            .then(function (obj) {

                return obj.updateAttributes({
                    prod_Codigo: 'PROD_' + obj.prod_IdProducto
                });

            })
            .then(function (obj) {
                res.send(true);
            })
            .catch(function (error) {
                res.status(500).send('Error al agregar el Producto');
            });

    };

    this.edit = function (req, res) {

        console.log('Producto - edit');
        console.log(req.body);

        var producto = req.body;
        var usuario = 'ocruzado';

        BD.Producto.update({
            prod_Nombre: producto.prod_Nombre,
            prod_Descripcion: producto.prod_Descripcion,
            prod_Precio: producto.prod_Precio,
            prod_Tags: producto.prod_Tags,
            FlagActivo: producto.FlagActivo,

            ModificadoPor: usuario,
            FechaModificacion: new Date()
        }, {
            where: {
                prod_IdProducto: {$eq: producto.prod_IdProducto}
            }
        }).then(function (obj) {
            res.send(true);
        }).catch(function (error) {
            res.status(500).send('Error al editar el producto');
        });
    };

    this.remove = function (req, res) {

        console.log('Producto - remove');
        console.log(req.body);

        var id = req.body.id;
        var usuario = 'ocruzado';

        BD.Producto.update({
            FlagActivo: false,
            FlagEliminado: true,

            ModificadoPor: usuario,
            FechaModificacion: new Date()
        }, {
            where: {
                prod_IdProducto: {$eq: id}
            }
        }).then(function (obj) {
            res.send(true);
        }).catch(function (error) {
            res.status(500).send('Error al remover el producto');
        });

    };

    this.edit_Estado = function (req, res) {

        console.log('Producto - editar_Estado');
        console.log(req.body);

        var id = req.body.id;
        var estado = req.body.estado;
        var usuario = 'ocruzado';

        BD.Producto.update({
            FlagActivo: estado,

            ModificadoPor: usuario,
            FechaModificacion: new Date()
        }, {
            where: {
                prod_IdProducto: {$eq: id}
            }
        }).then(function (obj) {
            res.send(true);
        }).catch(function (error) {
            res.status(500).send('Error al editar el estado del producto');
        });

    };

}

module.exports = new Producto_Service();