const userRouter = app => {
    const { controller, router } = app;
    router.get('/userlist', controller.user.userList);
    router.get("/login", controller.user.login);
    router.post("/user/add", controller.user.addUser);
    router.delete("/users/:userId", controller.user.delUser);
    router.put("/users/:userId", controller.user.updateUser);
}
export default userRouter;