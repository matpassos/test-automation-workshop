import * as express from 'express'
import createDatabase, { Database } from 'config/database'
import { attendeesRoutes } from 'attendees'

export interface App extends express.Express {
  database: Database
}

const createApp = () => {
  const app = express() as App
  app.database = createDatabase()

  app.set('port', process.env.PORT || 4242)

  app.use(express.json())

  attendeesRoutes(app)

  return app
}

export default createApp
