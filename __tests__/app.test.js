const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');
const app = require('../app')
const request = require('supertest')

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('/api/categories', () => {
    describe('GET', () => {
      test('status 200, will return an array of categories', () => {
        return request(app)
          .get('/api/categories')
          .expect(200)
          .then((res) => {
            res.body.categories.forEach((category) => {
              expect(category).toEqual(
                expect.objectContaining({
                  slug: expect.any(String),
                  description: expect.any(String),
                })
              );
            });
          });
      });
    });
    describe('/api/invalid_url', () => {
        test('Status: 404 and returns and error message', () => {
            return request(app)
                .get('/api/invalid_url')
                .expect(404)
                .then((res) => {
                    expect(res.body.msg).toBe('Not Found');
                });
        });
    });
})