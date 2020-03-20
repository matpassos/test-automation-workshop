import * as HttpStatus from 'http-status-codes'
import { Attendees, Attendee } from 'attendees/attendees.model'

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
  private attendees: Attendees

  constructor(attendees: Attendees) {
    this.attendees = attendees
  }

  getAll() {
    return this.attendees
      .findAll()
      .then((attendees: Attendee[]) => defaultResponse(attendees))
      .catch(error => errorResponse(error.message))
  }
}
