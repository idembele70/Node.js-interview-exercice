import request from "supertest";
import app from "../app";

describe('GET /admin', function() {
  it('block user', function(done) {
    request(app)
    .get('/admin')
    .expect(403)
    .expect({ message: 'Permission denied' }, done);
  })
  it('authorize user', function(done) {
    request(app)
    .get('/admin')
    .set('X-Admin', 'true')
    .expect(200)
    .expect({ message: 'Welcome to admin page'}, done)
  })
})