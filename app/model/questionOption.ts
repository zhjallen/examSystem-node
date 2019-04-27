'use strict';
const Question = require('./question');
/**
 * 试题选项
 *
 * @param {*} app
 * @returns
 */
module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize;
    const QuestionOption = app.model.define('questionOption', {
        id: { type: INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
        name: STRING(255),
        content: STRING(255),
        isRight: {
            type:INTEGER,
            field:"is_right",
            comment:"0 错误 1 正确"
        },
        answer: STRING(255), // 答案解析
        // type: INTEGER, // 类型(1、单选、2、多选 3、判断 4.填空 5、问答)
        // difficulty: INTEGER, // 难易程度（1、非常容易 2、比较容易 3、常规 4、较难 5、非常难）
        // question_main:STRING(255), // 题干
        // status:INTEGER, // 状态
        // is_del:INTEGER, // 是否删除（0 删除，1 未删除）
        // created_at: DATE,
        // updated_at: DATE,
        questionId: {
            type: INTEGER,
            field: "question_id",
            unique: true,
            references: {
                model: 'Questions',
                key: 'id'
            },
            comment: '试题id'
        }

    }, {
            timestamps: true,
            underscored: true,
            paranoid: true,
            freezeTableName: true,
            tableName: 'question_options',
            comment: "试题选项"
        });
    // QuestionOption.sync({ force: true });
    return QuestionOption;
};