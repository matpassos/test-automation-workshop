import { QueryInterface, Sequelize, DataTypes } from 'sequelize'

export default {
  up: (queryInterface: QueryInterface, _sequelize: Sequelize) => {
    return queryInterface.createTable('attendees', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      awarded: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      image_url: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      rsvp_answer: {
        type: DataTypes.STRING,
      },
      vendor_user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    })
  },
  down: (queryInterface: QueryInterface, _sequelize: Sequelize) => {
    return queryInterface.dropTable('attendees')
  },
}
