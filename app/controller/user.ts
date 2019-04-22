import { Controller } from 'egg';

// app/controller/users.js

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class UserController extends Controller {
 

  async userList() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.user.getUserList();
  }
  async getQuestionList() {
    const ctx = this.ctx;
    // const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    ctx.body = await ctx.service.question.getQuestionList();
  }

  async addUser() {
    const ctx = this.ctx;
    const user = await ctx.service.user.addUser();
    // ctx.status = 201;
    ctx.body = user;
  }
  public async login() {
    const { ctx } = this;
    const user = await ctx.service.user.login();
    console.log(user,"user")
    if (user) {
      ctx.body = user;
      ctx.status = 200;
    } else {
      ctx.body = {};
      ctx.status = 204;
    }

  }
  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const user = await ctx.model.User.findById(id);
    if (!user) {
      ctx.status = 404;
      return;
    }

    const { name, age } = ctx.request.body;
    await user.update({ name, age });
    ctx.body = user;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const user = await ctx.model.User.findById(id);
    if (!user) {
      ctx.status = 404;
      return;
    }

    await user.destroy();
    ctx.status = 200;
  }
}

module.exports = UserController;
