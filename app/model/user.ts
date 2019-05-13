'use strict';
const Test = require("./test");


module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: {
      type: STRING,
      // unique: true,
      comment: "姓名",
    },
    userName: {
      type: STRING(100),
      unique: true,
      comment: "用户名",
      field: "user_name",

    },
    password: STRING(30),
    status: INTEGER, // 用户状态（1 启用,0 禁用）
    type: INTEGER, // 用户类型（1 管理员，2 学生）
    // age: INTEGER,
    desc: STRING(255), // 描述
    // created_at: DATE,
    // updated_at: DATE,
  }, {
      timestamps: true,
      // underscored: true,
      paranoid: true,
      freezeTableName: true,
      tableName: 'users',
      comment: "用户表"
    });
  User.associate = () => {
    User.belongsToMany(app.model.Test, {
      through: app.model.TestUser,
      foreignKey: 'testId',
      otherKey: 'userId'
    })
  }

  //User.sync({ force: true });
  return User;
};