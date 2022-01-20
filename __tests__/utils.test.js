const { formatTables, checkReviewIdExists, checkUserExists } = require('../utils')
const db = require('../db/connection');
const { request } = require('express');
const app = require('../app');

afterAll(() => db.end());

describe('formattedData', () => {
    test('function will return empty array if nothing is passed through the function', () => {
        const data = [];
      expect(formatTables(data)).toEqual([]);
    })
    test('function will not mutate original input', () => {
        const data = [{
            slug: "this is the slug",
            description: "this is the description"
        }];
        const output = ["this is the slug", "this is the description"]
        formatTables(data)
        expect(data).toEqual(data)
    })
    test('function will return an array of the object values inputted', () => {
        const data = [{
            slug: "this is the slug",
            description: "this is the description"
        }];
        const output = [["this is the slug", "this is the description"]]
        expect(formatTables(data)).toEqual(output)
    })
    test('full category test data success', () => {
        const output = [
            ['euro game', 'Abstact games that involve little luck'],
            ['social deduction',
              "Players attempt to uncover each other's hidden role"],
          ['dexterity','Games involving physical skill'], ["children's games", 'Games suitable for children']
          ];
          const data = [
            { slug: 'euro game', description: 'Abstact games that involve little luck' },
            {
              slug: 'social deduction',
              description: "Players attempt to uncover each other's hidden role"
            },
            { slug: 'dexterity', description: 'Games involving physical skill' },
            { slug: "children's games", description: 'Games suitable for children' }
          ];
          expect(formatTables(data)).toEqual(output)
    })
})

describe('Checks whether review_id exists or whether it is invlaid', () => {
  test('gets valid review Id', () => {
    return checkReviewIdExists(1).then((res) => {
      expect(res).toBe(true)
  })
})
test('gets invalid review id', () => {
  return checkReviewIdExists(200).then((res) => {
    expect(res).toBe(false)
})
})
})

describe('Checks whether username exists or whether it is invlaid', () => {
  test('gets valid username', () => {
    return checkUserExists('mallionaire').then((res) => {
      expect(res).toBe(true)
  })
})
test('gets invalid review id', () => {
  return checkUserExists('fynnmeredith').then((res) => {
    expect(res).toBe(false)
})
})
})