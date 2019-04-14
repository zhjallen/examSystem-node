const questionRouter = app => {
    app.router.get("/question/add", app.controller.question.addQuestion("eee"))
}
export default questionRouter;