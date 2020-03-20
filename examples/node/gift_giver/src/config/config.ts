import { Options } from 'sequelize'

const configs: {
  [key: string]: Options
} = {
  development: {
    database: 'gift_giver',
    username: '',
    password: '',
    dialect: 'sqlite',
    storage: 'database_development.sqlite3',
    define: {
      underscored: true,
    },
  },
  test: {
    database: 'gift_giver',
    dialect: 'sqlite',
    storage: ':memory:',
    define: {
      underscored: true,
    },
  },
}

export default configs
