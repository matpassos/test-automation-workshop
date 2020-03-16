import * as express from 'express'
import database from 'config/database'

const app = express()

app.set('port', process.env.PORT || 4242)

app.get('/attendees', (_, res) => {
  database()
    .models.Attendees.findAll()
    .then(attendees => res.json(attendees))
    .catch(() => res.status(500))
})

export default app
