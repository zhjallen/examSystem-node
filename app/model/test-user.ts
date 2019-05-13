/*
 * @Description: 考试-用户中间模型
 * @Author: zhj
 * @Date: 2019-05-13 13:55:44
 * @LastEditTime: 2019-05-13 14:35:51
 * @LastEditors: Please set LastEditors
 */

'use strict';
// const QuestionOption = require("./questionOption");
/**
 * 考试内容
 *
 * @param {*} app
 * @returns
 */
module.exports = app => {
    const {  INTEGER } = app.Sequelize;
    const TestUser = app.model.define('testUser', {
        testId: {
            type: INTEGER,
            primaryKey: true,
        },
        userId: {
            type: INTEGER,
            primaryKey: true,
        }

    }, {
            timestamps: true,
            // underscored: true,
            paranoid: true,
            freezeTableName: true,
            tableName: 'test_user',
            comment: "考试内容"
        });

//    TestUser.sync({ force: true });
    return TestUser;
};
