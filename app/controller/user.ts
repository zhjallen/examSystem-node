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
    const userObj = await ctx.service.user.getUserList();
    ctx.body = {
      total: userObj.count,
      users: userObj.rows,
    }
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
    if (user) {
      ctx.body = user;
      ctx.status = 200;
    } else {
      ctx.body = {};
      ctx.status = 204;
    }

  }
  public async delUser() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.delUser();
  }
  async updateUser() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.userId);
    const user = await ctx.model.User.findById(id);
    if (!user) {
      ctx.status = 404;
      return;
    }
    ctx.body = await ctx.service.user.updateUser();

  }
}

module.exports = UserController;
