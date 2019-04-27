'use strict';
const QuestionOption = require("./questionOption");
/**
 * 试题
 *
 * @param {*} app
 * @returns
 */
module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;
    const Question = app.model.define('question', {
        id: {
            type: INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
        },
        name: STRING(255),
        type: INTEGER, // 类型(1、单选、2、多选 3、判断 4.填空 5、问答)
        difficulty: INTEGER, // 难易程度（1、非常容易 2、比较容易 3、常规 4、较难 5、非常难）
        question_main: STRING(255), // 题干
        status: INTEGER, // 状态
        score: {
            type: INTEGER,

        },
        isdel: {
            type: INTEGER,
            field: "is_del",
            comment: "0 未删除 1 删除"
        }, // 是否删除（0 删除，1 未删除）
        created_at: DATE,
        updated_at: DATE,

    }, {
            timestamps: true,
            underscored: true,
            paranoid: true,
            freezeTableName: true,
            tableName: 'questions',
            comment: "试题"
        });
    Question.associate = () => {
        // 定义多对多关联
        Question.hasMany(app.model.QuestionOption, {
            // 中间表的model
            // through: app.model.groupUser,
            // 进行关联查询时，关联表查出来的数据模型的alias
            as: 'options',
            // 是否采用外键进行物理关联
            constraints: true,
            foreignKey: 'question_id', targetKey: 'id'

        });
        // 这里如果一个模型和多个模型都有关联关系的话，关联关系需要统一定义在这里
    };

    // Question.sync({ force: true });
    return Question;
};