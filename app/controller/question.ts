import { Controller } from 'egg';

// app/controller/users.js

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class QuestionController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    ctx.body = await ctx.model.Question.findAll(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Question.findById(toInt(ctx.params.id));
  }

  
}

module.exports = QuestionController;
