import { Sequelize } from 'sequelize'
import configs from './config'
import attendees, { Attendees } from 'attendees/attendees.model'

export type Database = {
  sequelize: Sequelize
  models: {
    Attendees: Attendees
  }
}

let database: Database = null

export default () => {
  if (!database) {
    const env = process.env.NODE_ENV || 'development'

    const sequelize = new Sequelize({
      ...configs[env],
      define: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
    })

    database = {
      sequelize,
      models: {
        Attendees: attendees(sequelize),
      },
    }

    sequelize.sync().done(() => database)
  }
  return database
}
