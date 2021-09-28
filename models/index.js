const User = require('./User.js')
const Post = require('./Post.js')

User.hasMany(Post, { foreignKey: 'uid' })
Post.belongsTo(User, { as: 'u', foreignKey: 'uid' })

module.exports = { User, Post }
