import { Controller } from 'egg';

// app/controller/users.js

// function toInt(str) {
//   if (typeof str === 'number') return str;
//   if (!str) return str;
//   return parseInt(str, 10) || 0;
// }

class TestContentController extends Controller {
 

 
  async addTestContents() {
    const { ctx } = this;
    // ctx.status = 201;
    ctx.body = await ctx.service.testContent.addTestContents();
  }
//   public async delTestId() {
//     const { ctx } = this;
//     const { id } = ctx.params;
//     if (!id) {
//       ctx.status = 400;
//       ctx.body = {
//         message: "缺少试题id",
//         data: "eeeee"
//       }
//       return;
//     } else {
//       ctx.body = await ctx.service.question.delQuestionById(id);
//     }
//   }


}

module.exports = TestContentController;
