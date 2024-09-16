// const { DataTypes } = require('sequelize');

// module.exports = model;

// function model(sequelize) {
//     const attributes = {
//         //======For Preferences=================
//         theme: { type: DataTypes.STRING, allowNull: true, defaultValue: 'light' },
//         notifications: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: true },
//         language: { type: DataTypes.STRING, allowNull: true, defaultValue: 'en' }
    

//     };
    
//     const options = {
//         defaultScope: {
//             attributes: { exclude: [
//                 'theme', 'notifications', 'language'
//                 ] 
//             }
//         }/* ,
//         scopes: {
//             withHash: { attributes: {} }
//         } */
//     };
    
//     return sequelize.define('Preferencesss', attributes, options);
// }