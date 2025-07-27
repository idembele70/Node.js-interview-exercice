
import request from 'supertest';
import app from './app.mjs';
describe('GET /', () => {
  it('should return Hello world message', async () => {
    const res = await request(app).get('/')
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Hello World')
  });
});