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
    define: { underscored: true, },
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
  config.middleware = [];

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

