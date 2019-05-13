import { Service } from 'egg';

/**
 * Test Service
 */
export default class Test extends Service {


  public async getTestList() {
    const { ctx } = this;
    const { page, pageSize, name, status } = ctx.query;
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
    if (status !== undefined) {
      whereObj["status"] = Number(status);
    }
    // if (difficulty) {
    //     whereObj["difficulty"] = Number(difficulty);
    // }
    const tests =await ctx.model.Test.findAll(
      {
        limit: Number(pageSize), offset: offset, order: [
          ["created_at", "DESC"]
        ],
        include: [
          {
            model: ctx.model.User,
            attributes: ['id'],
            // where: { completed: true }
          }
        ],
        where: whereObj
      }
    );
    const count = await ctx.model.Test.count({
      where: whereObj,
    });
    return {
      tests,
      count
    };
    // const reselt=ctx.model.query("select *")

  }
  public async addTest() {
    const { ctx } = this;
    const { testInfo } = ctx.request.body;
    let testResult;
    const t = await ctx.model.transaction();
    try {

      testResult = await ctx.model.Test.create(testInfo, {
        transaction: t
      })
      const testId = testResult && testResult.id;
      if (!testId) {
        throw new Error("创建考试失败");
      }
      let test_users = [];
      if (testInfo.users && testInfo.users.length > 0) {
        test_users = await ctx.model.TestUser.bulkCreate(testInfo.users.map(user => {
          return {
            userId: user.id,
            testId: testId
          }
        }), {
            transaction: t
          })
      }
      await t.commit();
      return { testResult, test_users }
    } catch (err) {
      ctx.logger.error(err);
      t.rollback();
    }
    // const question = ctx.model.Question.create(questionInfo);
    // return testResult;
  }

}
