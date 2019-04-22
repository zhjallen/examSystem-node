'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    username:STRING(30),
    password: STRING(30),
    status: INTEGER, // 用户状态（1 启用,0 禁用）
    type: INTEGER, // 用户类型（1 管理员，2 学生）
    // age: INTEGER,
    desc:STRING(255), // 描述
    created_at: DATE,
    updated_at: DATE,
  });

  return User;
};