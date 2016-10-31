var BD = require('../conex');

function Categoria_Service() {

    this.listar = function (req, res) {

        console.log('Categoria - listar');

        BD.Conex.query('call sp_Categoria_listar()').then(function (result) {

            var lista_Object = result;

            var lista_Array = Object.keys(lista_Object).map(function (k) {
                return lista_Object[k]
            });

            res.send(lista_Array);

        });
    };

}

module.exports = new Categoria_Service();