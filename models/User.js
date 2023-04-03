// Creates Customer/User table which contains their unique id, username, email and encrypted password.
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// Allows for password hashing for security purposes.
const bcrypt = require('bcrypt');

class User extends Model {

    checkPassword(UserPassword) {
        return bcrypt.compareSync(UserPassword, this.password);
    }
}

User.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [10],
            },
        }
    },
    {
        hooks: {
            beforeCreate: async (newPassword) => {
                newPassword.password = await bcrypt.hash(newPassword.password, 10);
                return newPassword;
            },
            beforeUpdate: async (updatedPassword) => {
                updatedPassword.password = await bcrypt.hash(updatedPassword.password, 10);
                return updatedPassword;
            },
        },
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'User',
    },
);

module.exports = User;