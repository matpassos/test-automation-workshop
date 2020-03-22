import express, { Express } from 'express'
import createDatabaseConfig from 'database/config'
import createDatabase, { Database } from 'database'
import { attendeesRoutes } from 'attendees'

export interface App extends Express {
  database: Database
}

const createApp = () => {
  const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env'
  require('dotenv').config({ path: envFile })

  const app = express() as App

  app.database = createDatabase(createDatabaseConfig())
  app.set('port', process.env.PORT)

  app.use(express.json())

  attendeesRoutes(app)

  return app
}

export default createApp
