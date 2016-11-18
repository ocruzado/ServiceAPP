module.exports = function(sequelize, DataTypes) {
    return sequelize.define("categoria", {
        cate_IdCategoria: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cate_Codigo: {
            type: DataTypes.STRING
        },
        cate_Nombre: {
            type: DataTypes.STRING
        },
        cate_Descripcion: {
            type: DataTypes.TEXT
        },

        FlagActivo: {
            type: DataTypes.BOOLEAN
        },
        FlagEliminado: {
            type: DataTypes.BOOLEAN
        },
        CreadoPor: {
            type: DataTypes.STRING(100)
        },
        FechaCreacion: {
            type: DataTypes.DATE
        },
        ModificadoPor: {
            type: DataTypes.STRING(100)
        },
        FechaModificacion: {
            type: DataTypes.DATE
        }
    },{
        tableName: 'categoria',
        timestamps: false,
        comment: "Tabla de Categorias"

    })
}