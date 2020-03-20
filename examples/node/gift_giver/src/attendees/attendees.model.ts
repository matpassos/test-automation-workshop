import { DataTypes, Model, Sequelize, BuildOptions } from 'sequelize'

export interface Attendee {
  id?: number
  awarded: boolean
  image_url: string | null
  name: string
  rsvp_answer: number | null
  vendor_user_id: string
  created_at: Date
  updated_at: Date
}

export interface AttendeeInstance extends Attendee, Model {}

export type Attendees = typeof Model &
  (new (values?: object, options?: BuildOptions) => AttendeeInstance)

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
      validate: {
        notEmpty: true,
      },
    },
  }) as Attendees
