var Sequelize = require('sequelize');

var bd_config = {
    connectionLimit: 5,
    host: 'localhost',
    port: 3308,
    user: 'root',
    password: 'mysql',
    database: 'storeapp'
};

var conex = new Sequelize(bd_config.database, bd_config.user, bd_config.password, {
    host: bd_config.host,
    port: bd_config.port,
    dialect: 'mysql',

    pool: {
        max: bd_config.connectionLimit,
        min: 0,
        idle: 10000
    }
});


console.log("Cargando Modelos");
var Producto_Model = conex.import(__dirname + "/modelo/Producto_Model");
var Categoria_Model = conex.import(__dirname + "/modelo/Categoria_Model");
var Imagen_Model = conex.import(__dirname + "/modelo/Imagen_Model");

Categoria_Model.hasMany(Producto_Model, {foreignKey: 'cate_IdCategoria'});

module.exports.Conex = conex;

module.exports.Producto = Producto_Model;
module.exports.Categoria = Categoria_Model;
module.exports.Imagen = Imagen_Model;

// console.log("Sincronizando..");
//conex.sync({force: true});
// console.log("Terminado..");

/*
console.log("--Dommy Data--INICIO");


console.log("Categoria - Datos de Prueba");

var num_Categoria = 20;
for (var i = 1; i < num_Categoria; i++) {
    var id = (i < 10 ? '0' + i : i);
    Categoria_Model.create({
        cate_Codigo: 'CATE_' + id,
        cate_Nombre: 'Nuevo Producto  ' + id,
        cate_Descripcion: 'Descripcion ' + id,

        FlagActivo: true,
        FlagEliminado: false,

        CreadoPor: 'ocruzado',
        FechaCreacion: new Date()
    });
}


console.log("Producto - Datos de Prueba");

var num_Productos = 20;
for (var i = 1; i < num_Productos; i++) {
    var id = (i < 10 ? '0' + i : i);
    Producto_Model.create({

        prod_Codigo: 'PROD_' + id,
        prod_Nombre: 'Nuevo Producto  ' + id,
        prod_Descripcion: 'Descripcion ' + id,
        prod_Detalle: '<h1>Contenido HTML de Producto ' + id + '</h1>',
        prod_Tags: 'Tag ' + id,
        //Math.floor(Math.random()*(max-min+1)+min); // Nùmero aleatorio entre 2 numeros
        cate_IdCategoria: Math.floor(Math.random() * (20) + 1),

        prod_Precio: Math.random().toFixed(2),
        FlagActivo: true,
        FlagEliminado: false,

        CreadoPor: 'ocruzado',
        FechaCreacion: new Date()
    });
}


console.log("--Dommy Data--FIN");
*/
/* EJEMPLO DE PAGINACION PARA UN SP EN MYSQL CON SEQUELIZER
 var PageNumber = 2;
 var PageSize = 8;
 var TotalRows = 0;

 function log(dataObject) {


 var dataArray = new Array;
 for (var o in dataObject) {
 dataArray.push(dataObject[o]);
 }
 }

 conex.query('call sp_Producto_listar(:nombre, :categoria)',
 {raw: false, replacements: {nombre: 'nuevo', categoria: 1}, type: conex.QueryTypes.SELECT}
 ).then(function (result) {


 var desde = PageSize * (PageNumber - 1);
 var hasta = PageSize * (PageNumber);

 var lista_Object = result[0];

 var lista_Array = Object.keys(lista_Object).map(function (k) {
 return lista_Object[k]
 });

 TotalRows = lista_Array.length;

 var pagina = lista_Array.slice(desde, hasta)

 console.log(pagina);
 console.log(lista_Array);
 /*var result3 = [];
 var keys = Object.keys(dataObject);
 for (var i = 0, len = keys.length; i < len; i++) {
 result3.push(dataObject[keys[i]]);
 }


 console.log(result3); */
/*
 var dataArray = new Array;
 for (var o in dataObject) {
 dataArray.push(dataObject[o]);
 }* /




 });
 */

//module.exports = Categoria_Model;
//module.exports = Producto_Model;

//console.log("Sincronizando..");
//conex.sync({force: true});

