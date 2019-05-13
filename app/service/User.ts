import { Service } from 'egg';

/**
 * Test Service
 */
export default class User extends Service {

    public async getUserList() {
        const { ctx } = this;
        const { page, pageSize, name, userName, type } = ctx.query;
        let offset = 0;

        if (pageSize > 0) {
            offset = Number(page - 1) * Number(pageSize);
        }
        const users = ctx.model.User.findAndCountAll({
            limit: Number(pageSize), offset: offset, order: [
                ["createdAt", "DESC"]
            ],
            where: {
                name: {
                    $like: `%${name || ""}%`
                },
                userName: {
                    $like: `%${userName || ""}%`
                },
                type: {
                    $like: `%${type || ""}%`
                }
            },
        });

        return users;
    }
    public async login() {
        const { ctx } = this;
        const { password, userName, type } = ctx.query;
        const user = ctx.model.User.findOne({ where: { userName, password, type } });
        return user;
    }
    public async addUser() {
        const { ctx } = this;
        const userInfo = ctx.request.body;
        try {
            const user = ctx.model.User.create(userInfo);

            return user;
        } catch (error) {
        }


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
