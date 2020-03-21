import { Sequelize } from 'sequelize'
import configs from './config'
import { Attendees, createAttendees } from 'attendees'

export type Database = {
  sequelize: Sequelize
  models: {
    Attendees: Attendees
  }
}

export default () => {
  const env = process.env.NODE_ENV || 'development'

  const sequelize = new Sequelize({
    ...configs[env],
    define: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  })

  const database: Database = {
    sequelize,
    models: {
      Attendees: createAttendees(sequelize),
    },
  }

  sequelize.sync().done(() => database)

  return database
}
