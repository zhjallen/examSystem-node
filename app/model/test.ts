'use strict';
const TestContent = require("./testContent");
const User = require("./user");
const TestUser = require("./test-user");
/**
 * 考试
 *
 * @param {*} app
 * @returns
 */
module.exports = app => {
    const { STRING, INTEGER, DATE, FLOAT } = app.Sequelize;
    const Test = app.model.define('test', {
        id: {
            type: INTEGER, primaryKey: true, autoIncrement: true, allowNull: false,
        },
        name: {
            type: STRING(255),
            allowNull: false,
        },
        status: {
            type: INTEGER,
            comment: "试卷状态 1 开放 0 关闭",
            defaultValue: 1,
            allowNull: false
        }, // 状态
        startTime: {
            type: DATE,
            allowNull: false,
            field: "start_time",
            comment: "开始时间"
        },
        finishTime: {
            type: DATE,
            allowNull: false,
            field: "finish_time",
            comment: "结束时间"
        },
        length: {
            type: FLOAT,
            defaultValue: 0,
            comment: "考试时长",
        },
        type: {
            type: INTEGER,
            comment: "试卷类型 1 普通考试 2 随机考试",
            defaultValue: 1,
            allowNull: false
        },

        // difficulty: INTEGER, // 难易程度（1、非常容易 2、比较容易 3、常规 4、较难 5、非常难）
        // question_main: STRING(255), // 题干

        totalScore: {
            type: INTEGER,
            allowNull: false,
            comment: "卷面总分",
            field: "total_score"

        },
        passScore: {
            type: INTEGER,
            allowNull: false,
            comment: "及格分数",
            field: "pass_score"
        },
        createdBy: {
            type: INTEGER,
            comment: "创建人id"
        },
        remark: {
            type: STRING(255),
            comment: "备注"
        },
        isDel: {
            type: INTEGER,
            defaultValue: 0,
            field: "is_del",
            comment: "0 未删除 1 删除"
        }, // 是否删除（0 删除，1 未删除）
        // created_at: DATE,
        // updated_at: DATE,

    }, {
            timestamps: true,
            underscored: true,
            paranoid: true,
            freezeTableName: true,
            tableName: 'tests',
            comment: "考试"
        });
    Test.associate = () => {
        // test与testContent 是一对多关系
        Test.hasMany(app.model.TestContent, {
            // 中间表的model
            // through: app.model.groupUser,
            // 进行关联查询时，关联表查出来的数据模型的alias
            as: 'contents',
            // 是否采用外键进行物理关联
            constraints: true,
            foreignKey: 'test_id', targetKey: 'id'

        });
        // test与user是多对多关系
        Test.belongsToMany(app.model.User, {
            through: app.model.TestUser,
            foreignKey: 'testId',
            otherKey: 'userId'
        })
        // 这里如果一个模型和多个模型都有关联关系的话，关联关系需要统一定义在这里
    };

    // Test.sync({ force: true });
    return Test;
};