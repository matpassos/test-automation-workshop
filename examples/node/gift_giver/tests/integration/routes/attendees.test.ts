import createAppEnv from '../../createAppEnv'
import { HttpStatus, td } from '../../helpers'
import { Attendee } from 'attendees'

const { app, request } = createAppEnv()

describe('attendees routes', () => {
  const { Attendees } = app.database.models

  const defaultAttendee: Attendee = {
    id: 1,
    awarded: false,
    image_url: null,
    name: 'attendee',
    rsvp_answer: null,
    vendor_user_id: 'attendee_1',
    created_at: new Date(),
    updated_at: new Date(),
  }

  beforeEach(done => {
    Attendees.destroy({ where: {} })
      .then(() => Attendees.create(defaultAttendee))
      .then(() => done())
  })

  describe('GET /attendees', () => {
    it('should return a list of attendees', done => {
      const expectedAttendees = [defaultAttendee]

      request.get('/attendees').end((_err, res) => {
        const receivedAttendees: Attendee[] = res.body

        expect(receivedAttendees.length).toBe(expectedAttendees.length)

        receivedAttendees.forEach((received, i) => {
          const expected = expectedAttendees[i]

          expect([
            received.id,
            received.awarded,
            received.image_url,
            received.name,
            received.rsvp_answer,
            received.vendor_user_id,
          ]).toEqual([
            expected.id,
            expected.awarded,
            expected.image_url,
            expected.name,
            expected.rsvp_answer,
            expected.vendor_user_id,
          ])

          expect(received.created_at).toBeTruthy()
          expect(received.updated_at).toBeTruthy()
        })

        done()
      })
    })

    it('should return an error', done => {
      Attendees.findAll = td.function() as any

      const expectedError = new Error('error message')

      td.when(Attendees.findAll()).thenReject(expectedError)

      request.get('/attendees').end((_err, res) => {
        expect(res.body.message).toBe(expectedError.message)
        expect(res.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR)
        done()
      })
    })
  })
})
