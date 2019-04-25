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
            is_del: 1
        }
        if (type) {
            whereObj["type"] = Number(type);
        }
        if (difficulty) {
            whereObj["difficulty"] = Number(difficulty);
        }
        const questionsObj = ctx.model.Question.findAndCountAll(
            {
                limit: Number(pageSize), offset: offset, order: [
                    ["created_at", "DESC"]
                ],
                where: whereObj
            }
        );
        return questionsObj;
    }
    public async addQuestion() {
        const { ctx } = this;
        const questionInfo = ctx.request.body;
        console.log(questionInfo, "info")
        const question = ctx.model.Question.create(questionInfo);
        return question;
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
        const questinObj = ctx.model.Question.findById(id);
        return questinObj;
    }
}