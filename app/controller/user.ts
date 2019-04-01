import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async users() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.users();
  }
}
