import process from 'node:process'
import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const bd = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    post: process.env.DB_PORT,
  },

)
export { bd }
