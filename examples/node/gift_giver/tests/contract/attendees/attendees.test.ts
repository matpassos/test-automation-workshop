import createAppEnv from '../../create-app-env'
import { HttpStatus, Joi, JoiAssert, td } from '../../helpers'
import { Attendee } from 'attendees'

const { app, request } = createAppEnv()

describe('attendees routes', () => {
  const { Attendees } = app.database.models

  const attendeeContract = Joi.object().keys({
    id: Joi.number(),
    awarded: Joi.boolean(),
    image_url: Joi.string()
      .allow('', null)
      .optional(),
    name: Joi.string(),
    rsvp_answer: Joi.string()
      .allow('', null)
      .optional(),
    vendor_user_id: Joi.string(),
    created_at: Joi.date(),
    updated_at: Joi.date(),
  })

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

  describe('GET /attendees', () => {
    const originalFindAll = Attendees.findAll

    beforeEach(done => {
      Attendees.destroy({ where: {} })
        .then(() => Attendees.create(defaultAttendee))
        .then(() => done())
    })

    afterEach(done => {
      Attendees.findAll = originalFindAll
      Attendees.destroy({ where: {} }).then(() => done())
    })

    it('should return a list of attendees', done => {
      const attendeesListContract = Joi.array().items(attendeeContract)

      request.get('/attendees').end((_err, res) => {
        JoiAssert(res.body, attendeesListContract)
        expect(res.status).toBe(HttpStatus.OK)
        done()
      })
    })

    it('should return an error', done => {
      const errorContract = Joi.object().keys({
        message: Joi.string(),
      })

      Attendees.findAll = td.function() as any
      td.when(Attendees.findAll()).thenReject(new Error('error message'))

      request.get('/attendees').end((_err, res) => {
        JoiAssert(res.body, errorContract)
        expect(res.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR)
        done()
      })
    })
  })
})
