const { DataTypes } = require('sequelize');

module.exports = preferences;

function preferences(sequelize) {
    const attributes = {
        prefId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
        theme: { type: DataTypes.STRING, allowNull: true },
        notifications: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: true },
        language: { type: DataTypes.STRING, allowNull: true }
    };
    const options = {

    };

    const Preferences = sequelize.define('Preferences', attributes, options);
    Preferences.sync();
    return Preferences;
}