import { td, HttpStatus } from '../../helpers'
import { Attendee, Attendees, AttendeesController } from 'attendees'

describe('attendees controller', () => {
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

  describe('get all attendees: getAll()', () => {
    const attendees = {
      findAll: td.function(),
    } as Attendees

    it('should return a list of attendees', done => {
      const expectedAttendees: Attendee[] = [defaultAttendee]

      td.when(attendees.findAll()).thenResolve(expectedAttendees)

      return new AttendeesController(attendees).getAll().then(response => {
        const receivedAttendees = response.data as Attendee[]

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

        expect(response.statusCode).toBe(HttpStatus.OK)

        done()
      })
    })

    it('should return an error', done => {
      const expectedError = new Error('error message')

      td.when(attendees.findAll()).thenReject(expectedError)

      return new AttendeesController(attendees).getAll().then(response => {
        const receivedError = response.data as { message: string }

        expect(receivedError.message).toBe(expectedError.message)
        expect(response.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR)
        done()
      })
    })
  })
})
