'use strict';
/**
 * 试题
 *
 * @param {*} app
 * @returns
 */
module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    const Question = app.model.define('question', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
        name: STRING(30),
        type: INTEGER, // 类型(1、单选、2、多选 3、判断 4.填空 5、问答)
        difficulty:INTEGER, // 难易程度（1、非常容易 2、比较容易 3、常规 4、较难 5、非常难）
        status:INTEGER, // 状态
        created_at: DATE,
        updated_at: DATE,
    });

    return Question;
};