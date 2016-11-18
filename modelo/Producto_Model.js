module.exports = function (sequelize, DataTypes) {
    return sequelize.define("producto", {
        prod_IdProducto: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        prod_Codigo: {
            type: DataTypes.STRING
        },

        prod_Nombre: {
            type: DataTypes.STRING
        },

        prod_Descripcion: {
            type: DataTypes.STRING
        },

        prod_Detalle: {
            type: DataTypes.STRING(5000)
        },

        prod_Precio: {
            type: DataTypes.DECIMAL(10, 2)
        },

        prod_Tags: {
            type: DataTypes.STRING
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
    }, {
        tableName: 'producto',
        timestamps: false,
        comment: "Tabla de Producto"
    })
}