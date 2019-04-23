import { Service } from 'egg';

/**
 * Test Service
 */
export default class User extends Service {

    public async getUserList() {
        const { ctx } = this;
        const { page, pageSize, name, username } = ctx.query;
        let offset = 0;

        if (pageSize > 0) {
            offset = Number(page - 1) * Number(pageSize);
        }
        const users = ctx.model.User.findAndCountAll({
            limit: Number(pageSize), offset: offset, order: [
                ["created_at", "DESC"]
            ],
            where: {
                name: {
                    $like: `%${name || ""}%`
                },
                username: {
                    $like: `%${username || ""}%`
                }
            },
        });

        return users;
    }
    public async login() {
        const { ctx } = this;
        const { password, username, type } = ctx.query;
        const user = ctx.model.User.findOne({ where: { username, password, type } });
        return user;
    }
    public async addUser() {
        const { ctx } = this;
        const userInfo = ctx.request.body;
        console.log(userInfo, "info")
        const user = ctx.model.User.create(userInfo);
        return user;
    }
    public async delUser() {
        const { ctx } = this;
        const { userId } = ctx.params;
        return ctx.model.User.destroy({
            where: {
                id: userId
            }
        })
    }
    public async updateUser() {
        const { ctx } = this;
        const userInfo = ctx.request.body;
        const userObj = ctx.model.User.update(userInfo, {
            where: {
                id: userInfo.id
            }
        })
        return userObj;
    }

}
