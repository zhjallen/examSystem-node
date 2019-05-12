'use strict';
// const QuestionOption = require("./questionOption");
/**
 * 考试内容
 *
 * @param {*} app
 * @returns
 */
module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize;
    const TestContent = app.model.define('testContent', {
        id: {
            type: INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
        },
        name: {
            type: STRING(255),
            allowNull: false,
        },
        desc: {
            type: STRING(2550),
            comment: "描述",
            allowNull: false
        }, // 状态
        key: {
            type: STRING(100),
            allowNull: false,
            comment: "键值"
        },
        sort: {
            type: INTEGER,
            allowNull: false,
            comment: "排序"
        },
        questionNum: {
            type: INTEGER,
            defaultValue: 0,
            field:"question_num",
            comment: "试题数量",
        },
        questionNumScore: {
            type: INTEGER,
            comment: "试题分值",
            defaultValue: 0,
            allowNull: false
        },

        // difficulty: INTEGER, // 难易程度（1、非常容易 2、比较容易 3、常规 4、较难 5、非常难）
        // question_main: STRING(255), // 题干

       
        createdBy: {
            type: INTEGER,
            comment: "创建人id"
        },
        remark: {
            type: STRING(255),
            comment: "备注"
        },
        testId: {
            type: INTEGER,
            field: "test_id",
            unique: true,
            references: {
                model: 'Tests',
                key: 'id'
            },
            comment: '考试id'
        }
        // created_at: DATE,
        // updated_at: DATE,

    }, {
            timestamps: true,
            underscored: true,
            paranoid: true,
            freezeTableName: true,
            tableName: 'test_contents',
            comment: "考试内容"
        });
    // Question.associate = () => {
    //     // 定义多对多关联
    //     Question.hasMany(app.model.QuestionOption, {
    //         // 中间表的model
    //         // through: app.model.groupUser,
    //         // 进行关联查询时，关联表查出来的数据模型的alias
    //         as: 'options',
    //         // 是否采用外键进行物理关联
    //         constraints: true,
    //         foreignKey: 'question_id', targetKey: 'id'

    //     });
    //     // 这里如果一个模型和多个模型都有关联关系的话，关联关系需要统一定义在这里
    // };

    //TestContent.sync({ force: true });
    return TestContent;
};