import * as supertest from 'supertest'
import createApp from 'app'

export default () => {
  const app = createApp()
  return {
    app,
    request: supertest(app),
  }
}
