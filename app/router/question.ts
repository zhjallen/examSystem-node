const questionRouter = app => {
    const { controller, router } = app;
    router.get('/questions/:id', controller.question.getQuestionById);
    router.get('/questionslist', controller.question.getQuestionList);
    router.delete("/questions/:id", controller.question.delQuestionById);
    router.post('/question/add', controller.question.addQuestion);
}
export default questionRouter;