module.exports = function (sequelize, DataTypes) {
    return sequelize.define("imagen", {
        imag_IdImagen: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        imag_Tipo: {
            type: DataTypes.INTEGER
        },

        imag_IdTipo: {
            type: DataTypes.INTEGER
        },

        imag_ArchivoNombreOriginal: {
            type: DataTypes.STRING
        },

        imag_ArchivoExtension: {
            type: DataTypes.STRING
        },

        imag_ArchivoNombre: {
            type: DataTypes.STRING
        },
        imag_Size: {
            type: DataTypes.INTEGER
        }
    }, {
        tableName: 'imagen',
        timestamps: false,
        comment: "Tabla de Imagenes"
    })
}