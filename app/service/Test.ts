import { Service } from 'egg';

/**
 * Test Service
 */
export default class Test extends Service {


  public async getTestList() {
    const { ctx } = this;
    const { page, pageSize, name } = ctx.query;
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
    // if (type) {
    //     whereObj["type"] = Number(type);
    // }
    // if (difficulty) {
    //     whereObj["difficulty"] = Number(difficulty);
    // }
    const testsObj = ctx.model.Test.findAndCountAll(
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
    return testsObj;
  }
  public async addTest() {
    const { ctx } = this;
    const { testInfo } = ctx.request.body;
    let testResult;
    try {
      testResult = ctx.model.Test.create(testInfo)
    } catch (err) {
      ctx.logger.error(err);
      // t1.rollback();
    }
    // const question = ctx.model.Question.create(questionInfo);
    return testResult;
  }

}
