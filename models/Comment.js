const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Comment extends Model { }

Comment.init(
  {
    comment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Post',
        key: 'post_id',
      },
    },
    comment_user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'user_id',
      },
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'Comment',
  }
);

module.exports = Comment;