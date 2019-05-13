import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;
  config.sequelize = {

    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'password',
    database: 'examsystem',

    // app: true,
    // agent: false,
    define: {
      underscored: false, // 防止驼峰式字段被默认转为下划线
      freezeTableName: true,  // 防止修改表名为复数
    },
    timezone: '+8:00',  // 由于orm用的UTC时间，这里必须加上东八区，否则取出来的时间相差8小时
    dialectOptions: {  // 让读取date类型数据时返回字符串而不是UTC时间
      dateStrings: true,
      typeCast(field, next) {
        if (field.type === "DATETIME") {
          return field.string();
        }
        return next();
      }
    },
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
  };
  config.security = {
    csrf: false,
  }
  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1554102921593_8556';

  // add your egg config in here
  config.middleware = ['errorHandler'];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};

