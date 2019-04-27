import { Service } from "egg";

export default class Question extends Service {
    /**
     * 获取试题列表
     *
     * @returns
     * @memberof Question
     */
    public async getQuestionList() {
        const { ctx } = this;
        const { page, pageSize, name, type, difficulty } = ctx.query;
        let offset = 0;
        if (pageSize > 0) {
            offset = Number(page - 1) * Number(pageSize);
        }
        const whereObj = {
            name: {
                $like: `%${name || ""}%`
            },
            is_del: 0
        }
        if (type) {
            whereObj["type"] = Number(type);
        }
        if (difficulty) {
            whereObj["difficulty"] = Number(difficulty);
        }
        const questionsObj = ctx.model.Question.findAndCount(
            {
                limit: Number(pageSize), offset: offset, order: [
                    ["created_at", "DESC"]
                ],
                // include: [{
                //     model: ctx.model.QuestionOption,
                //     as: "options"
                // }
                // ],
                where: whereObj
            }
        );
        return questionsObj;
    }
    public async addQuestion() {
        const { ctx } = this;
        const questionInfo = ctx.request.body;
        const { basicInfo, options } = questionInfo;
        console.log(questionInfo, "info")
        let t1;
        try {
            t1 = await ctx.model.transaction();
            const questionBasic = await ctx.model.Question.create(basicInfo, {
                transaction: t1
            });
            const questionId = questionBasic && questionBasic.id;
            if (!questionId) {
                throw new Error("创建试题失败");
            }
            const questionDetail = await ctx.model.QuestionOption.bulkCreate(options.map(item => {
                item.questionId = questionId;
                return item;
            }), {
                    transaction: t1
                })
            await t1.commit();
            return { questionBasic, questionDetail }
        } catch (err) {
            ctx.logger.error(err);
            t1.rollback();
            console.log(t1, "tttttttt")
        }
        // const question = ctx.model.Question.create(questionInfo);
        // return question;
    }
    public async delQuestionById(id) {
        const { ctx } = this;

        const questinObj = ctx.model.Question.update({ is_del: 0 }, {
            fields: ["is_del"],
            
            where: {
                id: id
            }
        })
        return questinObj;
    }
    public async getQuestionById(id) {
        const { ctx } = this;
        const questinObj = ctx.model.Question.findById(id,{
            include: [{
                model: ctx.model.QuestionOption,
                as: "options"
            }
            ],
            
        });
        return questinObj;
    }
}