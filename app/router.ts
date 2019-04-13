import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.get('/userslist', controller.user.index);
  router.get('/users/:id', controller.user.show);
  router.get('/questions/:id', controller.question.show);
  router.get('/questionslist', controller.question.index);
};
