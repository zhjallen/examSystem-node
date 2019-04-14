import { Service } from "egg";

export default class Question extends Service {
    public async getQuestionList() {
        const { ctx } = this;
        const questions = ctx.model.Question.findAll();
        return questions;
    }
    public async addQuestion() {
        const { ctx } = this;
        const  questionInfo  = ctx.request.body;
        console.log(questionInfo,"info")
        const question = ctx.model.Question.create(questionInfo);
        return question;
    }
}