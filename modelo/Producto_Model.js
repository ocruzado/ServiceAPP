module.exports = function(sequelize, DataTypes) {
    return sequelize.define("producto", {
        prod_IdProducto: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        prod_Nombre: {
            type: DataTypes.STRING
        },

        prod_Descripcion: {
            type: DataTypes.TEXT
        },
        prod_Precio: {
            type: DataTypes.DECIMAL(10,2)
        },

        prod_FlagActivo: {
            type: DataTypes.BOOLEAN
        },
        prod_FlagEliminado: {
            type: DataTypes.BOOLEAN
        },
        prod_CreadoPor: {
            type: DataTypes.STRING(100)
        },
        prod_FechaCreacion: {
            type: DataTypes.DATE
        },
        prod_ModificadoPor: {
            type: DataTypes.STRING(100)
        },
        prod_FechaModificacion: {
            type: DataTypes.DATE
        }
    },{
        tableName: 'producto',
        timestamps: false,
        comment: "Tabla de Producto"
    })
}