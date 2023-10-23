import { Sequelize } from 'sequelize'

module.exports = new Sequelize(
  import.meta.env.DB_NAME,
  import.meta.env.DB_USER,
  import.meta.env.DB_PASSWORD,
  {
    dialect: 'postgres',
    host: import.meta.env.DB_HOST,
    post: import.meta.env.DB_PORT,
  },

)
