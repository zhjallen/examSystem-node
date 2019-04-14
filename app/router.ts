import { Application } from 'egg';
// import questionRouter from "./router/question";


export default (app: Application) => {
  const { controller, router } = app;
  // questionRouter(app);
  router.get('/', controller.home.index);
  router.get('/userslist', controller.user.index);
  router.get('/users/:id', controller.user.show);
  router.get('/questions/:id', controller.question.show);
  router.get('/questionslist', controller.question.getQuestionList);
  router.post('/question/add', controller.question.addQuestion);
};
