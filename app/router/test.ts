/**
 * 考试路由 
 * @param app 
 */
const testRouter = app => {
    const { controller, router } = app;
    router.get('/tests/:id', controller.question.getQuestionById);
    router.get('/testslist', controller.question.getQuestionList);
    router.delete("/tests/:id", controller.question.delQuestionById);
    router.post('/tests/add', controller.question.addQuestion);
}
export default testRouter;