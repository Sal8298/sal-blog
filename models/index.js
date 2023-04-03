const User = require('./User');
const Comment = require('./Comment');
const Post = require('./Post');

User.hasMany(Post, {
    foreignKey: 'user_id',
});
Post.belongsTo(User, {
    foreignKey: 'post_user_id',
});

// Comments to Users table associations to connect a User to a Comment
User.hasMany(Comment, {
    foreignKey: 'comment_user_id',
});

// Posts to Comments table associations to connect a post to a comment
Comment.hasOne(Post, {
    foreignKey: 'post_id',
});
Post.hasMany(Comment, {
    foreignKey: 'post_id',
});

// Comments to User table associations to connect a post to a comment
Comment.belongsTo(User, {
    foreignKey: 'comment_user_id',
});
User.hasMany(Comment, {
    foreignKey: 'comment_user_id',
});

module.exports = { User, Comment, Post };