import { Controller } from 'egg';

// app/controller/users.js

// function toInt(str) {
//   if (typeof str === 'number') return str;
//   if (!str) return str;
//   return parseInt(str, 10) || 0;
// }

class QuestionController extends Controller {
  /**
   * 获取试题列表
   *
   * @memberof QuestionController
   */
  async getQuestionList() {
    const ctx = this.ctx;
    // const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    const questionsObj = await ctx.service.question.getQuestionList();
    ctx.body = {
      total: questionsObj.count,
      questions: questionsObj.rows,
    }
  }

  async getQuestionById() {
    const ctx = this.ctx;
    const { id } = ctx.params;
    if (!id) {
      ctx.status = 400;
      ctx.body = {
        message: "缺少试题id",
        data: "eeeee"
      }
      return;
    } else {
      ctx.body = await ctx.service.question.getQuestionById(id);
    }
   
  }
  async addQuestion() {
    const { ctx } = this;
    ctx.status = 201;
    ctx.body = await ctx.service.question.addQuestion();
  }
  public async delQuestionById() {
    const { ctx } = this;
    const { id } = ctx.params;
    if (!id) {
      ctx.status = 400;
      ctx.body = {
        message: "缺少试题id",
        data: "eeeee"
      }
      return;
    } else {
      ctx.body = await ctx.service.question.delQuestionById(id);
    }
  }


}

module.exports = QuestionController;
