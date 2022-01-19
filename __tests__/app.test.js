const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');
const app = require('../app')
const request = require('supertest')
require('jest-sorted')

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('GET /api/categories', () => {
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
    describe('ERROR - /api/invalid_url', () => {
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

describe('GET /api/reviews/:review_id', () => {
  describe('GET', () => {
    test('status 200, will return a review object matching the review id entered with the addition of comment count', () => {
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
            comment_count: expect.any(String)
          })
        })
      });
    });
    describe('GET ERRORS', () => {
      test('Status: 404 and returns and NOT FOUND error msg', () => {
          return request(app)
              .get('/api/reviews/2000')
              .expect(404)
              .then((res) => {
                  expect(res.body.msg).toBe('Not Found');
              });
      });
      test('Status: 400 and returns and BAD REQUEST error msg', () => {
        return request(app)
            .get('/api/reviews/abc')
            .expect(400)
            .then((res) => {
                expect(res.body.msg).toBe('Bad Request');
          });
      });
  });
})

describe('PATCH /api/reviews/:review_id', () => {
    describe('PATCH', () => {
      test('status 200, will return an updated votes count incrememented by the amount in request body', () => {
        return request(app)
        .patch('/api/reviews/2')
        .send({
          inc_votes: 2
        })
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
              votes: 7,
            })
          })
        });
      });
      describe('PATCH ERRORS', () => {
        test('status: 404 review_id not found', () => {
          return request(app)
              .patch('/api/reviews/2000')
              .send({
                inc_votes: 2
              })
              .expect(404)
              .then((res) => {
                  expect(res.body.msg).toBe('Not Found');
              });
        })
        test('status: 400, send request invalid', () => {
          return request(app)
              .patch('/api/reviews/2')
              .send({
                invalid: "invalid"
              })
              .expect(400)
              .then((res) => {
                  expect(res.body.msg).toBe('Bad Request');
              });
        })
      })
    });

describe('GET /api/reviews', () => {
    describe('GET', () => {
      test('status 200, will return an array of reviews with comment_count', () => {
        return request(app)
          .get('/api/reviews')
          .expect(200)
          .then((res) => {
            res.body.reviews.forEach((review) => {
              expect(review).toEqual(
                expect.objectContaining({
            owner: expect.any(String),
            title: expect.any(String),
            review_id: expect.any(Number),
            review_img_url: expect.any(String),
            category: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            comment_count: expect.any(String)
                })
              );
            });
          })
        });
      });
      test('status: 200 will respond with with an array of reviews sorted and ordered by default', () => {
        return request(app)
        .get('/api/reviews')
        .expect(200)
        .then((res) => {
          expect(res.body.reviews).toBeSortedBy('created_at', {descending: true})
        })
      })
      test('status: 200 will respond with with an array of reviews sorted by votes and ordered asc', () => {
        return request(app)
        .get('/api/reviews?sort_by=votes&order=ASC')
        .expect(200)
        .then((res) => {
          expect(res.body.reviews).toBeSortedBy('votes', {descending: false})
        })
      })
      test('status: 200 will respond with with an array of reviews sorted and ordered by default and filtered by category', () => {
        return request(app)
        .get('/api/reviews?category=dexterity')
        .expect(200)
				.then((res) => {
					res.body.reviews.forEach((review) => {
						expect(review).toEqual(
							expect.objectContaining({
								owner: expect.any(String),
              title: expect.any(String),
              review_id: expect.any(Number),
              review_img_url: expect.any(String),
              category: "dexterity",
              created_at: expect.any(String),
              votes: expect.any(Number),
              comment_count: expect.any(String)
							})
						);
					});
      })
    })
    describe('GET ERRORS for invalid url', () => {
      test('Status: 404 and returns and error message', () => {
        return request(app)
            .get('/api/notValid')
            .expect(404)
            .then((res) => {
                expect(res.body.msg).toBe('Not Found');
            });
    });
    })
  })

describe.only('GET /api/reviews/:review_id/comments', () => {
  test('Status: 200, responds with an array of comments linked to the specified review id', () => {
    return request(app)
    .get('/api/reviews/2/comments')
    .expect(200)
    .then((res) => {
      expect(Array.isArray(res.body.comments)).toBe(true)
    })
  })
  test('Status: 200, responds with an array of comment objects relating to the passed review_id', () => {
    return request(app)
    .get('/api/reviews/2/comments')
    .expect(200)
    .then((res) => {
      
    })
  })
})

