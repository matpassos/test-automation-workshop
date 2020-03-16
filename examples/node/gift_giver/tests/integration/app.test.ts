import app from '../../src/app'
import * as supertest from 'supertest'
import database from '../../src/config/database'
import { Attendee, AttendeeStatic } from '../../src/models/attendee'

const request = supertest(app)

describe('attendees routes', () => {
  const Attendees: AttendeeStatic = database().models.Attendees

  const defaultAttendee: Attendee = {
    awarded: false,
    id: 1,
    name: 'attendee',
    vendor_user_id: 'attendee_1',
  }

  beforeEach(done => {
    Attendees.destroy({ where: {} })
      .then(() => Attendees.create(defaultAttendee))
      .then(() => done())
  })

  describe('Route GET /attendees', () => {
    it('should return list of attendees', done => {
      request.get('/attendees').end((_err, res) => {
        expect(res.body[0].id).toBe(defaultAttendee.id)
        expect(res.body[0].name).toBe(defaultAttendee.name)
        done()
      })
    })
  })
})
