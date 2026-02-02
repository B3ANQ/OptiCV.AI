import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  'opticv_db',
  'victor',
  '',
  {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

export default sequelize;