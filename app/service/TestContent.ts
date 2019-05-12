import { Service } from 'egg';

/**
 * Test Service
 */
export default class TestContent extends Service {


  
  public async addTestContents() {
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
