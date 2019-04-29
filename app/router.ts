import { Application } from 'egg';
import questionRouter from "./router/question";
import userRouter from "./router/user";
import testRouter from "./router/test";

export default (app: Application) => {
  const { controller, router } = app;
  questionRouter(app);
  userRouter(app);
  testRouter(app);
  router.get('/', controller.home.index);


};
