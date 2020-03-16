import { Sequelize } from 'sequelize'
import configs from './config'
import attendee, { AttendeeStatic } from 'models/attendee'

let database: {
  sequelize: Sequelize
  models: {
    Attendees: AttendeeStatic
  }
} = null

export default () => {
  if (!database) {
    const env = process.env.NODE_ENV || 'development'

    const sequelize = new Sequelize(configs[env])

    database = {
      sequelize,
      models: {
        Attendees: attendee(sequelize),
      },
    }

    sequelize.sync().done(() => database)
  }
  return database
}
