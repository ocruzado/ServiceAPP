module.exports = function(sequelize, DataTypes) {
    return sequelize.define("categoria", {
        cate_IdCategoria: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cate_Nombre: {
            type: DataTypes.STRING
        },

        cate_Descripcion: {
            type: DataTypes.TEXT
        },



        cate_FlagActivo: {
            type: DataTypes.BOOLEAN
        },
        cate_FlagEliminado: {
            type: DataTypes.BOOLEAN
        },
        cate_CreadoPor: {
            type: DataTypes.STRING(100)
        },
        cate_FechaCreacion: {
            type: DataTypes.DATE
        },
        cate_ModificadoPor: {
            type: DataTypes.STRING(100)
        },
        cate_FechaModificacion: {
            type: DataTypes.DATE
        }
    },{
        tableName: 'categoria',
        timestamps: false,
        comment: "Tabla de Categorias"

    })
}