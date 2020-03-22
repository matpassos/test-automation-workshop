import { Options, Dialect } from 'sequelize'
import yn from 'yn'

const createDatabaseConfig = (): Options => {
  const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env'
  require('dotenv').config({ path: envFile })

  return {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    storage: process.env.DB_STORAGE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT as Dialect,
    database: process.env.DB_NAME,
    sync: {
      schema: process.env.DB_SCHEMA,
    },
    benchmark: yn(process.env.DB_BENCHMARK),
    logging: yn(process.env.DB_LOGGING),
    define: {
      timestamps: true,
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
}

export = createDatabaseConfig
