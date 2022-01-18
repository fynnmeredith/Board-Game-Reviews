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

describe('/api/reviews/:review_id', () => {
  describe('GET', () => {
    test('status 200, will return a review object matching the review id entered', () => {
      return request(app)
        .get('/api/reviews/2')
        .expect(200)
        .then((res) => {
          expect(res.body.review).toEqual({
            owner: expect.any(String),
            title: expect.any(String),
            review_id: 2,
            review_body: expect.any(String),
            designer: expect.any(String),
            review_img_url: expect.any(String),
            category: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            comment_count: expect.any(Number)
          })
        })
      });
    });
  });
  // describe('/api/invalid_url', () => {
  //     test('Status: 404 and returns and error message', () => {
  //         return request(app)
  //             .get('/api/invalid_url')
  //             .expect(404)
  //             .then((res) => {
  //                 expect(res.body.msg).toBe('Not Found');
  //             });
  //     });
  // });