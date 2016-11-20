var BD = require('../conex');

var fs = require('fs');

function Imagen_Service() {

    this.getList = function (req, res) {

        console.log('Imagen - listar');
        console.log(req.query);

        var Tipo = req.query.Tipo;
        var IdTipo = req.query.IdTipo;

        BD.Conex.query('call sp_Imagen_Listar(:Tipo, :IdTipo)',
            {replacements: {Tipo: Tipo, IdTipo: IdTipo}, type: BD.Conex.QueryTypes.SELECT}
        ).then(function (result) {

            var lista_Object = result[0];

            var lista_Array = Object.keys(lista_Object).map(function (k) {
                return lista_Object[k]
            });

            res.send(lista_Array);

        }).catch(function (error) {
            res.status(500).send('Error al listar las Imagenes');
        });
    };

    this.get = function (req, res) {

        console.log('Imagen - get');
        console.log(req.query);

        var id = req.query.id;

        BD.Imagen.findById(id)
            .then(function (obj) {
                res.send(obj);
            })
            .catch(function (error) {
                res.status(500).send('Error al obtener la Imagen');
            });

    };

    this.remove = function (req, res) {

        console.log('Imagen - remove');
        console.log(req.body);

        var id = req.body.id;

        BD.Imagen.destroy({
            where: {
                imag_IdImagen: {$eq: id}
            }
        }).then(function (obj) {
            res.send(true);
        }).catch(function (error) {
            res.status(500).send('Error al remover la Imagen');
        });

    };

    this.add = function (req, res) {

        console.log('Imagen - upload_file');
        console.log(req.body);

        var img = req.body;

        req.files.forEach(function (file) {

            fs.createReadStream(file.path).pipe(fs.createWriteStream('./public/' + file.filename));
            fs.unlink(file.path);

            BD.Imagen.create({
                imag_Tipo: img.Tipo,
                imag_IdTipo: img.IdTipo,

                imag_ArchivoNombreOriginal: file.originalname,
                imag_ArchivoExtension: file.mimetype,

                imag_ArchivoNombre: file.filename,
                imag_Size: file.size

            })
                .then(function (obj) {
                    res.send(true);
                })
                .catch(function (error) {
                    res.status(500).send('Error al agregar el Producto');
                });
        });

        /*
         destination = "C:\WS\ServiceAPP/upload"
         encoding = "7bit"
         fieldname = "ImageFile"
         filename = "1479596819223 - descarga (1).png"
         mimetype = "image/png"
         originalname = "descarga (1).png"
         path = "C:\WS\ServiceAPP\upload\1479596819223 - descarga (1).png"
         size = 4244
         */

        /*
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
         });*/
    };

}

module.exports = new Imagen_Service();