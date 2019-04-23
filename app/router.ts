import { Application } from 'egg';
// import questionRouter from "./router/question";


export default (app: Application) => {
  const { controller, router } = app;
  // questionRouter(app);
  router.get('/', controller.home.index);
  router.get('/userlist', controller.user.userList);
  router.get("/login",controller.user.login);
  router.post("/user/add",controller.user.addUser);
  router.delete("/users/:userId",controller.user.delUser);
  router.put("/users/:userId",controller.user.updateUser);
  router.get('/questions/:id', controller.question.show);
  router.get('/questionslist', controller.question.getQuestionList);
  router.post('/question/add', controller.question.addQuestion);
};
