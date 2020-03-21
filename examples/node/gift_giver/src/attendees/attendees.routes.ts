import { App } from 'app'
import { AttendeesController } from 'attendees'

export default (app: App) => {
  const controller = new AttendeesController(app.database.models.Attendees)

  app.get('/attendees', (_req, res) => {
    controller
      .getAll()
      .then(response => res.status(response.statusCode).json(response.data))
  })
}
