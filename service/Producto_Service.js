//var Connection = require('../conex');
var BD = require('../conex');

//const sp_listar = "call sp_Producto_listar()";
//const sp_insertar = "call sp_Producto_insertar(?,?)";

function Producto_Service() {

    this.listar = function (req, res) {

        console.log('Producto - listar');
        console.log(req.body);

        var nombre = req.body.nombre;
        var categoria = req.body.categoria;


        // BD.Producto.findAll().then(function (result) {
        //     var Productos = [];
        //
        //     Productos = result.map(function (obj) {
        //         var producto = {
        //             prod_Nombre: obj.prod_Nombre,
        //             prod_Descripcion: obj.prod_Descripcion,
        //             prod_Precio: obj.prod_Precio
        //         }
        //
        //         return producto;
        //     });
        //
        //    //res.header("Access-Control-Allow-Origin", req.header('Origin'));
        //     res.send(Productos);
        // });


        BD.Conex.query('call sp_Producto_listar(:nombre, :categoria)',
            {replacements: {nombre: nombre, categoria: categoria}, type: conex.QueryTypes.SELECT}
        ).then(function (result) {


            //var desde = PageSize * (PageNumber - 1);
            //var hasta = PageSize * (PageNumber);

            var lista_Object = result[0];

            var lista_Array = Object.keys(lista_Object).map(function (k) {
                return lista_Object[k]
            });

            TotalRows = lista_Array.length;

            //var pagina = lista_Array.slice(desde, hasta)

            //console.log(pagina);
            //console.log(lista_Array);


        });
    };


    this.insertar = function (todo, res) {
        //res.header("Access-Control-Allow-Origin", '*');
        console.log('Producto - create');
        console.log(todo.body);

        var producto = todo.body;

        BD.Producto.create({
            prod_Nombre: producto.prod_Nombre,
            prod_Descripcion: producto.prod_Descripcion,
            prod_Precio: producto.prod_Precio,

            prod_FlagActivo: true,
            prod_FlagEliminado: false,

            prod_CreadoPor: 'ocruzado',
            prod_FechaCreacion: new Date()
        }).then(function (obj) {
            //obj.prod_IdProducto
            //res.header("Access-Control-Allow-Origin", '*');
            res.send("Nuevo ID: " + obj.prod_IdProducto);
        });
        //Connection.acquire(function (err, con) {

        //res.send(todo);

        //});
    };


}

module.exports = new Producto_Service();