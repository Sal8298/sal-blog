const User = require('./User');
const Comment = require('./Comment');
const Post = require('./Post');

User.hasMany(Post, {
    foreignKey: 'user_id',
});
Post.belongsTo(User, {
    foreignKey: 'post_user_id',
});

User.hasMany(Comment, {
    foreignKey: 'comment_user_id',
});

Comment.hasOne(Post, {
    foreignKey: 'post_id',
});
Post.hasMany(Comment, {
    foreignKey: 'post_id',
});

Comment.belongsTo(User, {
    foreignKey: 'comment_user_id',
});
User.hasMany(Comment, {
    foreignKey: 'comment_user_id',
});

module.exports = { User, Comment, Post };