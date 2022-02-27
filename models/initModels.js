const { DataTypes } = require('sequelize');

const _usersModel = require('./users');
const _postsModel = require('./posts');

module.exports = (sequelize) => {
    const usersModel = _usersModel(sequelize, DataTypes);
    const postsModel = _postsModel(sequelize, DataTypes);

    postsModel.belongsTo(usersModel, { as: 'author_info', foreignKey: 'author_id'});
    usersModel.hasMany(postsModel, { as: 'posts', foreignKey: 'author_id'});

    return {
        usersModel,
        postsModel
    };
};
