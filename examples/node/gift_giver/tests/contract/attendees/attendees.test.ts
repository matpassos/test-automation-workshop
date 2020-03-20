import * as HttpStatus from 'http-status-codes'
import * as Joi from 'joi'
import * as JoiAssert from 'joi-assert'
import * as supertest from 'supertest'
import * as td from 'testdouble'
import app from 'app'
import { Attendee } from 'attendees/attendees.model'

const request = supertest(app)

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

  beforeEach(done => {
    Attendees.destroy({ where: {} })
      .then(() => Attendees.create(defaultAttendee))
      .then(() => done())
  })

  describe('GET /attendees', () => {
    it('should return a list of attendees', done => {
      const attendeesListContract = Joi.array().items(attendeeContract)

      request
        .get('/attendees')
        .expect(HttpStatus.OK)
        .end((_err, res) => {
          JoiAssert(res.body, attendeesListContract)
          done()
        })
    })

    it('should return an error', done => {
      const errorContract = Joi.object().keys({
        message: Joi.string(),
      })

      Attendees.findAll = td.function() as any

      td.when(Attendees.findAll()).thenReject(new Error('error message'))

      request
        .get('/attendees')
        .expect(HttpStatus.INTERNAL_SERVER_ERROR)
        .on('error', err => JoiAssert(err.response.body, errorContract))
        .end(() => done())
    })
  })
})
