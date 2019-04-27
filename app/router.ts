import { Application } from 'egg';
import questionRouter from "./router/question";
import userRouter from "./router/user";

export default (app: Application) => {
  const { controller, router } = app;
  questionRouter(app);
  userRouter(app);
  router.get('/', controller.home.index);


};
