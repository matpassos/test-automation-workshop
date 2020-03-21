import * as HttpStatus from 'http-status-codes'
import { Attendees } from 'attendees'

const defaultResponse = <T>(data: T, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
})

const errorResponse = (
  message: string,
  statusCode = HttpStatus.INTERNAL_SERVER_ERROR
) =>
  defaultResponse(
    {
      message,
    },
    statusCode
  )

export default class AttendeesController {
  constructor(private attendees: Attendees) {}

  getAll() {
    return this.attendees
      .findAll()
      .then(attendees => defaultResponse(attendees))
      .catch(error => errorResponse(error.message))
  }
}
