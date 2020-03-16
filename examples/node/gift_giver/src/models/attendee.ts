import { DataTypes, Model, Sequelize, BuildOptions } from 'sequelize'

export interface Attendee {
  awarded: boolean
  id: number
  image_url?: string
  name: string
  rsvp_answer?: number
  vendor_user_id: string
}

export type AttendeeStatic = typeof Model &
  (new (values?: object, options?: BuildOptions) => Attendee)

export default (sequelize: Sequelize) =>
  sequelize.define('attendees', {
    awarded: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
    },
  }) as AttendeeStatic
