import { Sequelize, Options } from 'sequelize'
import { Attendees, createAttendees } from 'attendees'

export type Database = {
  sequelize: Sequelize
  models: {
    Attendees: Attendees
  }
}

export default (config: Options) => {
  const sequelize = new Sequelize(config)

  const database: Database = {
    sequelize,
    models: {
      Attendees: createAttendees(sequelize),
    },
  }

  sequelize.sync().done(() => database)

  return database
}
