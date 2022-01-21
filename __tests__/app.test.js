const db = require("../db/connection");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../app");
const request = require("supertest");
require("jest-sorted");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("/api/categories", () => {
  describe("GET", () => {
    test("status 200, will return an array of categories", () => {
      return request(app)
        .get("/api/categories")
        .expect(200)
        .then((res) => {
          expect(res.body.categories.length).toBeGreaterThan(0);
          res.body.categories.forEach((category) => {
            expect(Object.values(category).length).toBeGreaterThan(0);
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
  describe("ERROR - /api/invalid_url", () => {
    test("Status: 404 and returns and error message", () => {
      return request(app)
        .get("/api/invalid_url")
        .expect(404)
        .then((res) => {
          expect(res.body.msg).toBe("Not Found");
        });
    });
  });
});

describe("/api/reviews/:review_id", () => {
  describe("GET", () => {
    test("status 200, will return a review object matching the review id entered with the addition of comment count", () => {
      return request(app)
        .get("/api/reviews/2")
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
            comment_count: expect.any(String),
          });
        });
    });
  });
  describe("GET ERRORS", () => {
    test("Status: 404 and returns and NOT FOUND error msg", () => {
      return request(app)
        .get("/api/reviews/2000")
        .expect(404)
        .then((res) => {
          expect(res.body.msg).toBe("Not Found");
        });
    });
    test("Status: 400 and returns and BAD REQUEST error msg", () => {
      return request(app)
        .get("/api/reviews/abc")
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe("Not a valid ID!");
        });
    });
  });
});

describe("/api/reviews/:review_id", () => {
  describe("PATCH", () => {
    test("status 200, will return an updated votes count incrememented by the amount in request body", () => {
      return request(app)
        .patch("/api/reviews/2")
        .send({
          inc_votes: 2,
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
          });
        });
    });
  });
  describe("PATCH ERRORS", () => {
    test("status: 404 review_id not found", () => {
      return request(app)
        .patch("/api/reviews/2000")
        .send({
          inc_votes: 2,
        })
        .expect(404)
        .then((res) => {
          expect(res.body.msg).toBe("Not Found");
        });
    });
    test("status: 400, invalid ID", () => {
      return request(app)
        .patch("/api/reviews/invalid")
        .send({
          inc_votes: 2,
        })
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe("Not a valid ID!");
        });
    });
    test("status: 400, send request invalid, not a property", () => {
      return request(app)
        .patch("/api/reviews/2")
        .send({
          invalid: "invalid",
        })
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe("No votes added, check you have entered the correct key and value");
        });
    });
  });
});

describe("/api/reviews", () => {
  describe("GET", () => {
    test("status 200, will return an array of reviews with comment_count", () => {
      return request(app)
        .get("/api/reviews")
        .expect(200)
        .then((res) => {
          expect(res.body.reviews.length).toBeGreaterThan(0);
          res.body.reviews.forEach((review) => {
            expect(Object.values(review).length).toBeGreaterThan(0);
            expect(review).toEqual(
              expect.objectContaining({
                owner: expect.any(String),
                title: expect.any(String),
                review_id: expect.any(Number),
                review_img_url: expect.any(String),
                category: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                comment_count: expect.any(String),
              })
            );
          });
        });
    });
  });
  test("status: 200 will respond with with an array of reviews sorted and ordered by default", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then((res) => {
        expect(res.body.reviews).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });
  test("status: 200 will respond with with an array of reviews sorted by votes and ordered asc", () => {
    return request(app)
      .get("/api/reviews?sort_by=votes&order=ASC")
      .expect(200)
      .then((res) => {
        expect(res.body.reviews).toBeSortedBy("votes", { descending: false });
      });
  });
  test("status: 200 will respond with with an array of reviews sorted and ordered by default and filtered by category", () => {
    return request(app)
      .get("/api/reviews?category=dexterity")
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
              comment_count: expect.any(String),
            })
          );
        });
      });
  });
  describe("ERRORS /api/reviews", () => {
    test("status: 400 invalid query", () => {
      return request(app)
        .get("/api/reviews?sort_by=abc")
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe("Invalid query!");
        });
    });
    test("status: 400 invalid query", () => {
      return request(app)
        .get("/api/reviews?order=abc")
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe("Invalid query!");
        });
    });
    // test('status: 400, non-existent category', () => {
    //   return request(app)
    //   .get('/api/reviews?category=bananas')
    //   .expect(400)
    //   .then((res) => {
    //     expect(res.body.msg).toBe('Invalid query')
    //   })
    // })
  });
  describe("404 invalid URL error", () => {
    test("Status: 404 and returns and error message", () => {
      return request(app)
        .get("/api/notValid")
        .expect(404)
        .then((res) => {
          expect(res.body.msg).toBe("Not Found");
        });
    });
  });
});

