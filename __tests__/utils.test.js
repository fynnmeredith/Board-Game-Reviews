const { formatTables } = require('../utils')
const db = require('../db/connection')
// const {categoryData, commentData, reviewData, userData} = reviewData;

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