import * as td from 'testdouble'
import AttendeesController from 'attendees/attendees.controller'
import { Attendee, Attendees } from 'attendees/attendees.model'

describe('attendees controller', () => {
  describe('get all attendees: getAll()', () => {
    it('should return a list of attendees', done => {
      const attendees = {
        findAll: td.function(),
      } as Attendees

      const expectedAttendees: Attendee[] = [
        {
          id: 1,
          awarded: false,
          image_url: null,
          name: 'attendee',
          rsvp_answer: null,
          vendor_user_id: 'attendee_1',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ]

      td.when(attendees.findAll()).thenResolve(expectedAttendees)

      return new AttendeesController(attendees).getAll().then(response => {
        const receivedAttendees = response.data as Attendee[]

        receivedAttendees.map((received, i) => {
          const expected = expectedAttendees[i]

          expect([
            expected.id,
            expected.awarded,
            expected.image_url,
            expected.name,
            expected.rsvp_answer,
            expected.vendor_user_id,
          ]).toEqual([
            received.id,
            received.awarded,
            received.image_url,
            received.name,
            received.rsvp_answer,
            received.vendor_user_id,
          ])

          expect(received.created_at).toBeTruthy()
          expect(received.updated_at).toBeTruthy()
        })

        done()
      })
    })

    it('should return an error', done => {
      const attendees = {
        findAll: td.function(),
      } as Attendees

      const expectedError = new Error('error message')

      td.when(attendees.findAll()).thenReject(expectedError)

      return new AttendeesController(attendees).getAll().then(response => {
        const receivedError = response.data as { message: string }

        expect(expectedError.message).toBe(receivedError.message)
        done()
      })
    })
  })
})