describe("/api/reviews/:review_id/comments", () => {
  describe("GET", () => {
    test("Status: 200, responds with an array of comments linked to the specified review id", () => {
      return request(app)
        .get("/api/reviews/2/comments")
        .expect(200)
        .then((res) => {
          expect(Array.isArray(res.body.comments)).toBe(true);
        });
    });
    test("Status: 200, responds with an array of comment objects relating to the passed review_id", () => {
      return request(app)
        .get("/api/reviews/3/comments")
        .expect(200)
        .then((res) => {
          expect(res.body.comments.length).toBeGreaterThan(0);
          res.body.comments.forEach((comment) => {
            expect(Object.values(comment).length).toBeGreaterThan(0);
            expect(comment).toEqual(
              expect.objectContaining({
                comment_id: expect.any(Number),
                votes: expect.any(Number),
                created_at: expect.any(String),
                author: expect.any(String),
                body: expect.any(String),
              })
            );
          });
        });
    });
    test("200 and returns an empty array if review id is correct but there are no comments", () => {
      return request(app)
        .get("/api/reviews/4/comments")
        .expect(200)
        .then((res) => {
          expect(res.body.comments).toHaveLength(0);
        });
    });
    describe("GET ERRORS", () => {
      test("Status: 400, request invalid", () => {
        return request(app)
          .get("/api/reviews/abc/comments")
          .expect(400)
          .then((res) => {
            expect(res.body.msg).toBe("Not a valid ID!");
          });
      });
      test("Status: 404, id not found", () => {
        return request(app)
          .get("/api/reviews/2000/comments")
          .expect(404)
          .then((res) => {
            expect(res.body.msg).toBe("Review ID Not Found");
          });
      });
    });
  });
});

describe("/api/reviews/:review_id/comments", () => {
  describe("POST", () => {
    test("Status: 201, returns newly added comment to the specified id", () => {
      return request(app)
        .post("/api/reviews/2/comments")
        .send({
          username: "mallionaire",
          body: "Best board game I have ever played!",
        })
        .expect(201)
        .then((res) => {
          expect(res.body.comment).toEqual({
            author: "mallionaire",
            body: "Best board game I have ever played!",
            comment_id: 7,
            created_at: expect.any(String),
            review_id: 2,
            votes: 0,
          });
        });
    });
    describe("GET ERRORS", () => {
      test("Status: 404, username invalid", () => {
        return request(app)
          .post("/api/reviews/2/comments")
          .send({
            username: "fynnmeredith",
            body: "not valid review",
          })
          .expect(404)
          .then((res) => {
            expect(res.body.msg).toBe("User Not Found");
          });
      });
      test("Status: 400, not a review id", () => {
        return request(app)
          .post("/api/reviews/abc/comments")
          .send({
            username: "mallionaire",
            body: "Best board game I have ever played!",
          })
          .expect(400)
          .then((res) => {
            expect(res.body.msg).toBe("Not a valid ID!");
          });
      });
    });
  });
});

describe("/api/comments/:comment_id", () => {
  describe("DELETE", () => {
    test("Status: 204, deletes comment by specified id", () => {
      return request(app).delete("/api/comments/2").expect(204);
    });
  });
  describe("ERRORS /api/comments/:comment_id", () => {
    test("status: 404 non existent ID entered", () => {
      return request(app)
        .get("/api/comments/9999")
        .expect(404)
        .then((res) => {
          expect(res.body.msg).toBe("Not Found");
        });
    });
  });
});

describe("/api", () => {
  describe("GET", () => {
    test("status: 200, responds with JSON describing all available endpoints", () => {
      return request(app).get("/api").expect(200);
    });
  });
});

describe("/api/users", () => {
  describe("GET", () => {
    test("status: 200, responds with an array", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then((res) => {
          expect(Array.isArray(res.body)).toBe(true);
        });
    });
    test("status 200, will return an array of username objects", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then((res) => {
          res.body.forEach((username) => {
            expect(username).toEqual(
              expect.objectContaining({
                username: expect.any(String),
              })
            );
          });
        });
    });
  });
  describe("ERROR - /api/invalid_url", () => {
    test("status: 404, msg: Not Found", () => {
      return request(app)
        .get("/api/invalid")
        .expect(404)
        .then((res) => {
          expect(res.body.msg).toBe("Not Found");
        });
    });
  });
});
