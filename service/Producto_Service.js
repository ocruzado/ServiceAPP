//var Connection = require('../conex');
var BD = require('../conex');

//const sp_listar = "call sp_Producto_listar()";
//const sp_insertar = "call sp_Producto_insertar(?,?)";

function Producto_Service() {

    this.listar = function (req, res) {

        console.log('Producto - listar');
        console.log(req.query);


        var nombre = req.query.nombre;
        var categoria = req.query.categoria;


        BD.Conex.query('call sp_Producto_listar(:nombre, :categoria)',
            {replacements: {nombre: nombre, categoria: categoria}, type: BD.Conex.QueryTypes.SELECT}
        ).then(function (result) {

            var lista_Object = result[0];

            var lista_Array = Object.keys(lista_Object).map(function (k) {
                return lista_Object[k]
            });

            TotalRows = lista_Array.length;

            //res.send(200, {
            res.send({
                total: TotalRows,
                items: lista_Array
            });

        });
    };


    this.insertar = function (req, res) {
        //res.header("Access-Control-Allow-Origin", '*');
        console.log('Producto - create');
        console.log(req.body);

        var producto = req.body;

        BD.Producto.create({
            prod_Nombre: producto.prod_Nombre,
            prod_Descripcion: producto.prod_Descripcion,
            prod_Precio: producto.prod_Precio,

            FlagActivo: true,
            FlagEliminado: false,

            CreadoPor: 'ocruzado',
            FechaCreacion: new Date()
        }).then(function (obj) {
            //res.send(200, 'obj.prod_IdProducto');
            res.send(obj.prod_IdProducto);
        });

    };

    this.editar_Estado = function (req, res) {

        console.log('Producto - editar_Estado');
        console.log(req.body);

        var id = req.body.id;
        var estado = req.body.estado;
        var usuario = req.body.usuario;

        /*
         BD.Producto.update(
         {
         prod_FlagActivo: estado,
         prod_ModificadoPor: usuario,
         prod_FechaModificacion: new Date(),
         }, {
         where: {
         prod_IdProducto: id
         }
         });*/


        BD.Producto.findById(id)
            .then(function (obj) {

                return obj.updateAttributes({
                    FlagActivo: estado,
                    ModificadoPor: usuario,
                    FechaModificacion: new Date()
                });

            })
            .then(function (obj) {
                //res.send(200, obj.prod_IdProducto);
                res.send(obj.prod_IdProducto);
            });


    };


}

module.exports = new Producto_Service();