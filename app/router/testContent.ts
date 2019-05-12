/**
 * 考试内容路由
 * @param app 
 */
const testRouter = app => {
    const { controller, router } = app;
    // router.get('/tests/:id', controller.question.getQuestionById);
    // router.get('/testslist', controller.test.getTestList);
    // router.delete("/tests/:id", controller.question.delQuestionById);
    router.post('/testcontents/add', controller.testContent.addTestContents);
}
export default testRouter;