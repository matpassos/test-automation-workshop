import * as express from 'express'
import { Express } from 'express'
import database, { Database } from 'config/database'
import attendeesRoutes from 'attendees/attendees.routes'

export interface App extends Express {
  database: Database
}

const app = express() as App
app.database = database()

app.set('port', process.env.PORT || 4242)

app.use(express.json())

attendeesRoutes(app)

export default app
