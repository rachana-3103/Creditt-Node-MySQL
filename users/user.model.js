const { DataTypes } = require('sequelize');

function model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        age: { type: DataTypes.STRING },
        gender: { type: DataTypes.STRING, allowNull: false },
        city: { type: DataTypes.STRING, allowNull: false },
        state: { type: DataTypes.STRING, allowNull: false },
        hobbies: { type: DataTypes.STRING, allowNull: false },
        image: { type: DataTypes.STRING, allowNull: false }
    };
    const options = {
        scopes: {
            withHash: { attributes: {}, }
        }
    };
    return sequelize.define('User', attributes, options);
}

module.exports = model;
