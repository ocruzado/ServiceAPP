var BD = require('../conex');

function Categoria_Service() {

    this.getList = function (req, res) {

        console.log('Categoria - getList');
        console.log(req.query);

        var nombre = req.query.nombre;

        var PageNumber = req.query.PageNumber;
        var PageSize = req.query.PageSize;

        //var PageNumber = 2;
        //var PageSize = 4;

        BD.Conex.query('call sp_Categoria_listar(:nombre)',
            {replacements: {nombre: nombre}, type: BD.Conex.QueryTypes.SELECT}
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
            res.status(500).send('Error al listar las categorias');
        });
    };

    this.get = function (req, res) {

        console.log('Categoria - get');
        console.log(req.query);

        var id = req.query.id;

        BD.Categoria.findById(id)
            .then(function (obj) {
                res.send(obj);
            })
            .catch(function (error) {
                res.status(500).send('Error al obtener la categoria');
            });

    };

    this.add = function (req, res) {

        console.log('Categoria - add');
        console.log(req.body);

        var categoria = req.body;
        var usuario = 'ocruzado';

        categoria.FlagActivo = true;
        categoria.FlagEliminado = false;
        categoria.CreadoPor = usuario;
        categoria.FechaCreacion = new Date();

        BD.Categoria.create(categoria)
            .then(function (obj) {

                return obj.updateAttributes({
                    cate_Codigo: 'CATE_' + obj.cate_IdCategoria
                });

            })
            .then(function (obj) {
                res.send(true);
            })
            .catch(function (error) {
                res.status(500).send('Error al agregar la categoria');
            });
    };

    this.edit = function (req, res) {

        console.log('Categoria - edit');
        console.log(req.body);

        var categoria = req.body;
        var usuario = 'ocruzado';

        BD.Categoria.update({
            cate_Nombre: categoria.cate_Nombre,
            cate_Descripcion: categoria.cate_Descripcion,
            FlagActivo: categoria.FlagActivo,

            ModificadoPor: usuario,
            FechaModificacion: new Date()
        }, {
            where: {
                cate_IdCategoria: {$eq: categoria.cate_IdCategoria}
            }
        }).then(function (obj) {
            res.send(true);
        }).catch(function (error) {
            res.status(500).send('Error al editar la categoria');
        });
        /*
         BD.Categoria.findById(categoria.cate_IdCategoria)
         .then(function (obj) {
         return obj.updateAttributes({
         cate_Nombre: categoria.cate_Nombre,
         cate_Descripcion: categoria.cate_Descripcion,
         FlagActivo: categoria.FlagActivo,

         ModificadoPor: usuario,
         FechaModificacion: new Date()
         });

         })
         .then(function (obj) {
         res.send(true);
         }).catch(function (error) {
         res.status(500).send('Error al editar la categoria');
         });*/
    };

    this.remove = function (req, res) {

        console.log('Categoria - remove');
        console.log(req.body);

        var id = req.body.id;
        var usuario = 'ocruzado';

        BD.Categoria.update({
            FlagActivo: false,
            FlagEliminado: true,

            ModificadoPor: usuario,
            FechaModificacion: new Date()
        }, {
            where: {
                cate_IdCategoria: {$eq: id}
            }
        }).then(function (obj) {
            res.send(true);
        }).catch(function (error) {
            res.status(500).send('Error al remover la categoria');
        });
        /*
         BD.Categoria.findById(id)
         .then(function (obj) {

         return obj.updateAttributes({
         FlagActivo: false,
         FlagEliminado: true,
         ModificadoPor: usuario,
         FechaModificacion: new Date()
         });

         })
         .then(function (obj) {
         res.send(true);
         }).catch(function (error) {
         res.status(500).send('Error al remover la categoria');
         });*/

    };

    this.edit_Estado = function (req, res) {

        console.log('Categoria - editar_Estado');
        console.log(req.body);

        var id = req.body.id;
        var estado = req.body.estado;
        var usuario = 'ocruzado';

        BD.Categoria.update({
            FlagActivo: estado,

            ModificadoPor: usuario,
            FechaModificacion: new Date()
        }, {
            where: {
                cate_IdCategoria: {$eq: id}
            }
        }).then(function (obj) {
            res.send(true);
        }).catch(function (error) {
            res.status(500).send('Error al editar el estado de la categoria');
        });
        /*
         BD.Categoria.findById(id)
         .then(function (obj) {

         return obj.updateAttributes({
         FlagActivo: estado,
         ModificadoPor: usuario,
         FechaModificacion: new Date()
         });

         })
         .then(function (obj) {
         res.send(true);
         }).catch(function (error) {
         res.status(500).send('Error al editar el estado de la categoria');
         });
         */
    };

    this.getCategoria = function (req, res) {

        console.log('Categoria - getCategoria');

        BD.Conex.query('call sp_Categoria_ListaDesplegable()'
        ).then(function (result) {

            //var lista_Object = result[0];

            //var lista_Array = Object.keys(lista_Object).map(function (k) {
            //    return lista_Object[k]
            //});

            //res.send(lista_Array);ç

            res.send(result);

        }).catch(function (error) {
            res.status(500).send('Error al listar la Lista Desplegable');
        });


    };

}

module.exports = new Categoria_Service();